using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Attributes;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public record FirmwareApplicatorSettings {
    public FirmwareSetting<decimal> SpeedMax { get; } = new(0) {Units = MachineSettingUnits.Rpm};

    public FirmwareSetting<decimal> SpeedMin { get; } = new(0) {Units = MachineSettingUnits.Rpm};

    public FirmwareSetting<bool> LaserEnabled { get; } = new(false);

    // Maslow's Rotation Radius, for example, is an offset from the tip of chains to tip of cutter
    public FirmwareSetting<decimal> ShuttleRadius { get; } = new(0) { Units = MachineSettingUnits.Millimeters };

    public FirmwareSetting<decimal> ShuttleWeight { get; } = new(0) { Units = MachineSettingUnits.Newtons };

    public List<FirmwareSetting> Settings => new() { SpeedMax, SpeedMin, LaserEnabled, ShuttleRadius, ShuttleWeight };
  }
}
