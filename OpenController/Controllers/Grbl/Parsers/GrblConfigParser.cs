using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax.GCode;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Parsers {
  internal class GrblConfigParser : RegexParser {
    public GrblConfigParser() : base(@"^\[(?:GC:)?(?<data>(?:[a-zA-Z][0-9]+(?:\.[0-9]*)?\s*)+)\]$", OnData) { }

    private static HashSet<MachineTopic>? OnData(Controller? controller, ControlledMachine machine, Dictionary<string, string> values) {
      int orig = machine.Configuration.GetHashCode();

      string data = values["data"];
      machine.Log.Debug("[CONFIG] {data}", data);

      List<string> words = data.Split(' ')
                               .Where(w => !string.IsNullOrWhiteSpace(w))
                               .Select(w => w.Trim())
                               .ToList();

      foreach (string word in words) machine.SetGCodeConfigurationWord(word);

      return BroadcastChange(controller, machine, orig, machine.Configuration.GetHashCode(), MachineTopic.Configuration);
    }
  }
}
