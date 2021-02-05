using System.Globalization;
using System.Linq;
using OpenWorkEngine.OpenController.Lib.Linq;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;

namespace OpenWorkEngine.OpenController.Ports.Messages {
  public record FirmwareRequirement : IMachineFirmwareRequirement {
    public MachineControllerType ControllerType { get; init; } = MachineControllerType.Unknown;

    public string? Name { get; init; }

    public string? Edition { get; init; } = null;

    public decimal RequiredVersion { get; init; } = 0;

    public decimal SuggestedVersion { get; init; } = 0;

    public string? DownloadUrl { get; init; }

    public string? HelpUrl { get; init; }

    public override string ToString() =>
      string.Join('.', new [] {
        ControllerType.ToString(), Name, Edition, RequiredVersion.ToString(CultureInfo.InvariantCulture)
      }.ToList().SelectNonNull());
  }
}
