using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal class GrblWelcomeParser : RegexParser {
    public GrblWelcomeParser() : base(
      @"^(?<protocol>[a-zA-Z0-9]+)\s+(?<edition>(?:\d+\.){1,2}\d+[a-zA-Z0-9\-\.]*)(<?prompt>[^\[]*\[[^\]]+\].*)?") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      if (values.ContainsKey("protocol")) line.Machine.Configuration.Firmware.Protocol = values["protocol"];
      if (values.ContainsKey("edition") && string.IsNullOrWhiteSpace(line.Machine.Configuration.Firmware.Edition))
        line.Machine.Configuration.Firmware.Edition = values["edition"];
      if (values.ContainsKey("prompt")) line.Machine.Configuration.Firmware.WelcomeMessage = values["prompt"];
      line.Machine.Log.Information("[WELCOME] {keys} {@values}", values.Keys, values);
      return line;
    }
  }
}
