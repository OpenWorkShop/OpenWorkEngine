using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Utils;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Programs.Interfaces;
using OpenWorkEngine.OpenController.Syntax;
using OpenWorkEngine.OpenController.Syntax.GCode;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public class TerminalCommand : IMachineCommand {
    public string Name => "Terminal";

    public string Value { get; set; } = default!;

    public ProgramSyntax Syntax => ProgramSyntax.GCode;
  }
}
