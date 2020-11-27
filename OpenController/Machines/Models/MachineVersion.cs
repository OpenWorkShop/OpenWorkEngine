namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachineVersion {
    public string? Name { get; set; }

    public decimal? Value { get; set; }

    public bool IsValid => !string.IsNullOrWhiteSpace(Name) || Value.HasValue;
  }
}
