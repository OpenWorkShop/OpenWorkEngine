using System;
using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Interfaces;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  /// <summary>
  /// One or more instructions to be executed in sequence.
  /// </summary>
  public class ControllerScript {
    public List<IControllerInstruction> Instructions { get; }

    public ControllerScript(params IControllerInstruction[] instructions) {
      if (instructions.Length < 1) throw new ArgumentException("Empty instruction set");
      Instructions = instructions.ToList();
    }

    internal void AppendLines(params IControllerInstruction[] instructions) {
      Instructions.AddRange(instructions);
    }

    internal ControllerScript ScriptWithAppendedLines(params IControllerInstruction[] instructions) {
      List<IControllerInstruction> ins = Instructions.ToList();
      ins.AddRange(instructions);
      return new ControllerScript(ins.ToArray());
    }
  }
}
