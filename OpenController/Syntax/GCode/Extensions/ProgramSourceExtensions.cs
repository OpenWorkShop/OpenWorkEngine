using System;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Programs.Interfaces;

namespace OpenWorkEngine.OpenController.Syntax.GCode.Extensions {
  public static class ProgramGCodeExtensions {
    public static ControllerScript CompileScript(this IProgramSource source, string value) {
      if (source.Syntax != ProgramSyntax.GCode) {
        throw new ArgumentException(source.Syntax.ToString());
      }
      return new ControllerScript(Compiler.LoadInstructions(value, c => new GCodeBlock(c, source.Name)));
    }
  }
}
