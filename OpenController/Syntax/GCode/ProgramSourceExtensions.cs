using System;
using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Programs.Interfaces;
using Serilog;

namespace OpenWorkEngine.OpenController.Syntax.GCode {
  public static class ProgramGCodeExtensions {
    public static ControllerScript CompileScript(
      this IProgramSource source, string value, string? sourceName = null, bool inline = false
    ) {
      if (source.Syntax != ProgramSyntax.GCode) {
        throw new ArgumentException(source.Syntax.ToString());
      }
      sourceName ??= source.Name;
      IControllerInstruction[] instructions = value.Replace('\r', '\n')
                  .Split('\n')
                  .Where(s => !string.IsNullOrWhiteSpace(s))
                  .Select(s => s.Trim())
                  .Select(s => new GCodeBlock(s, sourceName, inline) as IControllerInstruction)
                  .ToArray();
      return new ControllerScript(instructions);
    }
  }
}
