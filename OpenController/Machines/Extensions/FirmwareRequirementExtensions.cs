using HotChocolate.Utilities;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Machines.Extensions {
  public static class FirmwareRequirementExtensions {


    public static bool IsSatisfiedBy(this IMachineFirmwareRequirement req, MachineDetectedFirmware firmware) {
      if (req.Name != null) {
        if (!firmware.Name.EqualsInvariantIgnoreCase(firmware.Name)) return false;
      }
      if (req.Edition != null) {
        if (firmware.Edition == null || !firmware.Name.EqualsInvariantIgnoreCase(firmware.Name)) return false;
      }
      if (req.RequiredVersion != 0) {
        if (firmware.Value < req.RequiredVersion) return false;
      }

      return true;
    }
  }
}
