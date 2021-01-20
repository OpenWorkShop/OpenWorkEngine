using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax.GCode;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Parsers {
  internal class GrblParameterParser : RegexParser {
    public GrblParameterParser() : base(@"^\[(?<k>G54|G55|G56|G57|G58|G59|G28|G30|G92|TLO|PRB):(?<v>.+)\]$", OnData) { }

    private static HashSet<MachineTopic> OnData(
      Controller? controller, ControlledMachine machine, Dictionary<string, string> values) {
      int orig = machine.Configuration.GetHashCode();

      string key = values["k"];
      string val = values["v"];
      string[] parts = val.Split(':');
      MachinePosition pos = GrblStatusParser.GetPositionArgument(parts.First());

      if (key.Equals("TLO")) {
        machine.Configuration.Applicator.ToolLengthOffset = pos;
      } else if (key.Equals("PRB")) {
        machine.Configuration.Applicator.ProbePosition = pos;
      } else {
        GCodeWord word = new GCodeWord(key);
        if (word.Value >= 54 && word.Value <= 59) {
          int i = (int) word.Value - 54;
          machine.Configuration.SetWorkCoordinatePosition(i, pos);
        } else if (word.Value == 28) {
          machine.Configuration.ReferencePosition[0] = pos;
        } else if (word.Value == 30) {
          machine.Configuration.ReferencePosition[1] = pos;
        } else if (word.Value == 92) {
          machine.Configuration.WorkOffset = pos;
        } else {
          machine.Log.Error("Unknown parameter word: {word}", word.Raw);
        }
      }

      return BroadcastChange(controller, machine, orig, machine.Configuration.GetHashCode(), MachineTopic.Configuration);
    }
  }
}
