using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record FirmwareApplicatorSettings {
    public FirmwareSetting<decimal> SpeedMax { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Rpm);

    public FirmwareSetting<decimal> SpeedMin { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Rpm);

    public FirmwareSetting<bool> LaserEnabled { get; } = FirmwareSetting.Define(false);

    // Maslow's Rotation Radius, for example, is an offset from the tip of chains to tip of cutter
    public FirmwareSetting<decimal> ShuttleRadius { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Millimeters);

    public FirmwareSetting<decimal> ShuttleWeight { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Newtons);

    public List<FirmwareSetting> Settings =>
      FirmwareSettings.GetSortedList(SpeedMax, SpeedMin, LaserEnabled, ShuttleRadius, ShuttleWeight);
  }
}
