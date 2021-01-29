using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  public enum GrblError {
    Unknown = 0,
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
    public GrblResponseParser() : base(@"^(?<status>error|ok):?\s*(?<error>.+)?$") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      string status = values["status"];
      string? error = values.ContainsKey("error") ? values["error"] : null;
      MachineLogEntry? logEntry = null;

      // An OK or non-null status indicates a successful response, which broadcasts the (spammy) "ACK" message.
      if (status.Equals("ok") || error == null) {
        logEntry = MachineLogEntry.FromReadAck(status);
      } else if (!int.TryParse(error, out int val)) {
        logEntry = GetAlertEntry(GrblError.Unknown, error);
      } else if (val >= (int) GrblError.InvalidGCode) {
        logEntry = GetAlertEntry(GrblError.InvalidGCode);
      } else {
        logEntry = GetAlertEntry((GrblError) val);
      }

      return line.WithLogEntry(logEntry);
    }

    internal static MachineLogEntry GetAlertEntry(GrblError err, string msg = "") =>
      MachineLogEntry.FromReadError(string.IsNullOrWhiteSpace(msg) ? err.ToString() : msg,
        new MachineAlert(err.ToString(), msg, ((int) err).ToString()));
  }
}
