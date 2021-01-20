using System;
using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax.GCode;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Parsers {
  public enum GrblError {
    ExpectedCommandLetter = 1,
    BadNumberFormat = 2,
    InvalidStatement = 3,
    NegativeValue = 4,
    HomingSettingDisabled = 5,
    MinimumStepPulseTimeTooSmall = 6,
    EepromFail = 7,
    NotIdle = 8,
    GCodeLock = 9,
    HomingNotEnabled = 10,
    LineOverflow = 11,
    StepRateTooLarge = 12,
    CheckDoor = 13,
    LineLengthExceeded = 14,
    TravelExceeded = 15,
    InvalidJogCommand = 16,
    LaserSettingDisabled = 17,
    UnsupportedCommand = 20,
    ModalGroupViolation = 21,
    UndefinedFeedRate = 22,
    InvalidGCode = 23,
  }

  internal class GrblResponseParser : RegexParser {
    public GrblResponseParser() : base(@"^(?<status>error|ok):?\s*(?<error>.+)?$", OnData) { }

    private static HashSet<MachineTopic>? OnData(
      Controller? controller, ControlledMachine machine, Dictionary<string, string> values
    ) {
      int orig = machine.Status.GetHashCode();

      string status = values["status"];
      string? error = values.ContainsKey("error") ? values["error"] : null;
      if (status.Equals("ok") || error == null) return new HashSet<MachineTopic>() {MachineTopic.Status};

      if (!int.TryParse(error, out int val)) {
        machine.Log.Error("[ERROR] not a number: {error}", error);
        return null;
      }

      if (val >= (int) GrblError.InvalidGCode) {
        machine.Status.Error = GetAlert(GrblError.InvalidGCode, $"#{val}");
      } else {
        machine.Status.Error = GetAlert((GrblError) val, "");
      }

      return BroadcastChange(controller, machine, orig, machine.Status.GetHashCode(), MachineTopic.Status);
    }

    private static MachineAlert GetAlert(GrblError err, string msg = "") =>
      new MachineAlert(err.ToString(), msg, ((int) err).ToString());
  }
}
