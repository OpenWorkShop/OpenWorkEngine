using System.Collections.Generic;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class Machine {
    public string? MachineProfileId { get; }

    public MachineState State { get; } = new();

    public MachineConfiguration Configuration { get; } = new();

    public List<MachineSetting> Settings { get; } = new();
  }
}
