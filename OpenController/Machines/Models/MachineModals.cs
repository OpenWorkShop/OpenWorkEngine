using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  // http://linuxcnc.org/docs/html/gcode/overview.html#cap:word
  public record MachineModals {
    // Motion (Group 1)
    public MachineMotionType Motion { get; internal set; } = MachineMotionType.Rapid;

    // Plane selection (Group 2)
    public AxisPlane Plane { get; internal set; }

    // Distance Mode (Group 3)
    public MovementDistanceType Distance { get; set; }

    // Arc IJK Distance Mode (Group 4)
    public MovementDistanceType ArcDistance { get; set; }

    // Feed Rate Mode (Group 5)
    public FeedRateMode FeedRate { get; set; } = FeedRateMode.UnitsPerMinute;

    // Units (Group 6)
    public UnitType Units { get; internal set; }

    // Cutter Diameter Compensation (Group 7)
    // Tool Length Offset (Group 8)
    // Canned Cycles Return Mode (Group 10)
    // Coordinate System (Group 12)
    // Control Mode (Group 13)
    // Spindle Speed Mode (Group 14)
    // Lathe Diameter Mode (Group 15)

    // M
    // Stopping (Group 4)
    public MachineProgramState ProgramState { get; internal set; } = MachineProgramState.CompulsoryStop;

    // Spindle (Group 7)
    public SpinDirection SpindleDirection { get; internal set; } = SpinDirection.None;

    // Coolant (Group 8)
    // Override Switches (Group 9)
    // User Defined (Group 10)

    public int WorkCoordinateSystem { get; internal set; } = 0; // G54 == #0
  }
}
