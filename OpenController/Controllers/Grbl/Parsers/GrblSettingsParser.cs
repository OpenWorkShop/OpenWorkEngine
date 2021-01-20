using System;
using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Parsers {
  internal class GrblSettingsParser : RegexParser {
    public GrblSettingsParser() : base(@"^(?<key>\$[^=]+)=(?<val>[^ ]*)\s*(?<suf>.*)?", OnData) { }

    private static HashSet<MachineTopic> OnData(
      Controller? controller, ControlledMachine machine, Dictionary<string, string> values
    ) {
      HashSet<MachineTopic> ret = new HashSet<MachineTopic>();
      string key = values["key"].Substring(1);
      string val = values["val"];
      string comment = values["suf"].Trim(' ', '\r', '\n', '\t', '(', ')');
      string[] parts = comment.Split(',').Select(s => s.Trim()).ToArray();
      machine.Log.Debug("[SET] '{key}' = '{value}' {suf}", key, val, comment);
      bool changed = machine.SetSetting(new MachineSetting(key, val, parts[0]));
      if (changed) {
        ret.Add(MachineTopic.Setting);
      }
      return ret;
    }
  }
}
