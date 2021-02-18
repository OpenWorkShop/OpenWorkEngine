namespace OpenWorkEngine.OpenController.Machines.Enums {
  public enum MachineProgramState {
    CompulsoryStop, // M0
    OptionalStop,   // M1
    EndOfProgram,   // M2 && M30 - see notes on M30 from https://en.wikipedia.org/wiki/G-code
    ManualChange,   // M6 Manual Tool Change
    AutomaticChange, // M60 - meant for any type of auto state change
  }
}
