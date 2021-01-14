using System.Collections.Generic;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Machines.Messages {
  /// <summary>
  ///   Object to return to client to indicate some changes to the connection.
  ///   Matches PortConnection, except uses optionals.
  /// </summary>
  public class MachinePatch {
    public MachineStatus? State { get; } = new();

    public MachineConfiguration? Configuration { get; } = new();

    public List<MachineSetting> Settings { get; } = new();
  }
}
