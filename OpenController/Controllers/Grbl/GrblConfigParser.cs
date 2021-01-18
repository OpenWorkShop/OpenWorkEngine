using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax.GCode;

namespace OpenWorkEngine.OpenController.Controllers.Grbl {
  internal class GrblConfigParser : RegexParser {
    public GrblConfigParser() : base(@"^\[(?:GC:)?(?<data>(?:[a-zA-Z][0-9]+(?:\.[0-9]*)?\s*)+)\]$", OnData) { }

    private static void OnData(Controller? controller, ControlledMachine machine, Dictionary<string, string> values) {
      string data = values["data"];
      if (data == null) return;

      List<string> words = data.Split(' ')
                               .Where(w => !string.IsNullOrWhiteSpace(w))
                               .Select(w => w.Trim())
                               .ToList();

      int origConfigHash = machine.Configuration.GetHashCode();

      foreach (string word in words) machine.ApplyGCodeConfigurationWord(word);

      bool configChanged = origConfigHash != machine.Configuration.GetHashCode();
      if (configChanged) {
        machine.Log.Information("[CONFIG] changed, new: {config}", machine.Configuration.ToString());
        controller?.Manager.GetSubscriptionTopic(MachineTopic.Configuration).Emit(machine);
      }
    }
  }
}
