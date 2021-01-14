using FluentAssertions;
using MakerverseServerTests;
using OpenWorkEngine.OpenController.Controllers.Grbl;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;
using Xunit;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests.Controllers {
  public class MaslowTests : TestBase {
    private readonly ControlledMachine _machine = new("", null, Log.Logger);
    private readonly ParserSet _parsers = new ParserSet().AddGrblParsers();

    public MaslowTests(ITestOutputHelper output) : base(output) { }

    [Theory]
    [InlineData("[VER:1.1g.20200915.MaslowDue:]")]
    public void CanParseMaslowVersions(string versionString) {
      _parsers.FirmwareParser?.UpdateMachine(null, _machine, versionString);

      MachineDetectedFirmware fw = _machine.Configuration.Firmware;
      fw.Should().NotBeNull();
      fw?.Name.Should().Be("MaslowDue");
      fw?.Edition.Should().Be("1.1g");
      fw?.Value?.Should().Be(20200915);
    }
  }
}
