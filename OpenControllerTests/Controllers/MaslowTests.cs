using System.Linq;
using FluentAssertions;
using MakerverseServerTests;
using OpenWorkEngine.OpenController.ControllerSyntax;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl.Maslow;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;
using Xunit;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests.Controllers {
  public class MaslowTests : TestBase {
    private readonly ControllerTranslator _parsers = new ControllerTranslator().UseMaslowSyntax();

    public MaslowTests(ITestOutputHelper output) : base(output) { }

    [Theory]
    [InlineData("[VER:1.1g.20200915.MaslowDue:]")]
    public void CanParseMaslowVersions(string versionString) {
      ControlledMachine machine = GrblTests.TestParser(_parsers.FirmwareParser, versionString);

      MachineDetectedFirmware fw = machine.Configuration.Firmware;
      fw.Should().NotBeNull();
      fw?.Name.Should().Be("MaslowDue");
      fw?.Edition.Should().Be("1.1g");
      fw?.Value?.Should().Be(20200915);
    }

    [Theory]
    [InlineData("[Message: Unable to find valid machine position for chain lengths 5, 4 .")]
    public void CanParseMaslowErrorFeedback(string line) {
      ControlledMachine m = GrblTests.TestParser(_parsers.Fallback, line);

      m.LogEntries.Last().LogLevel.Should().Be(MachineLogLevel.Err);
    }
  }
}
