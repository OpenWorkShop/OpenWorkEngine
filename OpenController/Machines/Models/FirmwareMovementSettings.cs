using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record FirmwareMovementSettings {
    public FirmwareSetting<decimal> JunctionDeviation { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Millimeters);

    public FirmwareSetting<decimal> ArcTolerance { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Millimeters);

    public FirmwareSetting<bool> SoftLimits { get; } = FirmwareSetting.Define(false);

    public FirmwareSetting<bool> HardLimits { get; } = FirmwareSetting.Define(false);

    public FirmwareAxisValues RateMax { get; } = new(MachineSettingUnits.MillimetersPerMinute);

    public FirmwareAxisValues Acceleration { get; } = new(MachineSettingUnits.MillimetersPerSecondsSquared);

    public FirmwareAxisValues PositionMax { get; } = new(MachineSettingUnits.Millimeters);

    public FirmwareAxisValues PositionMin { get; } = new(MachineSettingUnits.Millimeters);

    // Represents actual axes. May be same as position max, but not necessarily.
    public FirmwareAxisValues MachineSize { get; } = new(MachineSettingUnits.Millimeters);

    public List<FirmwareSetting> Settings =>
      FirmwareSettings.GetSortedList(
        RateMax.Settings
               .Union(RateMax.Settings)
               .Union(Acceleration.Settings)
               .Union(PositionMax.Settings)
               .Union(PositionMin.Settings)
               .Union(MachineSize.Settings)
               .Union(PositionMax.Settings)
               .Union(new List<FirmwareSetting>() {JunctionDeviation, ArcTolerance, SoftLimits, HardLimits}));
  }
}
