using System;
using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Programs.Enums;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public class Program {
    public string Id => ProgramFile.Id;

    public ProgramFile ProgramFile { get; }

    public ProgramState State { get; private set; } = ProgramState.Ready;

    public List<ProgramInstruction> Instructions { get; private set; }

    // Current instruction (not yet run).
    public int InstructionIndex {
      get => _instructionIndex;
      set {
        _instructionIndex = Math.Max(0, Math.Min(value, ProgramFile.InstructionCount));
        if (_instructionIndex >= ProgramFile.InstructionCount)
          State = ProgramState.Complete;
      }
    }
    private int _instructionIndex;

    public int InstructionCount => Instructions.Count;

    internal Controller Controller { get; }

    public ProgramInstruction? CurrentInstruction =>
      InstructionIndex < ProgramFile.InstructionCount ? Instructions[InstructionIndex] : null;

    public Program(Controller controller, ProgramFile programFile) {
      Controller = controller;
      ProgramFile = programFile;

      Instructions = programFile.Instructions.Select(
        i => new ProgramInstruction(programFile.Instructions.IndexOf(i), i, i.GetSteps(controller.Connection.Machine))
      ).Where(i => i.Steps.Any()).ToList();
    }

    internal bool Advance() {
      InstructionIndex += 1;
      return CurrentInstruction != null;
    }
  }
}
