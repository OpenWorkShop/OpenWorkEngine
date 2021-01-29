using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using MakerverseServerTests;
using Newtonsoft.Json;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.ControllerSyntax;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl.Maslow;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;
using Xunit;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests.Controllers {
  public class MaslowTests : GrblTests {
    internal override ControllerTranslator BuildTranslator() => new ControllerTranslator().UseMaslowSyntax();

    public MaslowTests(ITestOutputHelper output) : base(output) { }

    [Theory]
    [InlineData("[VER:1.1g.20200915.MaslowDue:]")]
    public void CanParseMaslowVersions(string versionString) {
      ControlledMachine machine = TestParser(Translator.FirmwareParser, versionString);

      MachineDetectedFirmware fw = machine.Configuration.Firmware;
      fw.Should().NotBeNull();
      fw?.Name.Should().Be("MaslowDue");
      fw?.Edition.Should().Be("1.1g");
      fw?.Value?.Should().Be(20200915);
    }

    [Theory]
    [InlineData("[Message: Unable to find valid machine position for chain lengths 5, 4 .")]
    public void CanParseMaslowErrorFeedback(string line) {
      ControlledMachine m = TestParser(Translator.Fallback, line);

      m.LogEntries.Last().LogLevel.Should().Be(MachineLogLevel.Err);
    }

    [Theory]
    [InlineData("$40=22528")]
    [InlineData("$41=17408")]
    [InlineData("$42=20480")]
    [InlineData("$43=5000")]
    [InlineData("$45=0.0000051685")]
    [InlineData("$46=97.900")]
    [InlineData("$50=22528")]
    [InlineData("$51=17408")]
    [InlineData("$52=20480")]
    [InlineData("$53=5000")]
    [InlineData("$60=20480")]
    [InlineData("$61=17408")]
    [InlineData("$62=18432")]
    [InlineData("$63=5000")]
    [InlineData("$80=2")]
    [InlineData("$81=2438.400")]
    [InlineData("$82=1219.400")]
    [InlineData("$83=2978.400")]
    [InlineData("$84=463.000")]
    [InlineData("$85=1.004")]
    [InlineData("$86=1.003")]
    [InlineData("$87=0.000")]
    [InlineData("$88=0.000")]
    [InlineData("$89=0.000")]
    [InlineData("$90=139.100 (rotation radius, mm)")]
    [InlineData("$91=3360.000")]
    [InlineData("$92=12.700")]
    [InlineData("$93=0")]
    [InlineData("$94=1790")]
    public void CanParseMaslowSettings(string line) {
      ControlledMachine machine = TestParser(Translator.SettingParser, line);

      List<FirmwareSetting> changedSettings = machine.Settings.AllSettings.Where(s => s.HasValue).ToList();
      changedSettings.Count.Should().Be(1);
      FirmwareSetting setting = changedSettings.First();
      Log.Information("Machine Setting {@setting}", JsonConvert.SerializeObject(setting, Formatting.Indented));
      setting.Key.Should().NotBeEmpty();
      setting.Title.Should().NotBeEmpty();
      setting.Value.Should().NotBeEmpty();
      line.Should().Contain(setting.ToString());
    }
  }
}
