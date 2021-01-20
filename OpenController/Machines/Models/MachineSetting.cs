using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Workspaces.Models;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachineSetting : IMachineSetting {
    public string Id { get; } = "";

    public string? Title { get; set; } = default!;

    public MachineSettingType SettingType { get; set; }

    public string Key { get; set; } = default!;

    public string Value { get; set; } = default!;

    public MachineSettingUnits Units { get; set; } = MachineSettingUnits.Unknown;

    public override string ToString() => $"[{SettingType}: {Key}={Value}]";

    public MachineSetting() { }

    public MachineSetting(string key, string value, string? title) {
      Key = key;
      Value = value;
      Title = title;
    }
  }
}
