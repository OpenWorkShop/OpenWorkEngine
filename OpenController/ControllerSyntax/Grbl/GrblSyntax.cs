using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal static class GrblSyntax {
    internal const string MoveCommandTemplate = "${G:=0}${X}${Y}${Z}${A}${B}${C}";

    internal static TData Con<TData>(string str) {
      Type t = typeof(TData);
      return (TData) Convert.ChangeType(str, t);
    }

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


      // https://github.com/gnea/grbl/blob/master/doc/markdown/settings.md
      // https://github.com/makermadecnc/MaslowDue/blob/master/MaslowDue/settings.cpp

      translator.DefineSetting("$0", s => s.Pins.StepPulse);
      translator.DefineSetting("$1", s => s.Pins.StepIdleDelay);
      translator.DefineSetting("$2", s => s.Pins.StepSignalInvert);
      translator.DefineSetting("$3", s => s.Pins.StepDirectionInvert);
      translator.DefineSetting("$4", s => s.Pins.StepEnableInvert);
      translator.DefineSetting("$5", s => s.Pins.LimitPinsInvert);
      translator.DefineSetting("$6", s => s.Pins.ProbePinInvert);

      translator.DefineSetting("$10", s => s.Reporting.StatusReport);
      translator.DefineSetting("$11", s => s.Movement.JunctionDeviation);
      translator.DefineSetting("$12", s => s.Movement.ArcTolerance);
      translator.DefineSetting("$13", s => s.Reporting.ReportInches);
      translator.DefineSetting("$20", s => s.Movement.SoftLimits);
      translator.DefineSetting("$21", s => s.Movement.HardLimits);

      translator.DefineSetting("$22", s => s.Homing.Enabled);
      translator.DefineSetting("$23", s => s.Homing.DirectionInvert);
      translator.DefineSetting("$24", s => s.Homing.FeedRate);
      translator.DefineSetting("$25", s => s.Homing.SeekRate);
      translator.DefineSetting("$26", s => s.Homing.Debounce);
      translator.DefineSetting("$27", s => s.Homing.PullOff);

      translator.DefineSetting("$30", s => s.Applicator.SpeedMax);
      translator.DefineSetting("$31", s => s.Applicator.SpeedMin);
      translator.DefineSetting("$32", s => s.Applicator.LaserEnabled);

      translator.DefineSetting("$100", s => s.Pins.Steps.X);
      translator.DefineSetting("$101", s => s.Pins.Steps.Y);
      translator.DefineSetting("$102", s => s.Pins.Steps.Z);

      translator.DefineSetting("$110", s => s.Movement.RateMax.X);
      translator.DefineSetting("$111", s => s.Movement.RateMax.Y);
      translator.DefineSetting("$112", s => s.Movement.RateMax.Z);

      translator.DefineSetting("$120", s => s.Movement.Acceleration.X);
      translator.DefineSetting("$121", s => s.Movement.Acceleration.Y);
      translator.DefineSetting("$122", s => s.Movement.Acceleration.Z);

      translator.DefineSetting("$130", s => s.Movement.PositionMax.X);
      translator.DefineSetting("$131", s => s.Movement.PositionMax.Y);
      translator.DefineSetting("$132", s => s.Movement.PositionMax.Z);

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
