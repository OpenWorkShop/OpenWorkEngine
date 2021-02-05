using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Messages;

namespace OpenWorkEngine.OpenController.Machines.Models {
  // http://linuxcnc.org/docs/html/gcode/overview.html#cap:word
  public record MachineModals {
    // Motion (Group 1)
    public MachineModalState<MachineMotionType> Motion { get; internal set; } = new (MachineMotionType.Rapid);

    // Plane selection (Group 2)
    public MachineModalState<AxisPlane>? Plane { get; internal set; }

    // Distance Mode (Group 3)
    public MachineModalState<MovementDistanceType>? Distance { get; internal set; }

    // Arc IJK Distance Mode (Group 4)
    public MachineModalState<MovementDistanceType>? ArcDistance { get; internal set; }

    // Feed Rate Mode (Group 5)
    public MachineModalState<FeedRateMode>? FeedRate { get; internal set; }

    // Units (Group 6)
    public MachineModalState<UnitType>? Units { get; internal set; }

    // Cutter Diameter Compensation (Group 7) -> Applicator.RadiusCompensation

    // Tool Length Offset (Group 8) -> Applicator.LengthOffset

    // Canned Cycles Return Mode (Group 10)
    public MachineModalState<TimingMode>? CannedCycleReturnMode { get; internal set; }

    // Control Mode (Group 13)
    public MachineModalState<PathControlMode>? PathControlMode { get; internal set; }

    // Spindle Speed Mode (Group 14)
    public MachineModalState<SpindleSpeedMode>? SpindleSpeed { get; internal set; }

    // Lathe Diameter Mode (Group 15)
    public MachineModalState<EnabledType>? CylindricalInterpolation { get; internal set; }

    // M
    // [M] Stopping (Group 4)
    public MachineModalState<MachineProgramState>? ProgramState { get; internal set; }

    // [M] Spindle (Group 7)

    // [M] Coolant (Group 8) -> Applicator.IsCoolant...

    // [M] Override Switches (Group 9) -> Overrides.FeedAllowed/SpeedAllowed

    // [M] User Defined (Group 10)
    public int UserDefinedCurrent { get; internal set; }

    public int UserDefinedCount { get; internal set; } = 100;

    public int WorkCoordinateSystemCurrent { get; internal set; } = 0; // G54 == #0

    public int WorkCoordinateSystemCount { get; internal set; } = 5;
  }
}
