using System;
using System.Collections.Generic;
using System.Linq;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal class GrblSettingsParser : RegexParser {
    public GrblSettingsParser() : base(@"^(?<key>\$[^=]+)=(?<val>[^ ]*)\s*(?<comment>.*)?") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      int orig = line.Machine.Settings.GetHashCode();

      FirmwareSetting? setting = ApplySetting(
        line,
        values["key"].Substring(1),
        values["val"].Trim(),
        values.ContainsKey("comment") ? values["comment"].Trim(' ', '\r', '\n', '\t', '(', ')') : null
      );

      if (setting == null) return line;

      bool changed = orig != line.Machine.Settings.GetHashCode();
      if (changed) {
        line = line.WithTopics(MachineTopic.Setting);
      }
      return line.WithLogEntry(setting.ToLogEntry());
    }

    public static FirmwareSetting? ApplySetting(MachineOutputLine line, string key, string val, string? comment) {
      if (!key.StartsWith("$")) key = $"${key}";
      FirmwareSetting? setting = line.Translator.GetSetting(line.Machine.Settings, key);
      if (setting == null) {
        line.Log.Error("[SETTING] no mapping found for {key}={val} ({comment}) among: {settings}",
          key, val, comment, line.Translator.settingCodes.Keys);
        return null;
      }

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
