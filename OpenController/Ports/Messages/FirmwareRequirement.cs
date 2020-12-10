using HotChocolate.Utilities;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Ports.Messages {
  public class FirmwareRequirement : IMachineFirmwareRequirement {
    public MachineControllerType ControllerType { get; set; } = MachineControllerType.Unknown;

    public string? Name { get; set; }

    public string? Edition { get; set; }

    public decimal RequiredVersion { get; set; }
  }
}

