using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Parsers {
  internal class GrblOptionParser : RegexParser {
    public GrblOptionParser() : base(@"^\[(?:OPT:)(?<opt>.+)\]$", OnData) { }

    private static HashSet<MachineTopic>? OnData(
      Controller? controller, ControlledMachine machine, Dictionary<string, string> values) {
      if (!values.ContainsKey("opt")) return null;

      int orig = machine.Configuration.GetHashCode();
      machine.Configuration.Options = new MachineOptions(values["opt"]);

      return BroadcastChange(controller, machine, orig, machine.Configuration.GetHashCode(), MachineTopic.Configuration);
    }
  }
}
