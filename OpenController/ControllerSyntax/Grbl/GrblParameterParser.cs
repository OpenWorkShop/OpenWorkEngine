using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax.GCode;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal class GrblParameterParser : RegexParser {
    public GrblParameterParser() : base(@"^\[(?<k>G54|G55|G56|G57|G58|G59|G28|G30|G92|TLO|PRB):(?<v>.+)\]$") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      int orig = line.Machine.Configuration.GetHashCode();

      string key = values["k"];
      string val = values["v"];
      string[] parts = val.Split(':');
      MachinePosition pos = GrblStatusParser.GetPositionArgument(parts.First());

      if (key.Equals("TLO")) {
        line.Machine.Status.Applicator.LengthOffset = pos;
      } else if (key.Equals("PRB")) {
        line.Machine.Status.Applicator.ProbePosition = pos;
      } else {
        GCodeWord word = new GCodeWord(key);
        if (word.Value >= 54 && word.Value <= 59) {
          int i = (int) word.Value - 54;
          line.Machine.Configuration.SetWorkCoordinatePosition(i, pos);
        } else if (word.Value == 28) {
          line.Machine.Configuration.ReferencePosition[0] = pos;
        } else if (word.Value == 30) {
          line.Machine.Configuration.ReferencePosition[1] = pos;
        } else if (word.Value == 92) {
          line.Machine.Configuration.WorkOffset = pos;
        } else {
          line.Machine.Log.Error("Unknown parameter word: {word}", word.Raw);
        }
      }

      return CheckChange(line, orig, line.Machine.Configuration.GetHashCode(), MachineTopic.Configuration);
    }
  }
}
