using System;
using System.Collections.Generic;
using System.Linq;
using HotChocolate.Language;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Syntax;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public enum MachineLogSource {
    SerialRead,
    SerialWrite,
  }

  public class MachineLogEntry : IEquatable<MachineLogEntry> {
    public int Id { get; internal set; } = 0;
    public string Message { get; }
    public List<DateTime> Timestamps { get; } = new();
    public int Count => Timestamps.Count;
    public DateTime Timestamp => Timestamps.Last();
    public MachineLogLevel LogLevel { get; }
    public MachineLogSource Source { get; } = MachineLogSource.SerialRead;
    public MachineAlert? Error { get; }
    public SyntaxChunk[] Code { get; } = new SyntaxChunk[]{};
    public bool IsResponse { get; init; }

    private MachineLogEntry(
      string message,
      MachineLogLevel logLevel = MachineLogLevel.Inf,
      bool isResponse = false,
      MachineLogSource source = MachineLogSource.SerialRead,
      MachineAlert? error = null,
      params SyntaxChunk[] code
    ) {
      Timestamps.Push( DateTime.Now );

      Error = error;
      Message = message;
      IsResponse = isResponse;
      LogLevel = logLevel;
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

    public static MachineLogEntry FromReadError(string message, MachineAlert error) =>
      new(message, MachineLogLevel.Err, error: error, isResponse: true);

    public static MachineLogEntry FromWrittenInstruction(
      CompiledInstruction compiled, MachineLogLevel logLevel = MachineLogLevel.Inf
    ) => new (compiled.Source, logLevel, code: compiled.Chunks.ToArray(), source: MachineLogSource.SerialWrite);

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

    public override int GetHashCode() => Id.GetHashCode();

    public override string ToString() =>
      $"[{Timestamps.First().ToShortTimeString()}] [{LogLevel.ToString()}] {Message} {Error}";
  }
}
