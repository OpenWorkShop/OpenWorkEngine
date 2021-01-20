namespace OpenWorkEngine.OpenController.Machines.Models {
  public record ApplicatorConfig : ApplicatorState {
    // Stored as a string despite Grbl using numbers for forward-compatibility with other systems.
    public string ToolId { get; internal set; } = "";

    public MachinePosition? ToolLengthOffset { get; internal set; }

    public MachinePosition? ProbePosition { get; internal set; }
  }
}
