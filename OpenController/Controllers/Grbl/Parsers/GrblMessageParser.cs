using System;
using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Parsers {
  internal class GrblMessageParser : RegexParser {
    public GrblMessageParser() : base(@"^\[(?:MSG:)?(?<message>.+)\]$", OnData) { }

    private static HashSet<MachineTopic> OnData(
      Controller? controller, ControlledMachine machine, Dictionary<string, string> values
    ) {
      int orig = machine.Status.GetHashCode();
      machine.Status.Message = values["message"];
      return BroadcastChange(controller, machine, orig, machine.Status.GetHashCode(), MachineTopic.Status);
    }
  }
}
