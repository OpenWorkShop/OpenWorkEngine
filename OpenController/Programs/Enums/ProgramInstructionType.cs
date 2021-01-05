namespace OpenWorkEngine.OpenController.Programs.Enums {
  public enum ProgramInstructionType {
    Invalid = -1, // Failed to parse.
    None = 0, // Comment or blank.
    MoveRelative,
    MoveAbsolute,
    ToolChange,
    MachineConfiguration, // M3 = spindle speed
  }
}
