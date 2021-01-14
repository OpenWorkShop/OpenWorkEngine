using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;

namespace OpenWorkEngine.OpenController.Ports.Messages {
  public class FirmwareRequirement : IMachineFirmwareRequirement {
    public MachineControllerType ControllerType { get; set; } = MachineControllerType.Unknown;

    public string? Name { get; set; }

    public string? Edition { get; set; } = null;

    public decimal RequiredVersion { get; set; } = 0;

    public decimal SuggestedVersion { get; set; } = 0;

    public string? DownloadUrl { get; set; }

    public string? HelpUrl { get; set; }
  }
}
