using System;
using System.Globalization;
using HotChocolate;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Messages;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Syntax.GCode.Extensions {
  public static class MachineGCodeExtensions {

    // Generic
    public static bool SetGCodeConfigurationWord(this ControlledMachine machine, string wordStr) =>
      machine.SetGCodeConfigurationWord(new GCodeWord(wordStr));

    public static bool SetGCodeConfigurationWord(this ControlledMachine machine, GCodeWord word) {
      if (word.Letter == GCodeLetter.F) {
        machine.Status.Applicator.FeedRate = word.Value;
      } else if (word.Letter == GCodeLetter.G) {
        return machine.ApplyGCodeConfigurationValue(word);
      } else if (word.Letter == GCodeLetter.M) {
        return machine.ApplyMCodeConfigurationValue(word);
      } else if (word.Letter == GCodeLetter.S) {
        machine.Status.Applicator.SpinSpeed = word.Value;
      } else if (word.Letter == GCodeLetter.T) {
        machine.Status.Applicator.ToolId = word.Value.ToString(CultureInfo.InvariantCulture);
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
      } else if (v == 7) {
        modals.CylindricalInterpolation = new (EnabledType.Enabled, word.Raw);
      } else if (v == 8) {
        modals.CylindricalInterpolation = new (EnabledType.Disabled, word.Raw);
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
      } else if (v == 40) {
        machine.Status.Applicator.RadiusCompensation = RadiusCompensation.None;
      } else if (v == 41) {
        machine.Status.Applicator.RadiusCompensation = RadiusCompensation.Left;
      } else if (v == 41.1M) {
        machine.Status.Applicator.RadiusCompensation = RadiusCompensation.DynamicLeft;
      } else if (v == 42) {
        machine.Status.Applicator.RadiusCompensation = RadiusCompensation.Right;
      } else if (v == 42.1M) {
        machine.Status.Applicator.RadiusCompensation = RadiusCompensation.DynamicRight;
      } else if (v == 43 || v == 43.1M) {
        machine.Status.Applicator.LengthOffsetFactorType = FactorType.Positive;
      } else if (v == 44 || v == 44.1M) {
        machine.Status.Applicator.LengthOffsetFactorType = FactorType.Negative;
      } else if (v == 49) {
        machine.Status.Applicator.LengthOffsetFactorType = FactorType.None;
      } else if (v >= 54 && v <= 59) {
        modals.WorkCoordinateSystemCurrent = (int) Math.Floor(v) - 54;
      } else if (v == 64) {
        modals.PathControlMode = new MachineModalState<PathControlMode>(PathControlMode.Blended, word.Raw);
      } else if (v == 61 || v == 61.1M) { // ????
        modals.PathControlMode = new MachineModalState<PathControlMode>(PathControlMode.Exact, word.Raw);
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
      } else if (v == 96) {
        modals.SpindleSpeed = new (SpindleSpeedMode.ConstantSurfaceSpeed, word.Raw);
      } else if (v == 97) {
        modals.SpindleSpeed = new (SpindleSpeedMode.ConstantSpindleSpeed, word.Raw);
      } else if (v == 98) {
        modals.CannedCycleReturnMode = new (TimingMode.PerMinute, word.Raw);
      } else if (v == 99) {
        modals.CannedCycleReturnMode = new (TimingMode.PerRevolution, word.Raw);
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
        machine.Status.Applicator.SpinDirection = SpinDirection.CW;
      } else if (v == 4) {
        machine.Status.Applicator.SpinDirection = SpinDirection.CCW;
      } else if (v == 5) {
        machine.Status.Applicator.SpinDirection = SpinDirection.None;
      } else if (v == 6) {
        machine.Log.Error("ATC (Automatic Tool Change) state?");
      } else if (v == 7) {
        machine.Status.Applicator.IsMistCoolantEnabled = true;
      } else if (v == 8) {
        machine.Status.Applicator.IsFloodCoolantEnabled = true;
      } else if (v == 9) {
        machine.Status.Applicator.IsMistCoolantEnabled = false;
        machine.Status.Applicator.IsFloodCoolantEnabled = true;
      } else if (v == 51 || v == 50 || v == 49 || v == 48) {
        if (machine.Status.Overrides == null) machine.Status.Overrides = new MachineOverrides();
        if (v == 50 || v == 48) machine.Status.Overrides.FeedAllowed = true;
        if (v == 51 || v == 48) machine.Status.Overrides.SpeedAllowed = true;
        if (v == 49) {
          machine.Status.Overrides.FeedAllowed = false;
          machine.Status.Overrides.SpeedAllowed = false;
        }
      } else if (v == 60) {
        modals.ProgramState = new (MachineProgramState.AutomaticChange, word.Raw);
      } else if (v >= 100 && v <= 199) {
        modals.UserDefinedCurrent = (int) Math.Floor(v) - 100;
      } else {
        machine.Log.Error("Unhandled MCode: M{code}", v);
      }

      return true;
    }
  }
}
