using System.Collections.Generic;
using OpenWorkEngine.OpenController.Programs.Enums;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public abstract class ProgramInstruction {
    public abstract ProgramInstructionType InstructionType { get; set; }

    public List<ProgramParameter> Parameters { get; set; } = new();

    // A comment on the entire line (EOL)
    public string? Comment { get; set; } = null;
  }
}
