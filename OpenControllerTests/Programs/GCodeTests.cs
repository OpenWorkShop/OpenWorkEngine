using System.Linq;
using FluentAssertions;
using MakerverseServerTests;
using OpenWorkEngine.OpenController.Programs.Syntax.GCode;
using Serilog;
using Xunit;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests.Programs {
  public class GCodeTests : TestBase {
    public GCodeTests(ITestOutputHelper output) : base(output) { }

    [Theory]
    [InlineData("G0 X100 ; Test comment")]
    [InlineData("G0 (Test) X100")]
    [InlineData("(Test) G0 X100")]
    [InlineData("G0 (Test) X100 (Two) (or) (more)     (commments)")]
    public void CanParseComments(string line) {
      GCodeBlock gCodeBlock = new(line, Log.Logger);
      Log.Information("Commands: {commands}", gCodeBlock.Commands);
      gCodeBlock.Commands.Count.Should().Be(2);
      gCodeBlock.Commands.First().Value.Should().Be("G0");
      gCodeBlock.Commands[1].Value.Should().Be("X100");

      string comments = string.Join(" ... ", gCodeBlock.Chunks.SelectMany(c => c.Comments));
      Log.Information(comments);
      comments.Should().Contain("Test");
    }
  }
}
