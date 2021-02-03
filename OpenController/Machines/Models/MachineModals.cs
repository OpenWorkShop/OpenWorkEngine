using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Messages;

namespace OpenWorkEngine.OpenController.Machines.Models {
  // http://linuxcnc.org/docs/html/gcode/overview.html#cap:word
  public record MachineModals {
    // MASLOW: Feedback

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

    // Cutter Diameter Compensation (Group 7)
    // Tool Length Offset (Group 8)
    // Canned Cycles Return Mode (Group 10)
    // Coordinate System (Group 12)
    // Control Mode (Group 13)
    // Spindle Speed Mode (Group 14)
    // Lathe Diameter Mode (Group 15)

    // M
    // Stopping (Group 4)
    public MachineModalState<MachineProgramState>? ProgramState { get; internal set; }

    // Spindle (Group 7)
    public MachineModalState<SpinDirection> SpindleDirection { get; internal set; } = new(SpinDirection.None);

    // Coolant (Group 8)
    // Override Switches (Group 9)
    // User Defined (Group 10)

    public int WorkCoordinateSystemCurrent { get; internal set; } = 0; // G54 == #0

    public int WorkCoordinateSystemCount { get; internal set; } = 5;
  }
}
