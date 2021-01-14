namespace OpenWorkEngine.OpenController.Machines.Enums {
  public enum MachineProgramState {
    CompulsoryStop, // M0
    OptionalStop,   // M1
    EndOfProgram,   // M2 && M30 - see notes on M30 from https://en.wikipedia.org/wiki/G-code
    AutomaticChange // M60 - meant for any type of auto state change
  }
}
