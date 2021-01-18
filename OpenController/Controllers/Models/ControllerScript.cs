using System;
using OpenWorkEngine.OpenController.Controllers.Interfaces;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  /// <summary>
  /// One or more instructions to be executed in sequence.
  /// </summary>
  public class ControllerScript {
    public IControllerInstruction[] Instructions { get; }

    public ControllerScript(params IControllerInstruction[] instructions) {
      if (instructions.Length < 1) throw new ArgumentException("Empty instruction set");
      Instructions = instructions;
    }
  }
}
