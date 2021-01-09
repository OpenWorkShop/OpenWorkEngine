using FluentAssertions;
using MakerverseServerTests;
using OpenWorkEngine.OpenController.Controllers.Grbl;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;
using Xunit;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests.Controllers {
  public class VersionTests : TestBase {
    public VersionTests(ITestOutputHelper output) : base(output) { }

    [Theory]
    [InlineData("[VER:1.1f.20170801:LASER]")]
    [InlineData("[VER:2.0.0.20170522::CTRL0]")]
    public void CanParseGrblVersions(string versionString) {
      ControlledMachine machine = new ControlledMachine("", null, Log.Logger);
      ParserSet parsers = new ParserSet();
      parsers.AddGrblParsers();
      Log.Logger.Information("Parsers {parsers}", parsers.ToList());
      parsers.FirmwareParser?.UpdateMachine(null, machine, versionString);

      MachineDetectedFirmware fw = machine.Configuration.Firmware;
      fw.Should().NotBeNull();
      fw.Name.Should().Be(MachineControllerType.Grbl.ToString());
      fw.IsValid.Should().BeTrue();
      versionString.Should().Contain(fw.Edition);
      versionString.Should().Contain(fw.Value?.ToString());
    }

    [Theory]
    [InlineData("[VER:1.1g.20200915.MaslowDue:]")]
    public void CanParseMaslowVersions(string versionString) {
      ControlledMachine machine = new ControlledMachine("", null, Log.Logger);
      ParserSet parsers = new ParserSet();
      parsers.AddGrblParsers();
      Log.Logger.Information("Parsers {parsers}", parsers.ToList());
      parsers.FirmwareParser?.UpdateMachine(null, machine, versionString);

      MachineDetectedFirmware fw = machine.Configuration.Firmware;
      fw.Should().NotBeNull();
      fw?.Name.Should().Be("MaslowDue");
      fw?.Edition.Should().Be("1.1g");
      fw?.Value?.Should().Be(20200915);
    }
  }
}