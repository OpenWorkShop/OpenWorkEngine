using System.Collections.Generic;
using OpenWorkEngine.OpenController.Programs.Enums;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public class ProgramFile {
    // (File) name (without extension)
    public string Name { get; set; } = default!;

    public ProgramSyntax Syntax { get; set; } = ProgramSyntax.Gcode;

    public List<ProgramInstruction> Instructions { get; set; } = new();
  }
}
