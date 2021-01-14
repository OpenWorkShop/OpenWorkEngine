namespace OpenWorkEngine.OpenController.Machines.Enums {
  public enum MachineMotionType {
    Rapid,  // G0
    Linear, // G01
    Arc,    // G02
    ArcCCW, // G03
    Dwell,  // G04
    Probe,  // G38.2,3,4,5
    Cancel  // G80
  }
}
