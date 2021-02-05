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
      MachineDetectedFirmware fw = line.Machine.Configuration.Firmware;

      if (values.ContainsKey("protocol"))
        fw.Protocol.DetectedValue = values["protocol"];

      if (values.ContainsKey("edition") && string.IsNullOrWhiteSpace(fw.Edition.DetectedValue))
        fw.Edition.DetectedValue = values["edition"];

      if (values.ContainsKey("prompt"))
        fw.WelcomeMessage = values["prompt"];

      line.Machine.Log.Information("[WELCOME] {keys} {@values}", values.Keys, values);
      return line;
    }
  }
}

