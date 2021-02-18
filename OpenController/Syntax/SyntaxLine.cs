using System;
using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Syntax {
  public class SyntaxLine {
    public string Raw { get; }
    public List<SyntaxChunk> Chunks { get; }

    public SyntaxLine(string raw, List<SyntaxChunk> chunks) {
      Raw = raw;
      Chunks = chunks;
    }
  }
}
