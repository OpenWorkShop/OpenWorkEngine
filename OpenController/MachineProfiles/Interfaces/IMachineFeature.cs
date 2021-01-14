namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineFeature {
    public bool Disabled { get; }

    // Identifier for UI, etc.
    public string Key { get; }

    public string? Title { get; }

    public string? Description { get; }

    public string? Icon { get; }
  }
}
