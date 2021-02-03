using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Messages {
  public record MachineInstructionResult(CompiledInstruction Instruction, MachineLogEntry WriteLogEntry) {
    public MachineLogEntry? ResponseLogEntry { get; internal set; }
  }
}
