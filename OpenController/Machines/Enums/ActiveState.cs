namespace OpenWorkEngine.OpenController.Machines.Enums {
  public enum ActiveState {
    // -- shared --
    Initializing = 0,
    IdleReady = 1,

    Run,
    Alarm,
    Hold,

    // grbl
    Door,
    Home,
    Sleep,
    Check,

    // // tinyg
    // Stop,
    // End,
    // Probe,
    // Cycle,
    // Homing,
    // Jog,
    // Interlock,
    // Shutdown,
    // Panic,
  }
}
