using OpenWorkEngine.OpenController.Controllers.Utils;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Grbl {
  public static class GrblParsers {
    public static ParserSet AddGrblParsers(this ParserSet parsers) {
      parsers.FirmwareParser = new GrblVersionParser();
      parsers.WelcomeParser = new RegexParser(
        @"^(?<protocol>[a-zA-Z0-9]+)\s+(?<edition>(?:\d+\.){1,2}\d+[a-zA-Z0-9\-\.]*)(<?prompt>[^\[]*\[[^\]]+\].*)?",
        (controller, machine, vars) => {
          if (vars.ContainsKey("protocol")) machine.Configuration.Firmware.Protocol = vars["protocol"];
          if (vars.ContainsKey("edition") && string.IsNullOrWhiteSpace(machine.Configuration.Firmware.Edition)) machine.Configuration.Firmware.Edition = vars["edition"];
          if (vars.ContainsKey("prompt")) machine.Configuration.Firmware.WelcomeMessage = vars["prompt"];
          machine.Log.Information("[WELCOME] {keys} {@vars}", vars.Keys, vars);
        });

      return parsers;
    }
  }
}
