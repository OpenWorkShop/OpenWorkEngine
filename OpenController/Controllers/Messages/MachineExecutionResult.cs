using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Messages {
  public record MachineExecutionResult(
    ControlledMachine Machine, List<MachineInstructionResult> InstructionResults);
}
