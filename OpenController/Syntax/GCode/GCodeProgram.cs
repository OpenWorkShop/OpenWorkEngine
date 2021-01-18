using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Programs.Interfaces;
using OpenWorkEngine.OpenController.Programs.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Syntax.GCode {
  public class GCodeProgram : ProgramFile {
    public override ProgramSyntax Syntax => ProgramSyntax.GCode;

    // public override List<IControllerInstruction> Instructions => Blocks.Cast<IControllerInstruction>().ToList();

    public GCodeProgram(string name, ILogger log) : base(name, log) { }

    // public List<GCodeBlock> Blocks { get; } = new();

    public override string ToString() => $"<GC:{Name}>";
  }
}
