using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Enums;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  // // https://github.com/grbl/grbl/wiki/Interfacing-with-Grbl#alarms
  internal class GrblAlarmParser : RegexParser {
    public GrblAlarmParser() : base(@"^ALARM:\s*(?<alarm>.+)$") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      int orig = line.Machine.Status.GetHashCode();

      string alarm = values["alarm"];
      ControllerAlarmType controllerAlarmType = ControllerAlarmType.Unknown;
      string msg;
      if (int.TryParse(alarm, out int val)) {
        controllerAlarmType = AlarmCodeToType(val);
        msg = AlarmCodeToSubType(val);
      } else {
        line.Log.Warning("[ALARM] non-numeric: {text}", alarm);
        msg = alarm;
      }

      line.Machine.Status.Alarm = MachineAlert.FromAlarm(controllerAlarmType, msg);

      return CheckChange(line, orig, line.Machine.Status.GetHashCode(), MachineTopic.Status);
    }

    public static ControllerAlarmType AlarmCodeToType(int val) {
      if (val == 1 || val == 2) return ControllerAlarmType.Limit;
      if (val == 3) return ControllerAlarmType.Abort;
      if (val == 4 || val == 5) return ControllerAlarmType.Probe;
      if (val >= 6 && val <= 9) return ControllerAlarmType.Homing;

      return ControllerAlarmType.Unknown;
    }

    public static string AlarmCodeToSubType(int val) {
      if (val == 1) return "Hard";
      if (val == 2) return "Soft";
      if (val == 4) return "State";
      if (val == 5) return "Contact";
      if (val == 6) return "Reset";
      if (val == 7) return "Door";
      if (val == 8) return "ClearLimitSwitch";
      if (val == 9) return "FindLimitSwitch";
      return "";
    }
  }
}
