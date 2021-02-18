using System;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Models.InstructionSteps;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public class InstructionStep : IInstructionStep {
    public string Name => !string.IsNullOrWhiteSpace(SettingId) ? SettingId.Split('.').Last() :
      throw new ArgumentException($"Unregistered setting: {Setting.Key}={SettingValue}");

    public string SettingId => Setting.Id;

    // Value name -- "1", "Rapid", Linear, etc.
    public string SettingValue { get; }

    public bool WillChangeSetting => OldValue == null && !Setting.Value.Equals(SettingValue);

    // e.g., spindle speed
    public decimal? Value { get; internal set; }

    // For movement, etc.
    public MachineMovement? Movement { get; internal set; }

    internal FirmwareSetting Setting { get; }
    // When the setting is applied, save the old value here.
    internal string? OldValue { get; set; }

    public InstructionStep(FirmwareSetting setting, string value) {
      Setting = setting;
      SettingValue = value;
    }

    internal bool Apply() {
      if (OldValue != null) throw new ArgumentException($"Mutation already applied.");
      if (!WillChangeSetting) return false;
      OldValue = Setting.Value;
      Setting.Value = SettingValue;
      return true;
    }
  }
}
