using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;

namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  /// Momentary values, which are apt to change frequently. This class should be kept small.
  /// </summary>
  public class MachineState : IPatchMachines {
    public ActiveState State { get; internal set; } = ActiveState.Initializing;

    public MachineAlert? Alarm { get; internal set; } = null;

    public MachineAlert? Error { get; internal set; } = null;

    public MachinePosition MachinePosition { get; internal set; } = new MachinePosition();

    public MachinePosition? WorkPosition { get; internal set; } = new MachinePosition();
  }
}
