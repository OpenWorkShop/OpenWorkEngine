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
    UserDefined,
  }
}
