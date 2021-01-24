using System.Collections.Generic;
using FluentAssertions;
using MakerverseServerTests;
using Newtonsoft.Json;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax.GCode;
using Serilog;
using Xunit;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests.Controllers {
  public class TestArgs {
    public decimal? X => Get("X");
    public decimal? Y => Get("Y");

    private decimal? Get(string name) => _data.ContainsKey(name) ? _data[name] : null;

    private readonly Dictionary<string, decimal> _data = new();

    public TestArgs(string? json) {
      if (json != null) {
        _data = JsonConvert.DeserializeObject<Dictionary<string, decimal>>(json);
      }
    }
  }

  public class InstructionTests : TestBase {
    [Theory]
    [InlineData("G0 X2", null)]
    [InlineData(GrblSyntax.MoveCommandTemplate, "{ \"X\": 2, \"Y\": 5 }")]
    [InlineData(GrblSyntax.MoveCommandTemplate, "{ \"G\": 0, \"X\": 2.2, \"Z\": 5.5 }")]
    public void CanCompileInstructions(string template, string? json) {
      string src = nameof(InstructionTests);
      GCodeBlock block = new GCodeBlock(template, src);
      MoveCommand move = json == null ? new MoveCommand() : JsonConvert.DeserializeObject<MoveCommand>(json);
      CompiledInstruction compiled = block.Compile(move);
      compiled.Code
              .Should().NotBeEmpty()
              .And.NotContain("$", "{", "}")
              .And.NotContain("A", "B", "C")
              .And.Contain("X2")
              .And.StartWith("G0");
      compiled.Source.Should().Be(src);
    }

    public InstructionTests(ITestOutputHelper output) : base(output) { }
  }
}
