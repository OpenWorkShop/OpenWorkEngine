using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax.GCode.Extensions;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal class GrblConfigParser : RegexParser {
    public GrblConfigParser() : base(@"^\[(?:GC:)?(?<data>(?:[a-zA-Z][0-9]+(?:\.[0-9]*)?\s*)+)\]$") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      int orig = line.Machine.Configuration.GetHashCode();

      string data = values["data"];
      line.Machine.Log.Debug("[CONFIG] {data}", data.Trim());

      List<string> words = data.Split(' ')
                               .Where(w => !string.IsNullOrWhiteSpace(w))
                               .Select(w => w.Trim())
                               .ToList();

      foreach (string word in words) line.Machine.SetGCodeConfigurationWord(word);

      return CheckChange(line, orig, line.Machine.Configuration.GetHashCode(), MachineTopic.Configuration);
    }
  }
}
