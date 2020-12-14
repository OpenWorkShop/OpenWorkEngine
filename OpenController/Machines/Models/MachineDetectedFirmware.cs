using System.Linq;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachineDetectedFirmware {
    public string? Name { get; set; }

    // GRBL, etc.
    public string? Protocol { get; set; }

    public string? WelcomeMessage { get; internal set; }

    public string? FriendlyName { get; set; }

    public string? Edition { get; set; }

    public decimal? Value { get; set; }

    public bool IsValid => !string.IsNullOrWhiteSpace(Name) || !string.IsNullOrWhiteSpace(Protocol) || Value.HasValue;

    public override string ToString() =>
      string.Join('.', new string?[] {Name, FriendlyName, Edition, Value?.ToString()}.Where(s => s != null));
  }
}
