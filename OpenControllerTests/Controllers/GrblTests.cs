using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using HotChocolate.Language;
using MakerverseServerTests;
using Newtonsoft.Json;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.ControllerSyntax;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;
using Xunit;
using Xunit.Abstractions;
using Parser = OpenWorkEngine.OpenController.Controllers.Services.Serial.Parser;

namespace OpenWorkEngine.OpenControllerTests.Controllers {
  public class GrblTests : TestBase {
    private readonly ControllerTranslator _parsers = new ControllerTranslator().UseGrblSyntax();
    // private ControlledMachine? _machine;

    public GrblTests(ITestOutputHelper output) : base(output) { }

    internal static ControlledMachine TestParser(Parser? parser, string line) {
      parser.Should().NotBeNull();
      ControlledMachine machine = new ControlledMachine("", null, Log.Logger);
      MachineOutputLine outputLine = parser.UpdateMachine(new MachineOutputLine(line, machine, null)).Result;
      outputLine.WasParsed.Should().BeTrue();
      return machine;
    }

    [Theory]
    [InlineData("[VER:1.1f.20170801:LASER]")]
    [InlineData("[VER:2.0.0.20170522::CTRL0]")]
    public void CanParseGrblVersions(string versionString) {
      ControlledMachine machine = TestParser(_parsers.FirmwareParser, versionString);

      MachineDetectedFirmware fw = machine.Configuration.Firmware;
      fw.Should().NotBeNull();
      fw.Name.Should().Be(MachineControllerType.Grbl.ToString());
      fw.IsValid.Should().BeTrue();
      versionString.Should().Contain(fw.Edition);
      versionString.Should().Contain(fw.Value?.ToString());
    }

    [Theory]
    [InlineData(GrblActiveState.Idle)]
    [InlineData(GrblActiveState.Run)]
    [InlineData(GrblActiveState.Door)]
    [InlineData(GrblActiveState.Alarm)]
    public void CanParseStatusActiveState(GrblActiveState state) {
      string line = $"<{state.ToString()}>";
      ControlledMachine machine = TestParser(new GrblStatusParser(), line);

      machine.Status.ActivityState.Should().Be(state.ToActiveState());
    }

    [Theory]
    [InlineData("<Idle,MPos:5.529,0.560,7.000,WPos:1.529,-5.440,-0.000,Pn:PZ,A:SM>")]
    [InlineData("<Idle,MPos:5.529,0.560,7.000,0.000,WPos:1.529,-5.440,-0.000,0.000>")]
    [InlineData("<Idle,MPos:0.000,0.000,0.000,WPos:0.000,0.000,0.000,Buf:0,RX:0,Lim:001>")]
    [InlineData("<Idle,MPos:0.000,0.000,0.000,WPos:0.000,0.000,0.000,Buf:0,RX:0,Ln:0,F:0.>")]
    [InlineData("<Idle|MPos:3.000,2.000,0.000|FS:0,0>")]
    [InlineData("<Hold:0|MPos:5.000,2.000,0.000|FS:0,0>")]
    [InlineData("<Idle|MPos:5.000,2.000,0.000|FS:0,0|Ov:100,100,100>")]
    [InlineData("<Idle|MPos:5.000,2.000,0.000|FS:500,8000|WCO:0.000,0.000,0.000>")]
    [InlineData("<Run|MPos:23.036,1.620,0.000|FS:500,0>")]
    public void CanParseLocation(string line) {
      Log.Information(line);
      ControlledMachine machine = TestParser(new GrblStatusParser(), line);

      Log.Information("Machine Status {@status}", JsonConvert.SerializeObject(machine.Status, Formatting.Indented));
    }

    [Theory]
    [InlineData("[G38.2 G54 G17 G21 G91 G94 M0 M5 M9 T0 F20. S0.]")]
    [InlineData("[GC:G0 G54 G17 G21 G90 G94 M0 M5 M9 T0 S0.0 F500.0]")]
    public void CanParseConfiguration(string line) {
      ControlledMachine machine = TestParser(new GrblConfigParser(), line);

      Log.Information("Machine Config {@config}", JsonConvert.SerializeObject(machine.Configuration, Formatting.Indented));
    }

