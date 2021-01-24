using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal class GrblSettingsParser : RegexParser {
    public GrblSettingsParser() : base(@"^(?<key>\$[^=]+)=(?<val>[^ ]*)\s*(?<suf>.*)?") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      HashSet<MachineTopic> ret = new HashSet<MachineTopic>();
      string key = values["key"].Substring(1);
      string val = values["val"];
      string comment = values["suf"].Trim(' ', '\r', '\n', '\t', '(', ')');
      string[] parts = comment.Split(',').Select(s => s.Trim()).ToArray();
      line.Machine.Log.Debug("[SET] '{key}' = '{value}' {suf}", key, val, comment);
      bool changed = line.Machine.SetSetting(new MachineSetting(key, val, parts[0]));
      if (changed) {
        ret.Add(MachineTopic.Setting);
      }
      return line;
    }
  }
}
