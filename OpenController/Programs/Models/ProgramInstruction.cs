using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Programs.Enums;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public record ProgramInstruction(int Index, CompiledInstruction CompiledInstruction, List<InstructionStep> Steps);
}
