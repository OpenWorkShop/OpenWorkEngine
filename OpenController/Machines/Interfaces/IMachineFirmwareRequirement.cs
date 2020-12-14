using OpenWorkEngine.OpenController.MachineProfiles.Enums;

namespace OpenWorkEngine.OpenController.Machines.Interfaces {
  public interface IMachineFirmwareRequirement {
    public MachineControllerType ControllerType { get; }

    public string? Name { get; }

    public string? Edition { get; }

    public decimal RequiredVersion { get; }

    public decimal SuggestedVersion { get; }

    public string? DownloadUrl { get; }

    public string? HelpUrl { get; }
  }
}
