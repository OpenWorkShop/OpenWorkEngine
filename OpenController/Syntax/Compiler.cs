using System;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Syntax.GCode;

namespace OpenWorkEngine.OpenController.Syntax {
  public static class Compiler {
    public static IControllerInstruction[] LoadInstructions(string code, Func<string, IControllerInstruction> builder) =>
      code.Replace('\r', '\n')
          .Split('\n')
          .Where(s => !string.IsNullOrWhiteSpace(s))
          .Select(s => s.Trim())
          .Select(builder)
          .ToArray();
  }
}
