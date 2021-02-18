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
using OpenWorkEngine.OpenController.Machines.Models;

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

      translator.AddModalOptions(m => m.Configuration.Modals.Motion, new Dictionary<string, MachineMotionType>() {
        ["G0"] = MachineMotionType.Rapid,
        ["G1"] = MachineMotionType.Linear,
        ["G2"] = MachineMotionType.Arc,
        ["G3"] = MachineMotionType.ArcCCW,
        ["G4"] = MachineMotionType.Dwell,
        ["G38.2"] = MachineMotionType.Probe,
        ["G38.3"] = MachineMotionType.Probe,
        ["G38.4"] = MachineMotionType.Probe,
        ["G38.5"] = MachineMotionType.Probe,
        ["G80"] = MachineMotionType.Cancel,
      });
      translator.AddModalOptions(m => m.Configuration.Modals.CylindricalInterpolation, new Dictionary<string, EnabledType>() {
        ["G7"] = EnabledType.Enabled,
        ["G8"] = EnabledType.Disabled,
      });
      translator.AddModalOptions(m => m.Configuration.Modals.Plane, new Dictionary<string, AxisPlane>() {
        ["G17"] = AxisPlane.Xy,
        ["G18"] = AxisPlane.Xz,
        ["G19"] = AxisPlane.Yz,
      });
      translator.AddModalOptions(m => m.Configuration.Modals.Units, new Dictionary<string, UnitType>() {
        ["G20"] = UnitType.Imperial,
        ["G21"] = UnitType.Metric,
      });
      translator.AddModalOptions(m => m.Status.Applicator.RadiusCompensation, new Dictionary<string, ApplicatorRadiusCompensation>() {
        ["G40"] = ApplicatorRadiusCompensation.None,
        ["G41"] = ApplicatorRadiusCompensation.Left,
        ["G41.1"] = ApplicatorRadiusCompensation.DynamicLeft,
        ["G42"] = ApplicatorRadiusCompensation.Right,
        ["G42.1"] = ApplicatorRadiusCompensation.DynamicRight,
      });
      translator.AddModalOptions(m => m.Status.Applicator.LengthOffsetFactorType, new Dictionary<string, FactorType>() {
        ["G43"] = FactorType.Positive,
        ["G43.1"] = FactorType.Positive,
        ["G44"] = FactorType.Negative,
        ["G44.1"] = FactorType.Negative,
        ["G49"] = FactorType.None,
      });
      translator.AddModalOptions(m => m.Configuration.Modals.WorkCoordinateSystem, new Dictionary<string, decimal>() {
        ["G54"] = 1,
        ["G55"] = 2,
        ["G56"] = 3,
        ["G57"] = 4,
        ["G58"] = 5,
      });
      translator.AddModalOptions(m => m.Configuration.Modals.PathControlMode, new Dictionary<string, PathControlMode>() {
        ["G64"] = PathControlMode.Blended,
        ["G61"] = PathControlMode.Exact, // G65?
        ["G61.1"] = PathControlMode.Exact,
      });
      translator.AddModalOptions(m => m.Configuration.Modals.Distance, new Dictionary<string, MovementDistanceType>() {
        ["G90"] = MovementDistanceType.Absolute,
        ["G90.1"] = MovementDistanceType.Absolute,
        ["G91"] = MovementDistanceType.Relative,
        ["G91.1"] = MovementDistanceType.Relative,
      });
      translator.AddModalOptions(m => m.Configuration.Modals.FeedRate, new Dictionary<string, FeedRateMode>() {
        ["G93"] = FeedRateMode.InverseTime,
        ["G94"] = FeedRateMode.UnitsPerMinute,
        ["G95"] = FeedRateMode.UnitsPerRevolution,
      });
      translator.AddModalOptions(m => m.Configuration.Modals.SpindleSpeed, new Dictionary<string, SpindleSpeedMode>() {
        ["G96"] = SpindleSpeedMode.ConstantSurfaceSpeed,
        ["G97"] = SpindleSpeedMode.ConstantSpindleSpeed,
      });
      translator.AddModalOptions(m => m.Configuration.Modals.CannedCycleReturnMode, new Dictionary<string, TimingMode>() {
        ["G98"] = TimingMode.PerMinute,
        ["G99"] = TimingMode.PerRevolution,
      });

      // http://linuxcnc.org/docs/html/gcode/m-code.html
      translator.AddModalOptions(m => m.Configuration.Modals.ProgramState, new Dictionary<string, MachineProgramState>() {
        ["M0"] = MachineProgramState.CompulsoryStop,
        ["M1"] = MachineProgramState.OptionalStop,
        ["M2"] = MachineProgramState.EndOfProgram,
        ["M6"] = MachineProgramState.ManualChange,
        ["M30"] = MachineProgramState.EndOfProgram,
        ["M60"] = MachineProgramState.AutomaticChange,
      });
      translator.AddModalOptions(m => m.Status.Applicator.SpinDirection, new Dictionary<string, ApplicatorSpinDirection>() {
        ["M3"] = ApplicatorSpinDirection.CW,
        ["M4"] = ApplicatorSpinDirection.CCW,
        ["M5"] = ApplicatorSpinDirection.None,
      });
      // M6 == ATC ?!?!
      translator.AddModalOptions(m => m.Status.Applicator.Coolant, new Dictionary<string, MachineCoolantState>() {
        ["M7"] = MachineCoolantState.Mist,
        ["M8"] = MachineCoolantState.Flood,
        ["M9"] = MachineCoolantState.None,
      });
      translator.AddModalOptions(m => m.Status.Overrides.Mode, new Dictionary<string, MachineOverridesMode>() {
        ["M48"] = MachineOverridesMode.All,
        ["M49"] = MachineOverridesMode.None,
        ["M50"] = MachineOverridesMode.Feeds,
        ["M51"] = MachineOverridesMode.Speeds,
      });

      Dictionary<string, decimal> userDef = new Dictionary<string, decimal>();
      for (int x = 0; x < 100; x++) {
        userDef[$"M{x + 100}"] = x;
      }
      translator.AddModalOptions(m => m.Configuration.Modals.UserDefined, userDef);

      // https://github.com/gnea/grbl/blob/master/doc/markdown/settings.md
      // https://github.com/makermadecnc/MaslowDue/blob/master/MaslowDue/settings.cpp

      translator.DefineSetting("T", m => m.Status.Applicator.ToolId);
      translator.DefineSetting("S", m => m.Status.Applicator.SpinSpeed);
      translator.DefineSetting("F", m => m.Status.Applicator.FeedRate);

      translator.DefineSetting("$0", s => s.Settings.Pins.StepPulse);
      translator.DefineSetting("$1", s => s.Settings.Pins.StepIdleDelay);
      translator.DefineSetting("$2", s => s.Settings.Pins.StepSignalInvert);
      translator.DefineSetting("$3", s => s.Settings.Pins.StepDirectionInvert);
      translator.DefineSetting("$4", s => s.Settings.Pins.StepEnableInvert);
      translator.DefineSetting("$5", s => s.Settings.Pins.LimitPinsInvert);
      translator.DefineSetting("$6", s => s.Settings.Pins.ProbePinInvert);

      translator.DefineSetting("$10", s => s.Settings.Reporting.StatusReport);
      translator.DefineSetting("$11", s => s.Settings.Movement.JunctionDeviation);
      translator.DefineSetting("$12", s => s.Settings.Movement.ArcTolerance);
      translator.DefineSetting("$13", s => s.Settings.Reporting.ReportInches);
      translator.DefineSetting("$20", s => s.Settings.Movement.SoftLimits);
      translator.DefineSetting("$21", s => s.Settings.Movement.HardLimits);

      translator.DefineSetting("$22", s => s.Settings.Homing.Enabled);
      translator.DefineSetting("$23", s => s.Settings.Homing.DirectionInvert);
      translator.DefineSetting("$24", s => s.Settings.Homing.FeedRate);
      translator.DefineSetting("$25", s => s.Settings.Homing.SeekRate);
      translator.DefineSetting("$26", s => s.Settings.Homing.Debounce);
      translator.DefineSetting("$27", s => s.Settings.Homing.PullOff);

      translator.DefineSetting("$30", s => s.Settings.Applicator.SpeedMax);
      translator.DefineSetting("$31", s => s.Settings.Applicator.SpeedMin);
      translator.DefineSetting("$32", s => s.Settings.Applicator.LaserEnabled);

      translator.DefineSetting("$100", s => s.Settings.Pins.Steps.X);
      translator.DefineSetting("$101", s => s.Settings.Pins.Steps.Y);
      translator.DefineSetting("$102", s => s.Settings.Pins.Steps.Z);

      translator.DefineSetting("$110", s => s.Settings.Movement.RateMax.X);
      translator.DefineSetting("$111", s => s.Settings.Movement.RateMax.Y);
      translator.DefineSetting("$112", s => s.Settings.Movement.RateMax.Z);

      translator.DefineSetting("$120", s => s.Settings.Movement.Acceleration.X);
      translator.DefineSetting("$121", s => s.Settings.Movement.Acceleration.Y);
      translator.DefineSetting("$122", s => s.Settings.Movement.Acceleration.Z);

      translator.DefineSetting("$130", s => s.Settings.Movement.PositionMax.X);
      translator.DefineSetting("$131", s => s.Settings.Movement.PositionMax.Y);
      translator.DefineSetting("$132", s => s.Settings.Movement.PositionMax.Z);

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
