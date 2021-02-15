namespace OpenWorkEngine.OpenController.Programs.Enums {
  public enum ProgramState {
    Complete = -2,
    Paused = -1,
    Created = 0,
    Loaded = 1, // All lines have been parsed.
    Running,
  }
}
