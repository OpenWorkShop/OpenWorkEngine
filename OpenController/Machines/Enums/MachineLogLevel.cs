namespace OpenWorkEngine.OpenController.Machines.Enums {
  public enum MachineLogLevel {
    Dbg = 0, // "ok"
    Cfg, // Settings values, etc.
    Inf, // General msg, echo
    Wrn, // Unprocssed, unknown
    Err, // Response -> Error
  }
}
