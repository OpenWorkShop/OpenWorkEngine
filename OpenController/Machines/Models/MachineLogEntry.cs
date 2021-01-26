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
    public string Id { get; }
    public string Message { get; }
    public List<DateTime> Timestamps { get; } = new();
    public int Count => Timestamps.Count;
    public DateTime Timestamp => Timestamps.Last();
    public MachineLogLevel LogLevel { get; }
    public MachineLogSource Source { get; } = MachineLogSource.SerialRead;
    public MachineAlert? Error { get; }
    public SyntaxChunk[] Code { get; } = new SyntaxChunk[]{};

    // Log a write-line.
    public MachineLogEntry(
      CompiledInstruction compiled, MachineLogLevel logLevel = MachineLogLevel.Inf
    ) {
      Id = Guid.NewGuid().ToString();
      Timestamps.Push( DateTime.Now );

      Message = compiled.Source;
      Code = compiled.Chunks.ToArray();
      LogLevel = logLevel;
      Source = MachineLogSource.SerialWrite;
    }

    internal MachineLogEntry(
      string message, MachineLogLevel logLevel = MachineLogLevel.Inf, params SyntaxChunk[] code
    ) {
      Id = Guid.NewGuid().ToString();
      Timestamps.Push( DateTime.Now );

      Message = message.Trim();
      LogLevel = logLevel;
      Code = code;
    }

    internal MachineLogEntry(string message, MachineAlert error) {
      Id = Guid.NewGuid().ToString();
      Timestamps.Push( DateTime.Now );

      Error = error;
      Message = message;
      LogLevel = MachineLogLevel.Err;
    }

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
