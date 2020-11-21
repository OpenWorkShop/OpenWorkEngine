namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineCommand : IHasStringId {
    public string Name { get; }

    public string Value { get; }
  }
}
