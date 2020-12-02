using HotChocolate.Utilities;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Ports.Messages {
  public class FirmwareRequirement {
    public MachineControllerType ControllerType { get; set; } = MachineControllerType.Unknown;

    public string? Name { get; set; }

    public string? Edition { get; set; }

    public decimal? Value { get; set; }

    internal bool IsSatisfiedBy(MachineDetectedFirmware firmware) {
      if (Name != null) {
        if (!firmware.Name.EqualsInvariantIgnoreCase(firmware.Name)) return false;
      }
      if (Edition != null) {
        if (firmware.Edition == null || !firmware.Name.EqualsInvariantIgnoreCase(firmware.Name)) return false;
      }
      if (Value.HasValue) {
        if (!firmware.Value.HasValue || firmware.Value.Value < Value.Value) return false;
      }

      return true;
    }
  }
}
