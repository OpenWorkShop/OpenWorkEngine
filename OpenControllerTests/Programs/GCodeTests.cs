using FluentAssertions;
using MakerverseServerTests;
using OpenWorkEngine.OpenController.Programs.GCode;
using Xunit;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests.Programs {
  public class GCodeTests : TestBase {
    [Theory]
    [InlineData("G0 X100 ; Test comment")]
    [InlineData("G0 (Test) X100")]
    [InlineData("G0 (Test) X100 (Two) (or) (more)     (commments)")]
    public void CanParseComments(string line) {
      GCodeLine gCodeLine = new GCodeLine(line, Serilog.Log.Logger);
      gCodeLine.Commands.Count.Should().Be(2);
      gCodeLine.Comments.Count.Should().BeGreaterThan(0);
    }

    public GCodeTests(ITestOutputHelper output) : base(output) { }
  }
}
