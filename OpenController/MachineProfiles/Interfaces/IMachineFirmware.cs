using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;

namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineFirmware {
    public string Name { get; }

    public MachineControllerType ControllerType { get; }

    // e.g., 1.1g for Grbl, PCB version on Maslow, etc.
    public string? Edition { get; }

    public bool Rtscts { get; }

    public BaudRate BaudRate { get; }

    public decimal RequiredVersion { get; }

    public decimal SuggestedVersion { get; }

    public string? DownloadUrl { get; }

    public string? HelpUrl { get; }
  }
}
