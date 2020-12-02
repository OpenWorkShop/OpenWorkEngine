using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using SemVersion;

namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  /// Semi-persistent values, which change infrequently, such as modal groups. This class can grow as-needed.
  /// </summary>
  public class MachineConfiguration : IPatchMachines {
    public MachinePosition WorkOffset { get; internal set; } = new();

    public MachineDetectedFirmware Firmware { get; } = new();

    // Firmware, Version...

    // Buffer, Feedback, Modal, Tool, Feedrate, Spindle, ovF, ovS, Extruder, HeatedBed, rapidFeedrate

    public override string ToString() => $"{Firmware}";
  }
}