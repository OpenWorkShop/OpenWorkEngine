using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Interfaces;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachineSetting : IMachineSetting, IPatchMachines {
    public string Id { get; } = "";

    public string? Title { get; set; } = default!;

    public MachineSettingType SettingType { get; set; }

    public string Key { get; set; } = default!;

    public string Value { get; set; } = default!;

    public override string ToString() => $"[{SettingType}: {Key}={Value}]";
  }
}
