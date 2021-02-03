using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Syntax;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public sealed class CompiledInstruction {
    public string Code { get; }

    public string Source { get; }

    public List<SyntaxChunk> Chunks { get; }

    internal IControllerInstruction InstructionDefinition { get; }

    public CompiledInstruction(IControllerInstruction instructionDefinition, string code, string? source = null) {
      Code = code;
      InstructionDefinition = instructionDefinition;
      Source = source ?? instructionDefinition.InstructionSource;
      Chunks = instructionDefinition.CompileChunks(code);
    }
  }
}
