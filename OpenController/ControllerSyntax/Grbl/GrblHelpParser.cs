using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal class GrblHelpParser : RegexParser {
    public GrblHelpParser() : base(@"^\[(?:HLP:)(?<help>.+)\]$") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) =>
      line.WithLogEntry(new MachineLogEntry(line, values["help"]));
  }
}
