using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Attributes;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public record FirmwareMovementSettings {
    public FirmwareSetting<decimal> JunctionDeviation { get; } = new(0) { Units = MachineSettingUnits.Millimeters };

    public FirmwareSetting<decimal> ArcTolerance { get; } = new(0) { Units = MachineSettingUnits.Millimeters };

    public FirmwareSetting<bool> SoftLimits { get; } = new(false);

    public FirmwareSetting<bool> HardLimits { get; } = new(false);

    public FirmwareAxisValues RateMax { get; } = new(MachineSettingUnits.MillimetersPerMinute);

    public FirmwareAxisValues Acceleration { get; } = new(MachineSettingUnits.MillimetersPerSecondsSquared);

    public FirmwareAxisValues PositionMax { get; } = new(MachineSettingUnits.Millimeters);

    public FirmwareAxisValues PositionMin { get; } = new(MachineSettingUnits.Millimeters);

    // Represents actual axes. May be same as position max, but not necessarily.
    public FirmwareAxisValues MachineSize { get; } = new(MachineSettingUnits.Millimeters);

    public List<FirmwareSetting> Settings => new() {
      JunctionDeviation, ArcTolerance, SoftLimits, HardLimits,
      RateMax.X, RateMax.Y, RateMax.Z,
      Acceleration.X, Acceleration.Y, Acceleration.Z,
      PositionMax.X, PositionMax.Y, PositionMax.Z,
      MachineSize.X, MachineSize.Y, MachineSize.Z,
      PositionMin.X, PositionMin.Y, PositionMin.Z,
    };
  }
}
