using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Language;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Syntax;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public enum MachineLogSource {
    SerialRead,
    SerialWrite,
  }

  public enum SerialWriteState {
    None,
    Queued,
    Sent,
    Error,
    Ok,
  }

  public class MachineLogEntry : IEquatable<MachineLogEntry> {
    public int Id { get; internal set; } = 0;
    public string Message { get; }
    public List<DateTime> Timestamps { get; } = new();
    public int Count => Timestamps.Count;
    public DateTime Timestamp => Timestamps.Last();
    public MachineLogLevel LogLevel =>
      Error != null || WriteState == SerialWriteState.Error ? MachineLogLevel.Err : _logLevel;
    public MachineLogSource Source { get; }
    public SyntaxChunk[] Code { get; }
    public MachineAlert? Error { get; internal set; }

    // Read-only
    public bool IsResponse { get; }

    // Write-only
    public SerialWriteState WriteState { get; set; }

    private readonly MachineLogLevel _logLevel;

    private MachineLogEntry(
      string message,
      MachineLogLevel logLevel = MachineLogLevel.Inf,
      bool isResponse = false,
      MachineLogSource source = MachineLogSource.SerialRead,
      SerialWriteState writeState = SerialWriteState.None,
      MachineAlert? error = null,
      params SyntaxChunk[] code
    ) {
      Timestamps.Push( DateTime.Now );

      Error = error;
      Message = message;
      IsResponse = isResponse;
      _logLevel = logLevel;
      WriteState = writeState;
      Source = source;
      Code = code;
    }

    public static MachineLogEntry FromReadAck(string message) =>
      new(message, MachineLogLevel.Dbg, isResponse: true);

    public static MachineLogEntry FromReadCode
      (string message, MachineLogLevel logLevel = MachineLogLevel.Inf, params SyntaxChunk[] code) =>
      new(message, logLevel, code: code);

    public static MachineLogEntry FromReadMessage(string message, MachineLogLevel logLevel = MachineLogLevel.Inf) =>
      new(message, logLevel);

    public static MachineLogEntry FromReadError(string message, MachineAlert error, bool isResponse) =>
      new(message, MachineLogLevel.Err, error: error, isResponse: isResponse);

    public static MachineLogEntry FromWrittenInstruction(
      CompiledInstruction compiled, MachineLogLevel logLevel = MachineLogLevel.Inf
    ) => new (
      compiled.Source,
      logLevel,
      code: compiled.Line.Chunks.ToArray(),
      source: MachineLogSource.SerialWrite,
      writeState: SerialWriteState.Queued
    );

    public bool Equals(MachineLogEntry? other) {
      if (ReferenceEquals(null, other)) return false;
      if (ReferenceEquals(this, other)) return true;
      return Id == other.Id;
    }

    public override bool Equals(object? obj) {
      if (ReferenceEquals(null, obj)) return false;
      if (ReferenceEquals(this, obj)) return true;
      if (obj.GetType() != this.GetType()) return false;
      return Equals((MachineLogEntry) obj);
    }

    public bool CanMergeWith(MachineLogEntry entry) {
      bool msg = Code.Length == entry.Code.Length && entry.LogLevel == LogLevel && entry.Message.Equals(Message);
      if (!msg) return false;
      for (int i = 0; i < Code.Length; i++) {
        if (!Code[i].Value.Equals(entry.Code[i].Value)) {
          return false;
        }
      }
      return true;
    }

    internal async Task WaitForWriteState(SerialWriteState state, int delayMs = 100, int timeoutMs = 5000) {
      if (WriteState < SerialWriteState.Queued) {
        throw new ArgumentException($"Log was not queued for writing: {ToString()}");
      }
      DateTime startTime = DateTime.Now;
      while (WriteState < state) {
        TimeSpan elapsed = DateTime.Now - startTime;
        if (elapsed.TotalMilliseconds > timeoutMs) {
          throw new TimeoutException($"Timed out waiting for {state} on {ToString()}");
        }

        await Task.Delay(delayMs);
      }
    }

    internal async Task<AlertError?> TryWaitForResponse() {
      try {
        await WaitForWriteState(SerialWriteState.Error);
      } catch (Exception e) {
        Error = MachineAlert.FromException(e);
      }
      return Error;
    }

    public override int GetHashCode() => Id.GetHashCode();

    public override string ToString() =>
      $"[{Timestamps.First().ToShortTimeString()}] [{LogLevel.ToString()}] {Message} {Error}".Trim();
  }
}
