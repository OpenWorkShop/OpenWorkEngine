namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachineOptions {
    public string Raw { get; }

    public MachineOptions(string raw) {
      Raw = raw;
    }
  }
}
