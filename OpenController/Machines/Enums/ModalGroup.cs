namespace OpenWorkEngine.OpenController.Machines.Enums {
  // http://linuxcnc.org/docs/html/gcode/overview.html#cap:modal-groups
  public enum ModalGroup {
    // G-Code
    NonModal = 0,
    Motion,
    PlaneSelection,
    DistanceMode,
    ArcIjkDistanceMode,
    FeedRateMode,
    Units,
    CutterDiameterCompensation,
    ToolLengthOffset,
    CannedCyclesReturnMode,
    CoordinateSystem,
    ControlMode,
    SpindleSpeedMode,
    LatheDiameterMode,

    // M-Code
    Stopping,
    Spindle,
    Coolant,
    OverrideSwitches,
    UserDefined
  }
  // // http://linuxcnc.org/docs/html/gcode/overview.html#cap:modal-groups
  // public enum GCodeModalGroup {
  //   NonModalGroup = 0,
  //   Motion = 1,              // G0, G1, G2, G3, G33, G38.n, G73, G76, G80, G81, G82, G83, G84, G85, G86, G87, G88, G89
  //   Plane = 2,               // G17, G18, G19, G17.1, G18.1, G19.1
  //   Distance = 3,            // G90, G91
  //   ArcIJKDistance = 4,      // G90.1, G91.1
  //   FeedRate = 5,            // G93, G94, G95
  //   Units = 6,               // G20, G21
  //   CutterDiameter = 7,      // G40, G41, G42, G41.1, G42.1
  //   ToolLengthOffset = 8,    // G43, G43.1, G49
  //   CannedCyclesReturn = 10, // G98, G99
  //   CoordinateSystem = 12,   // G54, G55, G56, G57, G58, G59, G59.1, G59.2, G59.3
  //   Control = 13,            // G61, G61.1, G64
  //   SpindleSpeed = 14,       // G96, G97
  //   LatheDiameter = 15,      // G7, G8
  // }

  // namespace OpenWorkEngine.OpenController.Programs.Enums {
  //   public enum MCodeModalGroup {
  //     Stopping = 4,         // M0, M1, M2, M30, M60
  //     Spindle = 7,          // M3, M4, M5
  //     Coolant = 8,          // (M7 M8 can both be on), M9
  //     OverrideSwitches = 9, // M48, M49
  //     UserDefined = 10,     // M100-M199
  //   }
  // }
}
