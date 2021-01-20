using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Parsers {
  public enum GrblAlarm {
    HardLimit = 1,
    SoftLimit = 2,
    Abort = 3,
    ProbeState = 4,
    ProbeContact = 5,
    HomingFailReset = 6,
    HomingFailDoor = 7,
    HomingFailClearLimitSwitch = 8,
    HomingFailFindLimitSwitch = 9,
  }

  // // https://github.com/grbl/grbl/wiki/Interfacing-with-Grbl#alarms
  internal class GrblAlarmParser : RegexParser {
    public GrblAlarmParser() : base(@"^ALARM:\s*(?<alarm>.+)$", OnData) { }

    private static HashSet<MachineTopic>? OnData(
      Controller? controller, ControlledMachine machine, Dictionary<string, string> values
    ) {
      int orig = machine.Status.GetHashCode();

      Log.Debug("A {@m}", values);

      string alarm = values["alarm"];
      if (!int.TryParse(alarm, out int val)) {
        machine.Log.Error("[ALARM] not a number: {error}", alarm);
        return null;
      }

      GrblAlarm grblAlarm = (GrblAlarm) val;
      machine.Status.Alarm = new MachineAlert(grblAlarm.ToString(), "", ((int) grblAlarm).ToString());

      return BroadcastChange(controller, machine, orig, machine.Status.GetHashCode(), MachineTopic.Status);
    }
  }
}
