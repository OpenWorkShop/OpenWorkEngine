using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Syntax;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public sealed class CompiledInstruction {
    public string Code { get; }

    public string Source { get; }

    public List<SyntaxChunk> Chunks { get; }

    public CompiledInstruction(IControllerInstruction instruction, string code) {
      Code = code;
      Source = instruction.InstructionSource;
      Chunks = instruction.CompileChunks(code);
    }
  }
}
