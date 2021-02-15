using System;
using System.IO;
using System.Linq;
using FluentAssertions;
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
      //
      // foreach (string line in lines) {
      //   GCodeBlock gCodeBlock = new(line, nameof(GCodeTests));
      //   gCodeBlock.Should().NotBeNull();
      //   AssertHealthyLogs();
      //
      //   Log.Information("Commands: {commands}", gCodeBlock.Chunks);
      // }
    }

    public string Name => nameof(GCodeTests);
    public ProgramSyntax Syntax => ProgramSyntax.GCode;
  }
}
