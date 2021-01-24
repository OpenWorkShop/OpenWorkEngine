using System;
using System.Globalization;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Syntax.GCode.Extensions {
  public static class MachineGCodeExtensions {

    // Generic
    public static bool SetGCodeConfigurationWord(this ControlledMachine machine, string wordStr) =>
      machine.SetGCodeConfigurationWord(new GCodeWord(wordStr));

    public static bool SetGCodeConfigurationWord(this ControlledMachine machine, GCodeWord word) {
      if (word.Letter == GCodeLetter.F) {
        machine.Configuration.Applicator.FeedRate = word.Value;
      } else if (word.Letter == GCodeLetter.G) {
        return machine.ApplyGCodeConfigurationValue(word);
      } else if (word.Letter == GCodeLetter.M) {
        return machine.ApplyMCodeConfigurationValue(word);
      } else if (word.Letter == GCodeLetter.S) {
        machine.Configuration.Applicator.SpinSpeed = word.Value;
      } else if (word.Letter == GCodeLetter.T) {
        machine.Configuration.Applicator.ToolId = word.Value.ToString(CultureInfo.InvariantCulture);
      } else {
        machine.Log.Error($"Invalid GCode '{word.Letter}' from word: {word.Raw}");
        return false;
      }
      return true;
    }

    // GCode modal groups / config
    public static bool ApplyGCodeConfigurationValue(this ControlledMachine machine, GCodeWord word) {
      decimal v = word.Value;
      MachineModals modals = machine.Configuration.Modals;
      if (v == 0) {
        modals.Motion = new (MachineMotionType.Rapid, word.Raw);
      } else if (v == 1) {
        modals.Motion = new (MachineMotionType.Linear, word.Raw);
      } else if (v == 2) {
        modals.Motion = new (MachineMotionType.Arc, word.Raw);
      } else if (v == 3) {
        modals.Motion = new (MachineMotionType.ArcCCW, word.Raw);
      } else if (v == 4) {
        modals.Motion = new (MachineMotionType.Dwell, word.Raw);
      } else if (v == 17) {
        modals.Plane = new (AxisPlane.Xy, word.Raw);
      } else if (v == 18) {
        modals.Plane = new (AxisPlane.Xz, word.Raw);
      } else if (v == 19) {
        modals.Plane = new (AxisPlane.Yz, word.Raw);
      } else if (v == 20) {
        modals.Units = new (UnitType.Imperial, word.Raw);
      } else if (v == 21) {
        modals.Units = new (UnitType.Metric, word.Raw);
      } else if (v == 38.2M || v == 38.3M || v == 38.4M || v == 38.5M) {
        modals.Motion = new (MachineMotionType.Probe, word.Raw);
      } else if (v >= 54 && v <= 59) {
        modals.WorkCoordinateSystem = (int) Math.Floor(v) - 54;
      } else if (v == 80) {
        modals.Motion = new (MachineMotionType.Cancel, word.Raw);
      } else if (v == 90) {
        modals.Distance = new (MovementDistanceType.Absolute, word.Raw);
      } else if (v == 90.1M) {
        modals.ArcDistance = new (MovementDistanceType.Absolute, word.Raw);
      } else if (v == 91) {
        modals.Distance = new (MovementDistanceType.Relative, word.Raw);
      } else if (v == 91.1M) {
        modals.ArcDistance = new (MovementDistanceType.Relative, word.Raw);
      } else if (v == 93) {
        modals.FeedRate = new (FeedRateMode.InverseTime, word.Raw);
      } else if (v == 94) {
        modals.FeedRate = new (FeedRateMode.UnitsPerMinute, word.Raw);
      } else if (v == 95) {
        modals.FeedRate = new (FeedRateMode.UnitsPerRevolution, word.Raw);
      } else {
        machine.Log.Error("Unhandled GCode: G{code}", v);
        return false;
      }
      return true;
    }

    // GCode modal groups / config
    public static bool ApplyMCodeConfigurationValue(this ControlledMachine machine, GCodeWord word) {
      MachineModals modals = machine.Configuration.Modals;
      decimal v = word.Value;
      if (v == 0) {
        modals.ProgramState = new(MachineProgramState.CompulsoryStop, word.Raw);
      } else if (v == 1) {
        modals.ProgramState = new (MachineProgramState.OptionalStop, word.Raw);
      } else if (v == 2 || v == 30) {
        modals.ProgramState = new (MachineProgramState.EndOfProgram, word.Raw);
      } else if (v == 3) {
        modals.SpindleDirection = new (SpinDirection.CW, word.Raw);
      } else if (v == 4) {
        modals.SpindleDirection = new (SpinDirection.CCW, word.Raw);
      } else if (v == 5) {
        modals.SpindleDirection = new (SpinDirection.None, word.Raw);
      } else if (v == 6) {
        machine.Log.Error("ATC (Automatic Tool Change) state?");
      } else if (v == 7) {
        machine.Configuration.Applicator.IsMistCoolantEnabled = true;
      } else if (v == 8) {
        machine.Configuration.Applicator.IsFloodCoolantEnabled = true;
      } else if (v == 9) {
        machine.Configuration.Applicator.IsMistCoolantEnabled = false;
        machine.Configuration.Applicator.IsFloodCoolantEnabled = true;
      } else if (v == 60) {
        modals.ProgramState = new (MachineProgramState.AutomaticChange, word.Raw);
      } else {
        machine.Log.Error("Unhandled MCode: M{code}", v);
      }

      return true;
    }
  }
}
