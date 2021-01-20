using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Parsers {
  internal class GrblWelcomeParser : RegexParser {
    public GrblWelcomeParser() : base(
      @"^(?<protocol>[a-zA-Z0-9]+)\s+(?<edition>(?:\d+\.){1,2}\d+[a-zA-Z0-9\-\.]*)(<?prompt>[^\[]*\[[^\]]+\].*)?",
      OnData) { }

    private static HashSet<MachineTopic> OnData(
      Controller? controller, ControlledMachine machine, Dictionary<string, string> vars
    ) {
      if (vars.ContainsKey("protocol")) machine.Configuration.Firmware.Protocol = vars["protocol"];
      if (vars.ContainsKey("edition") && string.IsNullOrWhiteSpace(machine.Configuration.Firmware.Edition)) machine.Configuration.Firmware.Edition = vars["edition"];
      if (vars.ContainsKey("prompt")) machine.Configuration.Firmware.WelcomeMessage = vars["prompt"];
      machine.Log.Information("[WELCOME] {keys} {@vars}", vars.Keys, vars);
      controller?.Manager.GetSubscriptionTopic(MachineTopic.Configuration).Emit(machine);
      return new HashSet<MachineTopic>() { MachineTopic.Configuration };
    }
  }
}
