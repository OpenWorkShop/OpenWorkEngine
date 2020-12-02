using System.Collections.Generic;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Observables;
using Serilog;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class Machine {
    internal ILogger Log { get; }

    internal MachineTopicSet Topics { get; } = new ();

    public string? MachineProfileId { get; }

    public MachineState State { get; } = new();

    public MachineConfiguration Configuration { get; } = new();

    public List<MachineSetting> Settings { get; } = new();

    public Machine(ILogger log) {
      Log = log;
    }
  }
}
