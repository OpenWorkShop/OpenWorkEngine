using System.Linq;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Ports.Messages;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachineDetectedFirmware {
    public FirmwareComparisonNode<string> Name { get; } = new();

    public FirmwareComparisonNode<string> Protocol { get; } = new();

    public FirmwareComparisonNode<string> Edition { get; } = new();

    public FirmwareComparisonNode<decimal> Version { get; } = new();

    public string? WelcomeMessage { get; internal set; }

    public string? FriendlyName { get; set; }

    public bool IsValid => Protocol.HasDetectedValue && Name.HasDetectedValue && Version.HasDetectedValue;

    public bool MeetsRequirements => IsValid &&
      Name.MeetsRequirement && Protocol.MeetsRequirement && Edition.MeetsRequirement && Version.MeetsRequirement;

    public FirmwareRequirement Requirement { get; internal set; } = new FirmwareRequirement {
      RequiredVersion = 0,
      SuggestedVersion = 0
    };

    public override string ToString() => Requirement.ToString();
  }
}
