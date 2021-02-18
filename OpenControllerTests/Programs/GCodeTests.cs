using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using FluentAssertions;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.ControllerSyntax;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Programs.Enums;
using OpenWorkEngine.OpenController.Programs.Interfaces;
using OpenWorkEngine.OpenController.Programs.Models;
using OpenWorkEngine.OpenController.Syntax;
using OpenWorkEngine.OpenController.Syntax.GCode;
using Serilog;
using Xunit;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests.Programs {
  public class GCodeTests : TestBase, IProgramSource {
    public GCodeTests(ITestOutputHelper output) : base(output) { }

    [Theory]
    [InlineData("G0 X100 ; Test comment")]
    [InlineData("G0 (Test) X100")]
    [InlineData("(Test) G0 X100")]
    [InlineData("G0 (Test) X100 (Two) (or) (more)     (commments)")]
    public void CanParseComments(string line) {
      GCodeBlock gCodeBlock = new(line, nameof(GCodeTests));
      Log.Information("Commands: {commands}", gCodeBlock.CodeChunks);
      gCodeBlock.CodeChunks.Count.Should().Be(2);
      gCodeBlock.CodeChunks.First().Value.Should().Be("G0");
      gCodeBlock.CodeChunks[1].Value.Should().Be("X100");

      string comments = string.Join(" ... ", gCodeBlock.Chunks.SelectMany(c => c.Comments));
      Log.Information(comments);
      comments.Should().Contain("Test");
    }

    [Theory]
    [ProgramFileData("backs.nc")]
    [ProgramFileData("hexagon-4.5w-4bit.nc")]
    [ProgramFileData("heart-050_thick-025_bit.nc")]
    public void CanParseFile(ProgramFileMeta programFileMeta) {
      ProgramFile programFile = new ProgramFile(programFileMeta, Log.Logger);
      while (programFile.Process()) { }

      programFile.UnprocessedLines.Count.Should().Be(0);
      programFile.State.Should().Be(ProgramState.Loaded);
      programFile.InstructionIndex.Should().Be(0);
      programFile.InstructionCount.Should().BeGreaterThan(0);

      ControlledMachine machine = new ("/dev/test", null, Log.Logger);
      ControllerTranslator translator = new ControllerTranslator().UseGrblSyntax();
      translator.ConfigureMachine(machine);

      while (programFile.Advance()) {
        CompiledInstruction inst = programFile.CurrentInstruction!;
        MachineLogEntry write = MachineLogEntry.FromWrittenInstruction(inst);
        MachineLogEntry ack = MachineLogEntry.FromReadAck("ok");
        MachineInstructionResult res = new (machine, inst, write) { ResponseLogEntry = ack };
        List<InstructionStep> steps = res.Apply();
        foreach (InstructionStep step in steps) {
          try {
            Log.Verbose("{id}={value} {position}", step.Name, step.SettingValue, step.Movement?.ToString() ?? "");
          } catch (Exception e) {
            Log.Error(e, inst.Line.Raw);
          }
        }
      }

      programFile.State.Should().Be(ProgramState.Complete);
    }

    public string Name => nameof(GCodeTests);
    public ProgramSyntax Syntax => ProgramSyntax.GCode;
  }
}
