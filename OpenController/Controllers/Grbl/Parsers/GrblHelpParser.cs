using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax.GCode;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Parsers {
  internal class GrblHelpParser : RegexParser {
    public GrblHelpParser() : base(@"^\[(?:HLP:)(?<help>.+)\]$", OnData) { }

    private static HashSet<MachineTopic>? OnData(
      Controller? controller, ControlledMachine machine, Dictionary<string, string> values) {
      string data = values["help"];
      machine.Log.Debug("[HELP] {data}", data);

      return new HashSet<MachineTopic>();
    }
  }
}
