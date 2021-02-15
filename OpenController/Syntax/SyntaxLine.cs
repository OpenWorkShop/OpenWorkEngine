using System;
using System.Collections.Generic;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Syntax {
  public class SyntaxLine {
    public string Raw { get; }
    public List<SyntaxChunk> Chunks { get; }

    internal Func<ControlledMachine, FirmwareSettingMutation?> GetMutation;

    public SyntaxLine(string raw, List<SyntaxChunk> chunks, Func<ControlledMachine, FirmwareSettingMutation?> mutation) {
      Raw = raw;
      Chunks = chunks;
      GetMutation = mutation;
    }
  }
}
