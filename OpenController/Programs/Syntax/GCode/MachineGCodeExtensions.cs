using System;
using System.Globalization;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Programs.Enums;

namespace OpenWorkEngine.OpenController.Programs.Syntax.GCode {
  public static class MachineGCodeExtensions {
    // Generic
    public static bool ApplyGCodeConfigurationWord(this ControlledMachine machine, string wordStr) {
      GCodeWord word = new(wordStr);

      if (word.Letter == GCodeLetter.F) {
        machine.Configuration.Spindle.FeedRate = word.Value;
      } else if (word.Letter == GCodeLetter.G) {
        return machine.ApplyGCodeConfigurationValue(word.Value);
      } else if (word.Letter == GCodeLetter.M) {
        return machine.ApplyMCodeConfigurationValue(word.Value);
      } else if (word.Letter == GCodeLetter.S) {
        machine.Configuration.Spindle.SpinSpeed = word.Value;
      } else if (word.Letter == GCodeLetter.T) {
        machine.Configuration.Spindle.Tool = word.Value.ToString(CultureInfo.InvariantCulture);
      } else {
        machine.Log.Error($"Invalid GCode '{word.Letter}' from word: {wordStr}");
        return false;
      }
      return true;
    }

    // GCode modal groups / config
    public static bool ApplyGCodeConfigurationValue(this ControlledMachine machine, decimal v) {
      MachineModals modals = machine.Configuration.Modals;
      if (v == 0) {
        modals.Motion = MachineMotionType.Rapid;
      } else if (v == 1) {
        modals.Motion = MachineMotionType.Linear;
      } else if (v == 2) {
        modals.Motion = MachineMotionType.Arc;
      } else if (v == 3) {
        modals.Motion = MachineMotionType.ArcCCW;
      } else if (v == 4) {
        modals.Motion = MachineMotionType.Dwell;
      } else if (v == 17) {
        modals.Plane = AxisPlane.XY;
      } else if (v == 18) {
        modals.Plane = AxisPlane.XZ;
      } else if (v == 19) {
        modals.Plane = AxisPlane.YZ;
      } else if (v == 20) {
        modals.Units = UnitType.Imperial;
      } else if (v == 21) {
        modals.Units = UnitType.Metric;
      } else if (v == 38.2M || v == 38.3M || v == 38.4M || v == 38.5M) {
        modals.Motion = MachineMotionType.Probe;
      } else if (v >= 54 && v <= 59) {
        modals.WorkCoordinateSystem = (int) Math.Floor(v) - 54;
      } else if (v == 80) {
        modals.Motion = MachineMotionType.Cancel;
      } else if (v == 90) {
        modals.Distance = MovementDistanceType.Absolute;
      } else if (v == 90.1M) {
        modals.ArcDistance = MovementDistanceType.Absolute;
      } else if (v == 91) {
        modals.Distance = MovementDistanceType.Relative;
      } else if (v == 91.1M) {
        modals.ArcDistance = MovementDistanceType.Relative;
      } else if (v == 93) {
        modals.FeedRate = FeedRateMode.InverseTime;
      } else if (v == 94) {
        modals.FeedRate = FeedRateMode.UnitsPerMinute;
      } else if (v == 95) {
        modals.FeedRate = FeedRateMode.UnitsPerRevolution;
      } else {
        machine.Log.Error("Unhandled GCode: G{code}", v);
        return false;
      }
      return true;
    }

    // GCode modal groups / config
    public static bool ApplyMCodeConfigurationValue(this ControlledMachine machine, decimal v) {
      MachineModals modals = machine.Configuration.Modals;
      if (v == 0) {
        modals.ProgramState = MachineProgramState.CompulsoryStop;
      } else if (v == 1) {
        modals.ProgramState = MachineProgramState.OptionalStop;
      } else if (v == 2 || v == 30) {
        modals.ProgramState = MachineProgramState.EndOfProgram;
      } else if (v == 3) {
        modals.SpindleDirection = SpinDirection.CW;
      } else if (v == 4) {
        modals.SpindleDirection = SpinDirection.CCW;
      } else if (v == 5) {
        modals.SpindleDirection = SpinDirection.None;
      } else if (v == 6) {
        machine.Log.Error("ATC (Automatic Tool Change) state?");
      } else if (v == 7) {
        machine.Configuration.Spindle.IsMistCoolantEnabled = true;
      } else if (v == 8) {
        machine.Configuration.Spindle.IsFloodCoolantEnabled = true;
      } else if (v == 9) {
        machine.Configuration.Spindle.IsMistCoolantEnabled = false;
        machine.Configuration.Spindle.IsFloodCoolantEnabled = true;
      } else if (v == 60) {
        modals.ProgramState = MachineProgramState.AutomaticChange;
      } else {
        machine.Log.Error("Unhandled MCode: M{code}", v);
      }

      return true;
    }
  }
}
