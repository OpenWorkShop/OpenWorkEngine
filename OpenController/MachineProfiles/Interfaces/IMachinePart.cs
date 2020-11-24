using System.Collections.Generic;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;

namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachinePart {
    MachinePartType PartType { get; }

    string Title { get; }

    string? Description { get; }

    public bool Optional { get; } // Toggle flag, not required part.

    public bool IsDefault { get; } // Is this the preselected option from the list?

    // Arbitrary JSON-encoded data.
    public string DataBlob { get; }
  }

  public interface IMachinePart<TSetting, TSpec> : IMachinePart
    where TSetting : IMachineSetting where TSpec : IMachineSpec
  {
    public List<TSetting> Settings { get; }

    public List<TSpec> Specs { get; }
  }
}
