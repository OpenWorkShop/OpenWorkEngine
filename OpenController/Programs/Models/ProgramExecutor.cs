using System;
using System.Collections.Generic;
using System.Linq;
using HotChocolate.Data;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Machines.Messages;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Programs.Enums;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public class ProgramExecutor {
    public string Id => ProgramFile.Id;

    public ProgramFile ProgramFile { get; }

    public ExecutionState State { get; private set; } = ExecutionState.Ready;

    [UsePaging]
    [UseFiltering(typeof(MachineLogEntryFilterInputType))]
    [UseSorting]
    public IQueryable<ProgramInstruction> Instructions() => _instructions.AsQueryable();
    private readonly List<ProgramInstruction> _instructions;

    // Current instruction (not yet run).
    public int InstructionIndex {
      get => _instructionIndex;
      set {
        _instructionIndex = Math.Max(0, Math.Min(value, ProgramFile.InstructionCount));
        if (_instructionIndex >= ProgramFile.InstructionCount)
          State = ExecutionState.Complete;
      }
    }
    private int _instructionIndex;

    public int InstructionCount => _instructions.Count;

    internal Controller Controller { get; }

    public ProgramInstruction? CurrentInstruction =>
      InstructionIndex < ProgramFile.InstructionCount ? _instructions[InstructionIndex] : null;

    public ProgramExecutor(Controller controller, ProgramFile programFile) {
      Controller = controller;
      ProgramFile = programFile;

      _instructions = programFile.Instructions.Select(
        i => new ProgramInstruction(programFile.Instructions.IndexOf(i), i, i.GetSteps(controller.Connection.Machine))
      ).Where(i => i.Steps.Any()).ToList();
    }

    internal bool Advance() {
      InstructionIndex += 1;
      return CurrentInstruction != null;
    }
  }
}
