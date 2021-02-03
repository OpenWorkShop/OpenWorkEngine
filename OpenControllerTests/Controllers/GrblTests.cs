using System;
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using HotChocolate.Language;
using MakerverseServerTests;
using Newtonsoft.Json;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.ControllerSyntax;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Messages;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;
using Xunit;
using Xunit.Abstractions;
using Parser = OpenWorkEngine.OpenController.Controllers.Services.Serial.Parser;

namespace OpenWorkEngine.OpenControllerTests.Controllers {
  public class GrblTests : TestBase {
    private ControllerTranslator? _translator = null;

    internal ControllerTranslator Translator => _translator ??= BuildTranslator();
    // private ControlledMachine? _machine;

    internal virtual ControllerTranslator BuildTranslator() => new ControllerTranslator().UseGrblSyntax();

    public GrblTests(ITestOutputHelper output) : base(output) { }

    internal ControlledMachine TestParser( Parser? parser, string line) {
      if (parser == null) throw new ArgumentException(nameof(parser));
      ControlledMachine machine = new ControlledMachine("", null, Log.Logger);
      MachineOutputLine outputLine = parser.UpdateMachine(new MachineOutputLine(line, machine, Translator)).Result;
      outputLine.WasParsed.Should().BeTrue();
      return machine;
    }

    [Theory]
    [InlineData("[VER:1.1f.20170801:LASER]")]
    [InlineData("[VER:2.0.0.20170522::CTRL0]")]
    public void CanParseGrblVersions(string versionString) {
      ControlledMachine machine = TestParser(Translator.FirmwareParser, versionString);

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
      ControlledMachine machine = TestParser(Translator.ParameterParser, line);

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
      ControlledMachine machine = TestParser(Translator.Fallback, line);
      Log.Information("Machine Status {@status}", JsonConvert.SerializeObject(machine, Formatting.Indented));
      line.Should().Contain(machine.LogEntries.Last().Message);
    }

    [Theory]
    [InlineData("ok")]
    [InlineData("error:9")]
    public void CanParseResponse(string line) {
      ControlledMachine machine = TestParser(Translator.Response, line);
      Log.Information("Machine Status {@status}", JsonConvert.SerializeObject(machine.Status, Formatting.Indented));
    }

    [Theory]
    [InlineData("ALARM: 9")]
    public void CanParseAlarm(string line) {
      ControlledMachine machine = TestParser(Translator.AlarmParser, line);
      Log.Information("Machine Status {@status}", JsonConvert.SerializeObject(machine.Status, Formatting.Indented));
      machine.Status.Alarm.Should().NotBeNull();
    }

    [Theory]
    [InlineData("[OPT:VNM+H,35,255]")]
    public void CanParseOptions(string line) {
      ControlledMachine machine = TestParser(Translator.OptionParser, line);
      Log.Information("Machine Status {@status}", JsonConvert.SerializeObject(machine.Configuration, Formatting.Indented));
      machine.Configuration.Options.Should().NotBeNull();
    }

    [Theory]
    [InlineData(0, false, false, false)]
    [InlineData(1, true, false, false)]
    [InlineData(2, false, true, false)]
    [InlineData(3, true, true, false)]
    [InlineData(4, false, false, true)]
    [InlineData(5, true, false, true)]
    [InlineData(6, false, true, true)]
    [InlineData(7, true, true, true)]
    public void CanConvertAxisFlags(int val, bool x, bool y, bool z) {
      FirmwareSetting<AxisFlags> s = FirmwareSetting.Define(new AxisFlags());
      s.Value = val.ToString();
      AxisFlags flags = s.Data;
      flags.X.Should().Be(x);
      flags.Y.Should().Be(y);
      flags.Z.Should().Be(z);
    }

    [Theory]
    [InlineData("$0", "10")]
    [InlineData("$1", "25")]
    [InlineData("$2", "0")]
    [InlineData("$3", "0")]
    [InlineData("$3", "1")]
    [InlineData("$3", "2")]
    [InlineData("$4", "0")]
    [InlineData("$5", "0")]
    [InlineData("$6", "0")]
    [InlineData("$10", "1")]
    [InlineData("$11", "0.010")]
    [InlineData("$12", "0.002")]
    [InlineData("$13", "0")]
    [InlineData("$20", "1")]
    [InlineData("$21", "1")]
    [InlineData("$22", "1")]
    [InlineData("$23", "0")]
    [InlineData("$24", "250.000")]
    [InlineData("$25", "500.000")]
    [InlineData("$26", "250")]
    [InlineData("$27", "1.000")]
    [InlineData("$30", "24000")]
    [InlineData("$31", "4000")]
    [InlineData("$32", "0")]

    [InlineData("$100", "127.775")]
    [InlineData("$101", "127.775")]
    [InlineData("$102", "918.750")]
    [InlineData("$110", "1000.000")]
    [InlineData("$111", "1000.000")]
    [InlineData("$112", "250.000")]
    [InlineData("$120", "25.000")]
    [InlineData("$121", "25.000")]
    [InlineData("$122", "10.000")]
    [InlineData("$130", "2438.400")]
    [InlineData("$131", "1219.200")]
    [InlineData("$132", "25.000")]
    public void CanParseSettings(string key, string value, string? comment = null) {
      string line = $"{key}={value}";
      if (comment != null) line += $" ({comment})";
      ControlledMachine machine = TestParser(Translator.SettingParser, line);

      List<FirmwareSetting> changedSettings = machine.Settings.Settings.Where(s => s.HasBeenRead).ToList();
      changedSettings.Count.Should().Be(1);
      FirmwareSetting setting = changedSettings.First();
      Log.Information("Machine Setting {@setting}", JsonConvert.SerializeObject(setting, Formatting.Indented));
      setting.Key.Should().NotBeEmpty();
      setting.Title.Should().NotBeEmpty();
      setting.Value.Should().Be(value);
      setting.Key.Should().Be(key);
      line.Should().Contain(setting.ToString());

      IControllerInstruction i = Translator.SettingScript.Instructions[0];
      CompiledInstruction setter = i.Compile(new ControllerExecutionOptions() { Args = setting });
      line.Should().StartWith(setter.Code);
    }
  }
}
