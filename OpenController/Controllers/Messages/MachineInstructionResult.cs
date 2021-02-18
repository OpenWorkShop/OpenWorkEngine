using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Messages {
  public record MachineInstructionResult(ControlledMachine Machine, CompiledInstruction Instruction, MachineLogEntry WriteLogEntry) {
    public MachineLogEntry? ResponseLogEntry { get; internal set; }

    public List<InstructionStep> Apply() {
      List<InstructionStep> steps = Instruction.GetSteps(Machine);
      foreach (InstructionStep step in steps) {
        step.Apply();
      }
      return steps;
    }
  }
}