    [Theory]
    [InlineData(100f, 200f, true, true)]
    [InlineData(500.0f, 100.0f, true, false)]
    [InlineData(0f, 0f, false, true)]
    public void CanSetSpindleConfig(float? feed, float? speed, bool? mist, bool? flood) {
      List<string> args = new();
      if (feed.HasValue) args.Push($"F{feed.Value}");
      if (speed.HasValue) args.Push($"S{speed.Value}");
      if (mist.HasValue && mist.Value) args.Push("M07");
      if (flood.HasValue && flood.Value) args.Push("M08");
      string line = $"[{string.Join(' ', args)}]";

      ControlledMachine machine = TestParser(new GrblConfigParser(), line);

      Log.Information("Machine Spindle {@config}",
        JsonConvert.SerializeObject(machine.Configuration.Applicator, Formatting.Indented));

      ApplicatorState sp = machine.Configuration.Applicator;
      sp.FeedRate.Should().Be((decimal) (feed ?? 0));
      sp.SpinSpeed.Should().Be((decimal) (speed ?? 0));
      sp.IsMistCoolantEnabled.Should().Be(mist ?? false);
      sp.IsFloodCoolantEnabled.Should().Be(flood ?? false);
    }

    [Theory]
    [InlineData("[PRB:0.000,0.000,1.492:1]")]
    [InlineData("[TLO:0.000,1.000,0,000]")]
    [InlineData("[G54:4.000,0.000,-2.000]")]
    public void CanParseParameters(string line) {
      ControlledMachine machine = TestParser(_parsers.ParameterParser, line);

      Log.Information("Machine Config {@config}", JsonConvert.SerializeObject(machine.Configuration, Formatting.Indented));
    }

    [Theory]
    [InlineData("[MSG:Caution: Unlocked]")]
    [InlineData("[MSG:Reset to continue]")]
    [InlineData("[MSG:'$H'|'$X' to unlock]")]
    [InlineData("[MSG:Enabled]")]
    [InlineData("[MSG:Disabled]")]
    [InlineData("[echo:hello]")]
    public void CanParseMessage(string line) {
      ControlledMachine machine = TestParser(_parsers.Fallback, line);
      Log.Information("Machine Status {@status}", JsonConvert.SerializeObject(machine, Formatting.Indented));
      line.Should().Contain(machine.LogEntries.Last().Message);
    }

    [Theory]
    [InlineData("ok")]
    [InlineData("error:9")]
    public void CanParseResponse(string line) {
      ControlledMachine machine = TestParser(_parsers.Response, line);
      Log.Information("Machine Status {@status}", JsonConvert.SerializeObject(machine.Status, Formatting.Indented));
    }

    [Theory]
    [InlineData("ALARM: 9")]
    public void CanParseAlarm(string line) {
      ControlledMachine machine = TestParser(_parsers.AlarmParser, line);
      Log.Information("Machine Status {@status}", JsonConvert.SerializeObject(machine.Status, Formatting.Indented));
      machine.Status.Alarm.Should().NotBeNull();
    }

    [Theory]
    [InlineData("[OPT:VNM+H,35,255]")]
    public void CanParseOptions(string line) {
      ControlledMachine machine = TestParser(_parsers.OptionParser, line);
      Log.Information("Machine Status {@status}", JsonConvert.SerializeObject(machine.Configuration, Formatting.Indented));
      machine.Configuration.Options.Should().NotBeNull();
    }

    [Theory]
    [InlineData("$0=10")]
    [InlineData("$1=25")]
    [InlineData("$110=635.00")]
    [InlineData("$90=139.100 (rotation radius, mm)")]
    public void CanParseSettings(string line) {
      ControlledMachine machine = TestParser(_parsers.SettingParser, line);
      Log.Information("Machine Settings {@status}", JsonConvert.SerializeObject(machine.Settings, Formatting.Indented));
      machine.Settings.Should().NotBeNull();
    }
  }
}
