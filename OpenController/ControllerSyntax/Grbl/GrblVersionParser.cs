using System.Collections.Generic;
using System.Linq;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal class GrblVersionParser : RegexParser {
    public GrblVersionParser() : base(@"^\[(?:VER:)(?<data>.+)\]$") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      if (!values.ContainsKey("data")) return line;
      int orig = line.Machine.Configuration.GetHashCode();
      string data = values["data"];

      string[] halves = data.Split(':');
      if (halves.Length < 1) return line;

      string versionStr = halves.First();
      List<string> versionParts = versionStr.Split('.').ToList();

      line.Machine.Configuration.Firmware.Name.DetectedValue = MachineControllerType.Grbl.ToString();

      List<string> editions = new();
      while (versionParts.Count > 1) {
        if (versionParts[0].Length > 3) break; // date digit
        editions.Push(versionParts[0]);
        versionParts.RemoveAt(0);
      }
      line.Machine.Configuration.Firmware.Edition.DetectedValue = string.Join('.', editions);
      if (versionParts.Count > 0)
        if (decimal.TryParse(versionParts[0], out decimal val))
          line.Machine.Configuration.Firmware.Version.DetectedValue = val;
      if (versionParts.Count > 1) {
        List<string> remain = versionParts.ToList().GetRange(1, versionParts.Count - 1);
        if (remain.Count > 1) line.Machine.Log.Warning("Several unparsed version pieces: {remain}", remain);
        line.Machine.Configuration.Firmware.Name.DetectedValue = string.Join(':', remain);
      }

      if (halves.Length > 1) line.Machine.Configuration.Firmware.FriendlyName = halves.Last();

      line.Machine.Log.Debug("[FIRMWARE] {@firmware}", line.Machine.Configuration.Firmware);
      return CheckChange(line, orig, line.Machine.Configuration.GetHashCode(), MachineTopic.Configuration);
    }
  }
}
