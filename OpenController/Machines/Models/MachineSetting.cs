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
    public string Id { get; internal set; } = "";

    public string? Title { get; internal set; }

    public MachineSettingType SettingType { get; init; }

    public virtual string Key { get; internal set; } = default!;

    public virtual string Value { get; internal set; } = default!;

    public MachineSettingUnits Units { get; init; } = MachineSettingUnits.Unknown;
    public override string ToString() => $"[{SettingType}: {Key}={Value}]";

    internal bool IsSameSetting(MachineSetting other) => SettingType == other.SettingType && Key == other.Key;

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
