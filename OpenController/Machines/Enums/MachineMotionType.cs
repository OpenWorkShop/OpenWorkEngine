namespace OpenWorkEngine.OpenController.Machines.Enums {
  public enum MachineMotionType {
    Rapid = 0,  // G0
    Linear, // G01
    Arc,    // G02
    ArcCcw, // G03
    Dwell,  // G04
    Probe,  // G38.2,3,4,5
    Cancel  // G80
  }
}
