using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal static class GrblSyntax {
    internal const string MoveCommandTemplate = "${G:=0}${X}${Y}${Z}${A}${B}${C}";

    internal static ControllerTranslator UseGrblSyntax(this ControllerTranslator translator) {
      translator.SetCommandScript(nameof(Controller.GetSettings), "$$");
      translator.SetCommandScript(nameof(Controller.Unlock), "$X");           // kill alarm
      translator.SetCommandScript(nameof(Controller.GetFirmware), "$I");      // build info
      translator.SetCommandScript(nameof(Controller.GetParameters), "$#");    //
      translator.SetCommandScript(nameof(Controller.GetConfiguration), "$G"); // Parser state
      translator.SetCommandScript(nameof(Controller.CheckCode), "$C");        // GCode mode
      translator.SetCommandScript(nameof(Controller.GetStartup), "$N");       // Startup blocks
      translator.SetCommandScript(nameof(Controller.Homing), "$H");
      translator.SetCommandScript(nameof(Controller.GetStatus), "?");
      translator.SetCommandScript(nameof(Controller.Pause), "!");
      translator.SetCommandScript(nameof(Controller.Play), "~");
      translator.SetCommandScript(nameof(Controller.Reset), "\u0018");        // ctrl+x
      translator.SetCommandScript(nameof(Controller.Move), MoveCommandTemplate);

      List<SettingDefinition> s = new List<SettingDefinition>() {
        new("0", MachineSettingType.StepPulse, MachineSettingUnits.Microseconds),
        new("1", MachineSettingType.StepIdleDelay, MachineSettingUnits.Milliseconds),
        new("2", MachineSettingType.StepPortInvert, MachineSettingUnits.Mask),
        new("3", MachineSettingType.DirectionPortInvert, MachineSettingUnits.Mask),
        new("4", MachineSettingType.StepEnableInvert, MachineSettingUnits.Boolean),
        new("5", MachineSettingType.LimitPinsInvert, MachineSettingUnits.Boolean),
        new("6", MachineSettingType.ProbePinInvert, MachineSettingUnits.Boolean),
        new("10", MachineSettingType.StatusReport, MachineSettingUnits.Mask),
        new("11", MachineSettingType.JunctionDeviation, MachineSettingUnits.Millimeters),
        new("12", MachineSettingType.ArcTolerance, MachineSettingUnits.Millimeters),
        new("13", MachineSettingType.ReportInches, MachineSettingUnits.Boolean),
        new("20", MachineSettingType.SoftLimits, MachineSettingUnits.Boolean),
        new("21", MachineSettingType.HardLimits, MachineSettingUnits.Boolean),
        new("22", MachineSettingType.HomingCycle, MachineSettingUnits.Boolean),
        new("23", MachineSettingType.HomingDirectionInvert, MachineSettingUnits.Boolean),
        new("24", MachineSettingType.HomingFeed, MachineSettingUnits.MillimetersPerMinute),
        new("25", MachineSettingType.HomingSeek, MachineSettingUnits.MillimetersPerMinute),
        new("26", MachineSettingType.HomingDebounce, MachineSettingUnits.Milliseconds),
        new("27", MachineSettingType.HomingPullOff, MachineSettingUnits.Millimeters),
        new("30", MachineSettingType.MaxSpindleSpeed, MachineSettingUnits.Rpm),
        new("31", MachineSettingType.MinSpindleSpeed, MachineSettingUnits.Rpm),
        new("32", MachineSettingType.LaserMode, MachineSettingUnits.Boolean),
        new("100", MachineSettingType.StepsX, MachineSettingUnits.StepsPerMillimeter),
        new("101", MachineSettingType.StepsY, MachineSettingUnits.StepsPerMillimeter),
        new("102", MachineSettingType.StepsZ, MachineSettingUnits.StepsPerMillimeter),
        new("110", MachineSettingType.RateMaxX, MachineSettingUnits.MillimetersPerMinute),
        new("111", MachineSettingType.RateMaxY, MachineSettingUnits.MillimetersPerMinute),
        new("112", MachineSettingType.RateMaxZ, MachineSettingUnits.MillimetersPerMinute),
        new("120", MachineSettingType.AccelerationX, MachineSettingUnits.MillimetersPerSecondsSquared),
        new("121", MachineSettingType.AccelerationY, MachineSettingUnits.MillimetersPerSecondsSquared),
        new("122", MachineSettingType.AccelerationZ, MachineSettingUnits.MillimetersPerSecondsSquared),
        new("130", MachineSettingType.TravelMaxX, MachineSettingUnits.Millimeters),
        new("131", MachineSettingType.TravelMaxY, MachineSettingUnits.Millimeters),
        new("132", MachineSettingType.TravelMaxZ, MachineSettingUnits.Millimeters),
      };
      translator.SettingDefinitions.AddRange(s);

      translator.StatusPoll = new SerialPoll(nameof(Controller.GetStatus), new GrblStatusParser());
      translator.ConfigPoll = new SerialPoll(nameof(Controller.GetConfiguration), new GrblConfigParser(), 10000, 10000);

      translator.Response = new GrblResponseParser();
      translator.Fallback = new FallbackParser();

      translator.FirmwareParser = new GrblVersionParser();
      translator.ParameterParser = new GrblParameterParser();
      translator.SettingParser = new GrblSettingsParser();
      translator.WelcomeParser = new GrblWelcomeParser();
      translator.AlarmParser = new GrblAlarmParser();
      translator.OptionParser = new GrblOptionParser();
      translator.HelpParser = new GrblHelpParser();

      return translator;
    }
  }
}
