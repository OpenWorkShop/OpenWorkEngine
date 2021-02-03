using System;
using OpenWorkEngine.OpenController.Controllers.Enums;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class MachineAlert : AlertError {
    public MachineAlertType Type { get; }

    // ID or name within the type.
    public string Code { get; } = default!;

    private MachineAlert(string name, string message, MachineAlertType type, string code) : base(name, message) {
      Type = type;
      Code = code;
    }

    // public MachineAlert(Exception e) : base(e) { }

    public static MachineAlert FromException(Exception e) =>
      new(e.GetType().Name, e.Message, MachineAlertType.Exception, e.GetType().FullName ?? e.GetType().Name);

    public static MachineAlert FromAlarm(ControllerAlarmType alarmType, string message) =>
      new(alarmType.ToString(), message, MachineAlertType.Alarm, ((int)alarmType).ToString());

    public static MachineAlert FromError<TError>(TError err, string message) where TError : Enum =>
      new(err.ToString(), message, MachineAlertType.Error, typeof(TError).Name);
  }
}
