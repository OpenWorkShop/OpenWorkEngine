using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal class GrblOptionParser : RegexParser {
    public GrblOptionParser() : base(@"^\[(?:OPT:)(?<opt>.+)\]$") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      int orig = line.Machine.Configuration.GetHashCode();
      line.Machine.Configuration.Options = new MachineOptions(values["opt"]);

      return CheckChange(line, orig, line.Machine.Configuration.GetHashCode(), MachineTopic.Configuration);

    }
  }
}
