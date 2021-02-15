using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services.Values;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Messages;

namespace OpenWorkEngine.OpenController.Machines.Models {
  // http://linuxcnc.org/docs/html/gcode/overview.html#cap:word
  public record MachineModals {
    // Motion (Group 1)
    public ModalSetting<MachineMotionType> Motion { get; } = FirmwareSetting.Modal(MachineMotionType.Rapid);

    // Plane selection (Group 2)
    public ModalSetting<AxisPlane> Plane { get;} = FirmwareSetting.Modal(AxisPlane.Xy);

    // Distance Mode (Group 3)
    public ModalSetting<MovementDistanceType> Distance { get;} = FirmwareSetting.Modal(MovementDistanceType.Absolute);

    // Arc IJK Distance Mode (Group 4)
    public ModalSetting<MovementDistanceType> ArcDistance { get;} = FirmwareSetting.Modal(MovementDistanceType.Absolute);

    // Feed Rate Mode (Group 5)
    public ModalSetting<FeedRateMode> FeedRate { get;} = FirmwareSetting.Modal(FeedRateMode.UnitsPerMinute);

    // Units (Group 6)
    public ModalSetting<UnitType> Units { get;} = FirmwareSetting.Modal(UnitType.Metric);

    // Cutter Diameter Compensation (Group 7) -> Applicator.RadiusCompensation

    // Tool Length Offset (Group 8) -> Applicator.LengthOffset

    // Canned Cycles Return Mode (Group 10)
    public ModalSetting<TimingMode> CannedCycleReturnMode { get;} = FirmwareSetting.Modal(TimingMode.PerMinute);

    // Control Mode (Group 13)
    public ModalSetting<PathControlMode> PathControlMode { get;} = FirmwareSetting.Modal(Enums.PathControlMode.Blended);

    // Spindle Speed Mode (Group 14)
    public ModalSetting<SpindleSpeedMode> SpindleSpeed { get;} = FirmwareSetting.Modal(SpindleSpeedMode.ConstantSpindleSpeed);

    // Lathe Diameter Mode (Group 15)
    public ModalSetting<EnabledType> CylindricalInterpolation { get;} = FirmwareSetting.Modal(EnabledType.Disabled);

    // M
    // [M] Stopping (Group 4)
    public ModalSetting<MachineProgramState> ProgramState { get;} = FirmwareSetting.Modal(MachineProgramState.AutomaticChange);

    // [M] Spindle (Group 7)

    // [M] Coolant (Group 8) -> Applicator.IsCoolant...

    // [M] Override Switches (Group 9) -> Overrides.FeedAllowed/SpeedAllowed

    // [M] User.Modald (Group 10)
    public ModalSetting<decimal> UserDefined { get; } = FirmwareSetting.Modal(0M);

    public ModalSetting<decimal> WorkCoordinateSystem { get; } = FirmwareSetting.Modal(1M); // G54 == #0

    public List<FirmwareSetting> Settings =>
      FirmwareSettings.GetSortedList(new List<FirmwareSetting>() {
        Motion, Plane, Distance, ArcDistance, FeedRate, Units, CannedCycleReturnMode, PathControlMode, SpindleSpeed,
        CylindricalInterpolation, ProgramState, UserDefined, WorkCoordinateSystem
      });
  }
}
