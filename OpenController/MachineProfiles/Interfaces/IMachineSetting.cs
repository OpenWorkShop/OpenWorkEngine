using System.Collections.Generic;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax;

namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineSetting {
    public string Id { get; }

    public string? Title { get; }

    public MachineSettingType SettingType { get; }

    public string Key { get; }

    public string Value { get; }
  }

  public static class MachineSettingExtetnsions {
    public static string ShortNumber(string val) {
      if (val.Contains('.')) val = val.Trim('0').TrimEnd('.');
      if (val.StartsWith('.') || val.Length <= 0) val = $"0{val}";
      return val;
    }


    internal static MachineLogEntry ToLogEntry(this IMachineSetting setting, string? comment) {
      string valStr = ShortNumber(setting.Value);
      string title = setting.Title ?? setting.Key;

      List<SyntaxChunk> chunks = new List<SyntaxChunk>();
      if (setting.SettingType <= MachineSettingType.Grbl) {
        chunks.Push(new SyntaxChunk() {Value = setting.Key, Type = SyntaxType.Keyword});
        chunks.Push(new SyntaxChunk() {Value = "=", Type = SyntaxType.Operator});
      }
      List<string> comments = comment == null ? new List<string>() : new List<string>() {comment};
      chunks.Push(new SyntaxChunk() {Value = valStr, Type = SyntaxType.Value, Comments = comments});

      return MachineLogEntry.FromReadCode(title, MachineLogLevel.Cfg, chunks.ToArray());
    }
  }
}
