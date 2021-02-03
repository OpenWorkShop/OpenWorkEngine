using System;
using System.Collections.Generic;
using System.Linq;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal class GrblSettingsParser : RegexParser {
    public GrblSettingsParser() : base(@"^(?<key>\$[^=]+)=(?<val>[^ ]*)\s*(?<comment>.*)?") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      FirmwareSetting? setting = ApplySetting(
        line,
        values["key"],
        values["val"].Trim(),
        values.ContainsKey("comment") ? values["comment"].Trim(' ', '\r', '\n', '\t', '(', ')') : null
      );

      if (setting == null) return line;

      if (setting.IsDirty) {
        line = line.WithTopics(MachineTopic.Setting);
        setting.IsDirty = false;
      }
      return line.WithLogEntry(setting.ToLogEntry(setting.Comment));
    }

    public static FirmwareSetting? ApplySetting(MachineOutputLine line, string key, string val, string? comment) {
      if (!key.StartsWith("$")) key = $"${key}";
      FirmwareSetting? setting = line.Translator.GetSetting(line.Machine, key);
      if (setting == null) {
        line.Log.Error("[SETTING] no mapping found for {key}={val} ({comment}) among: {settings}",
          key, val, comment, line.Translator.settingCodes.Keys);
        return null;
      }

      string iStr = key.Substring(1);
      if (int.TryParse(iStr, out int iVal)) setting.Index = iVal;

      setting.Key = key;
      if (comment != null) setting.Comment = comment;

      try {
        setting.Value = val;
      } catch (Exception e) {
        line.Log.Error(e, "Failed to set {key}={val} ({id})", key, val, setting.Id);
      }

      return setting;
    }
  }
}
