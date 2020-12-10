using System.Collections.Generic;
using System.Linq;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Grbl {
  public class GrblVersionParser : RegexParser {
    public GrblVersionParser() : base(@"^\[(?:VER:)(?<data>.+)\]$", OnData) { }

    private static void OnData(Controller? controller, ControlledMachine machine, Dictionary<string, string> values) {
      if (!values.ContainsKey("data")) return;
      string data = values["data"];

      string[] halves = data.Split(':');
      if (halves.Length < 1) return;

      string versionStr = halves.First();
      List<string> versionParts = versionStr.Split('.').ToList();

      machine.Configuration.Firmware.Name = MachineControllerType.Grbl.ToString();

      List<string> editions = new();
      while (versionParts.Count > 1) {
        if (versionParts[0].Length > 3) break; // date digit
        editions.Push(versionParts[0]);
        versionParts.RemoveAt(0);
      }
      machine.Configuration.Firmware.Edition = string.Join('.', editions);
      if (versionParts.Count > 0) {
        if (decimal.TryParse(versionParts[0], out decimal val)) machine.Configuration.Firmware.Value = val;
      }
      if (versionParts.Count > 1) {
        List<string> remain = versionParts.ToList().GetRange(1, versionParts.Count - 1);
        if (remain.Count > 1) {
          machine.Log.Warning("Several unparsed version pieces: {remain}", remain);
        }
        machine.Configuration.Firmware.Name = string.Join(':', remain);
      }

      if (halves.Length > 1) machine.Configuration.Firmware.FriendlyName = halves.Last();

      machine.Log.Debug("[FIRMWARE] {@firmware}", machine.Configuration.Firmware);
      controller?.Manager.GetSubscriptionTopic(MachineTopic.Configuration).Emit(machine);
    }
  }
}
