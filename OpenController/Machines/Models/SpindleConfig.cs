namespace OpenWorkEngine.OpenController.Machines.Models {
  public record SpindleConfig : SpindleState {
    // Stored as a string despite Grbl using numbers for forward-compatibility with other systems.
    public string Tool { get; internal set; } = "";
  }
}
