using System.Collections.Generic;
using FluentAssertions;
using HotChocolate.Language;
using MakerverseServerTests;
using Newtonsoft.Json;
using OpenWorkEngine.OpenController.Controllers.Grbl;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;
using Xunit;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests.Controllers {
  public class GrblTests : TestBase {
    private readonly ParserSet _parsers = new ParserSet().AddGrblParsers();
    // private ControlledMachine? _machine;

    public GrblTests(ITestOutputHelper output) : base(output) { }

    [Theory]
    [InlineData("[VER:1.1f.20170801:LASER]")]
    [InlineData("[VER:2.0.0.20170522::CTRL0]")]
    public void CanParseGrblVersions(string versionString) {
      ControlledMachine machine = new ControlledMachine("", null, Log.Logger);
      _parsers.FirmwareParser?.UpdateMachine(null, machine, versionString);

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
      GrblStatusParser parser = new();
      ControlledMachine machine = new ControlledMachine("", null, Log.Logger);
      parser.UpdateMachine(null, machine, line);

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
      GrblStatusParser parser = new();
      Log.Information(line);
      ControlledMachine machine = new ControlledMachine("", null, Log.Logger);
      parser.UpdateMachine(null, machine, line);

      Log.Information("Machine Status {@status}", JsonConvert.SerializeObject(machine.Status, Formatting.Indented));
    }

    [Theory]
    [InlineData("[G38.2 G54 G17 G21 G91 G94 M0 M5 M9 T0 F20. S0.]")]
    [InlineData("[GC:G0 G54 G17 G21 G90 G94 M0 M5 M9 T0 S0.0 F500.0]")]
    public void CanParseConfiguration(string line) {
      GrblConfigParser parser = new();
      ControlledMachine machine = new ControlledMachine("", null, Log.Logger);
      parser.UpdateMachine(null, machine, line);

      Log.Information("Machine Config {@config}", JsonConvert.SerializeObject(machine.Configuration, Formatting.Indented));
    }

    [Theory]
    [InlineData(null, null, null, null)]
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

      GrblConfigParser parser = new();
      ControlledMachine machine = new ControlledMachine("", null, Log.Logger);
      parser.UpdateMachine(null, machine, line);

      Log.Information("Machine Spindle {@config}",
        JsonConvert.SerializeObject(machine.Configuration.Applicator, Formatting.Indented));

      ApplicatorState sp = machine.Configuration.Applicator;
      sp.FeedRate.Should().Be((decimal) (feed ?? 0));
      sp.SpinSpeed.Should().Be((decimal) (speed ?? 0));
      sp.IsMistCoolantEnabled.Should().Be(mist ?? false);
      sp.IsFloodCoolantEnabled.Should().Be(flood ?? false);
    }
  }
}
