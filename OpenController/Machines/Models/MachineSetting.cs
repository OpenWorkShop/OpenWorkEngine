using System;
using System.Collections.Generic;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Syntax;
using OpenWorkEngine.OpenController.Workspaces.Models;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachineSetting : IMachineSetting, IEquatable<MachineSetting> {
    public string Id { get; } = "";

    public string? Title { get; init; }

    public MachineSettingType SettingType { get; init; }

    public string Key { get; init; } = default!;

    public string Value { get; init; } = default!;

    public MachineSettingUnits Units { get; init; } = MachineSettingUnits.Unknown;

    public MachineLogEntry ToLogEntry() {
      string val = Value;
      if (val.Contains('.')) val = val.Trim('0').Trim('.');
      string title = Title ?? Key;

      List<SyntaxChunk> chunks = new List<SyntaxChunk>();
      if (SettingType <= MachineSettingType.Grbl) {
        chunks.Push(new SyntaxChunk() {Value = Key, Type = SyntaxType.Keyword});
        chunks.Push(new SyntaxChunk() {Value = "=", Type = SyntaxType.Operator});
      }
      chunks.Push(new SyntaxChunk() {Value = val, Type = SyntaxType.Value});

      return new MachineLogEntry(title, MachineLogLevel.Cfg, chunks.ToArray());
    }

    public override string ToString() => $"[{SettingType}: {Key}={Value}]";

    public bool IsSameSetting(MachineSetting other) => SettingType == other.SettingType && Key == other.Key;

    public bool Equals(MachineSetting? other) {
      if (ReferenceEquals(null, other)) return false;
      if (ReferenceEquals(this, other)) return true;
      return IsSameSetting(other) && Value == other.Value;
    }

    public override bool Equals(object? obj) {
      if (ReferenceEquals(null, obj)) return false;
      if (ReferenceEquals(this, obj)) return true;
      if (obj.GetType() != this.GetType()) return false;
      return Equals((MachineSetting) obj);
    }

    public override int GetHashCode() => HashCode.Combine((int) SettingType, Key, Value);
  }
}
