using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Syntax;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public sealed class CompiledInstruction {
    public string Source { get; }

    public SyntaxLine Line { get; }

    internal IControllerInstruction InstructionDefinition { get; }

    public override string ToString() => Line.Raw;

    public CompiledInstruction(IControllerInstruction instructionDefinition, string code, string? source = null) {
      Line = instructionDefinition.CompileSyntax(code);
      InstructionDefinition = instructionDefinition;
      Source = source ?? instructionDefinition.InstructionSource;
    }
  }
}
