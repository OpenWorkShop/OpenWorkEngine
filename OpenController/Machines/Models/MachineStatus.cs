using System.Collections.Generic;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  ///   Momentary values, which are apt to change frequently. This class should be kept small.
  ///   Mirrors Grbl's "Status" line, to some extent.
  /// </summary>
  public record MachineStatus {
    public ActiveState ActivityState { get; internal set; } = ActiveState.Initializing;

    public MachineAlert? Alarm { get; internal set; } = null;

    public MachineAlert? Error { get; internal set; } = null;

    public MachinePosition MachinePosition { get; internal set; } = new();

    public MachinePosition? WorkPosition { get; internal set; } = new();

    public MachinePosition? WorkCoordinateOffset { get; internal set; }

    public MachineBuffer Buffer { get; internal set; } = new();

    public List<MachinePinType> ActivePins { get; } = new();

    public MachineApplicatorState Applicator { get; } = new();

    public MachineOverrides? Overrides { get; internal set; } = null;
  }
}
