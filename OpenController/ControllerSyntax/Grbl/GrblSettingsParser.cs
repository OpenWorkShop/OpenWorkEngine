using System;
using System.Collections.Generic;
using System.Linq;
using HotChocolate.Language;
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
      MachineSetting setting = GetSetting(
        line,
        values["key"].Substring(1),
        values["val"].Trim(' ', '\r', '\n', '\t', '(', ')'),
        values.ContainsKey("comment") ? values["comment"] : null
      );

      bool changed = line.Machine.SetSetting(setting);
      if (changed) {
        line = line.WithTopics(MachineTopic.Setting);
      }
      return line.WithLogEntry(setting.ToLogEntry());
    }

    public static MachineSetting GetSetting(MachineOutputLine line, string key, string val, string? comment) {
      // if (!int.TryParse(key, out int code)) {
      //   throw new ArgumentException($"'{key}' is not a valid setting and cannot be set to '{val}'.");
      // }

      // MachineSettingType type = MachineSettingType.Grbl;
      // MachineSettingUnits units = MachineSettingUnits.Unknown;
      // string[] parts = (comment ?? "").Split(',').Select(s => s.Trim()).ToArray();
      // string title = string.Join(',', parts);

      SettingDefinition settingDefinition = Get(line, key, comment ?? "");
      return new MachineSetting() {
        Title = settingDefinition.title.ToString(),
        SettingType = settingDefinition.title,
        Units = settingDefinition.units,
        Key = key,
        Value = val,
      };
    }

    private static SettingDefinition? Find(MachineOutputLine line, string code) {
      if (code.StartsWith('$')) code = code.Substring(1);
      Dictionary<string, SettingDefinition> map =
        line.Controller?.Translator.SettingDefinitions.ToDictionary(s => s.code, s => s) ?? new();
      return map.ContainsKey(code) ? map[code] : null;
    }

    private static SettingDefinition Get(MachineOutputLine line, string code, string comment) {
      SettingDefinition? s = Find(line, code);
      if (s != null) return s;
      line.Log.Warning("GRBL setting ${code} is unknown: '{comment}'", code, comment);
      return new SettingDefinition(code, MachineSettingType.Grbl, MachineSettingUnits.Unknown);
    }
  }
}
