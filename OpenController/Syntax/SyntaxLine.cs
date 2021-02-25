using System;
using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Syntax {
  public class SyntaxLine {
    public string Raw { get; }
    public List<SyntaxChunk> Chunks { get; }

    public bool HasCode => Chunks.Any(c => c.IsCode);

    public bool IsValid => Chunks.Any(c => c.IsValid);

    public SyntaxLine(string raw, List<SyntaxChunk> chunks) {
      Raw = raw;
      Chunks = chunks;
    }
  }
}
