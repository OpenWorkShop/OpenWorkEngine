using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using OpenWorkEngine.OpenController.ControllerSyntax;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl;
using OpenWorkEngine.OpenController.Lib.Linq;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Programs.Enums;
using OpenWorkEngine.OpenController.Syntax.GCode.Extensions;

namespace OpenWorkEngine.OpenController.Syntax.GCode {
  /// <summary>
  ///   GCode words (G01, G20, M01, etc.) represent a "Type" of command.
  ///   They are part of a GCodeBlock that represents an instruction line.
  /// </summary>
  public class GCodeWord : IEquatable<GCodeWord> {
    public string Raw { get; }

    public GCodeLetter Letter { get; }

    private string LetterStr { get; }

    private char LetterChar { get; }

    public decimal Value { get; }

    public int Major { get; }

    public int Minor { get; }

    private static readonly ControllerTranslator GrblTranslator = new ControllerTranslator().UseGrblSyntax();

    public GCodeWord(string wordStr) {
      Raw = wordStr;
      if (wordStr.Length < 2) throw new ArgumentException($"Invalid word length: {wordStr}");

      LetterStr = wordStr.Substring(0, 1);
      LetterChar = LetterStr.ToCharArray()[0];
      if (!Enum.TryParse(LetterStr, out GCodeLetter letter))
        throw new ArgumentException($"Invalid GCode '{LetterStr}' from word {wordStr}");

      string num = wordStr.Substring(1);
      if (!decimal.TryParse(num, out decimal val))
        throw new ArgumentException($"Not a command number: {num} from word {wordStr}");

      Letter = letter;
      Value = val;
      Major = (int) Math.Floor(val);

      string[] parts = $"{val}".Split('.');
      if (parts.Length > 1 && int.TryParse(parts.Last(), out int minor))
        Minor = minor;
      else
        Minor = 0;
    }

    // GetCodeMap("G") => { 0: "Rapid", 1: ... }
    private static Func<ControlledMachine, FirmwareSettingMutation>? GetModalSetter(char letter, decimal value) {
      return GrblTranslator.modalSetters.Where(mv => {
        if (!mv.Key.StartsWith(letter)) return false;
        string num = mv.Key.Substring(1);
        if (!decimal.TryParse(num, out decimal val)) return false;

        return val == value;
      }).Select(mv => mv.Value).FirstOrDefault();
    }

    internal FirmwareSettingMutation? GetMutation(ControlledMachine machine) {
      if (Letter == GCodeLetter.F) {
        return machine.Status.Applicator.FeedRate.GetMutation(Value);
      } else if (Letter == GCodeLetter.S) {
        return machine.Status.Applicator.SpinSpeed.GetMutation(Value);
      } else if (Letter == GCodeLetter.T) {
        return machine.Status.Applicator.ToolId.GetMutation(Value.ToString(CultureInfo.InvariantCulture));
      } else {
        Func<ControlledMachine, FirmwareSettingMutation>? setter = GetModalSetter(LetterChar, Value);
        if (setter == null) throw new ArgumentException($"Invalid GCode: '{Raw}'");
        return setter.Invoke(machine);
      }
    }

/*
    // GCode modal groups / config
    private FirmwareSettingMutation? GetGCodeMutation(ControlledMachine machine) {
      decimal v = Value;
      MachineModals modals = machine.Configuration.Modals;
      if (v == 0) {
        return modals.Motion.GetMutation(MachineMotionType.Rapid);
      } else if (v == 1) {
        return modals.Motion.GetMutation(MachineMotionType.Linear);
      } else if (v == 2) {
        return modals.Motion.GetMutation(MachineMotionType.Arc);
      } else if (v == 3) {
        return modals.Motion.GetMutation(MachineMotionType.ArcCCW);
      } else if (v == 4) {
        return modals.Motion.GetMutation(MachineMotionType.Dwell);
      } else if (v == 7) {
        return modals.CylindricalInterpolation.GetMutation(EnabledType.Enabled);
      } else if (v == 8) {
        return modals.CylindricalInterpolation.GetMutation(EnabledType.Disabled);
      } else if (v == 17)  {
        return modals.Plane.GetMutation(AxisPlane.Xy);
      } else if (v == 18) {
        return modals.Plane.GetMutation(AxisPlane.Xz);
      } else if (v == 19) {
        return modals.Plane.GetMutation(AxisPlane.Yz);
      } else if (v == 20) {
        return modals.Units.GetMutation(UnitType.Imperial);
      } else if (v == 21) {
        return modals.Units.GetMutation(UnitType.Metric);
      } else if (v == 38.2M || v == 38.3M || v == 38.4M || v == 38.5M) {
        return modals.Motion.GetMutation(MachineMotionType.Probe);
      } else if (v == 40) {
        return machine.Status.Applicator.RadiusCompensation.GetMutation(ApplicatorRadiusCompensation.None);
      } else if (v == 41) {
        return machine.Status.Applicator.RadiusCompensation.GetMutation(ApplicatorRadiusCompensation.Left);
      } else if (v == 41.1M) {
        return machine.Status.Applicator.RadiusCompensation.GetMutation(ApplicatorRadiusCompensation.DynamicLeft);
      } else if (v == 42) {
        return machine.Status.Applicator.RadiusCompensation.GetMutation(ApplicatorRadiusCompensation.Right);
      } else if (v == 42.1M) {
        return machine.Status.Applicator.RadiusCompensation.GetMutation(ApplicatorRadiusCompensation.DynamicRight);
      } else if (v == 43 || v == 43.1M) {
        return machine.Status.Applicator.LengthOffsetFactorType.GetMutation(FactorType.Positive);
      } else if (v == 44 || v == 44.1M) {
        return machine.Status.Applicator.LengthOffsetFactorType.GetMutation(FactorType.Negative);
      } else if (v == 49) {
        return machine.Status.Applicator.LengthOffsetFactorType.GetMutation(FactorType.None);
      } else if (v >= 54 && v <= 59) {
        return modals.WorkCoordinateSystem.GetMutation((int) Math.Floor(v) - 54);
      } else if (v == 64) {
        return modals.PathControlMode.GetMutation(PathControlMode.Blended);
      } else if (v == 61 || v == 61.1M) { // ????
        return modals.PathControlMode.GetMutation(PathControlMode.Exact);
      } else if (v == 80) {
        return modals.Motion.GetMutation(MachineMotionType.Cancel);
      } else if (v == 90) {
        return modals.Distance.GetMutation(MovementDistanceType.Absolute);
      } else if (v == 90.1M) {
        return modals.ArcDistance.GetMutation(MovementDistanceType.Absolute);
      } else if (v == 91) {
        return modals.Distance.GetMutation(MovementDistanceType.Relative);
      } else if (v == 91.1M) {
        return modals.ArcDistance.GetMutation(MovementDistanceType.Relative);
      } else if (v == 93) {
        return modals.FeedRate.GetMutation(FeedRateMode.InverseTime);
      } else if (v == 94) {
        return modals.FeedRate.GetMutation(FeedRateMode.UnitsPerMinute);
      } else if (v == 95) {
        return modals.FeedRate.GetMutation(FeedRateMode.UnitsPerRevolution);
      } else if (v == 96) {
        return modals.SpindleSpeed.GetMutation(SpindleSpeedMode.ConstantSurfaceSpeed);
      } else if (v == 97) {
        return modals.SpindleSpeed.GetMutation(SpindleSpeedMode.ConstantSpindleSpeed);
      } else if (v == 98) {
        return modals.CannedCycleReturnMode.GetMutation(TimingMode.PerMinute);
      } else if (v == 99) {
        return modals.CannedCycleReturnMode.GetMutation(TimingMode.PerRevolution);
      } else {
        machine.Log.Error("Unhandled GCode: G{code}", v);
      }
      return null;
    }

    // GCode modal groups / config
    private FirmwareSettingMutation? GetMCodeMutation(ControlledMachine machine) {
      MachineModals modals = machine.Configuration.Modals;
      List<FirmwareSettingMutation?> mutations = new List<FirmwareSettingMutation?>();
      decimal v = Value;
      if (v == 0) {
        return modals.ProgramState.GetMutation(MachineProgramState.CompulsoryStop);
      } else if (v == 1) {
        return modals.ProgramState.GetMutation(MachineProgramState.OptionalStop);
      } else if (v == 2 || v == 30) {
        return modals.ProgramState.GetMutation(MachineProgramState.EndOfProgram);
      } else if (v == 3) {
        return machine.Status.Applicator.SpinDirection.GetMutation(ApplicatorSpinDirection.CW);
      } else if (v == 4) {
        return machine.Status.Applicator.SpinDirection.GetMutation(ApplicatorSpinDirection.CCW);
      } else if (v == 5) {
        return machine.Status.Applicator.SpinDirection.GetMutation(ApplicatorSpinDirection.None);
      } else if (v == 6) {
        machine.Log.Error("ATC (Automatic Tool Change) state?");
      } else if (v == 7) {
        return machine.Status.Applicator.Coolant.GetMutation(MachineCoolantState.Mist);
      } else if (v == 8) {
        return machine.Status.Applicator.Coolant.GetMutation(MachineCoolantState.Flood);
      } else if (v == 9) {
        return machine.Status.Applicator.Coolant.GetMutation(MachineCoolantState.None);
      } else if (v == 48) {
        return machine.Status.Overrides.Mode.GetMutation(MachineOverridesMode.All);
      } else if (v == 49) {
        return machine.Status.Overrides.Mode.GetMutation(MachineOverridesMode.None);
      } else if (v == 50) {
        return machine.Status.Overrides.Mode.GetMutation(MachineOverridesMode.Feeds);
      } else if (v == 51) {
        return machine.Status.Overrides.Mode.GetMutation(MachineOverridesMode.Speeds);
      } else if (v == 60) {
        return modals.ProgramState.GetMutation(MachineProgramState.AutomaticChange);
      } else if (v >= 100 && v <= 199) {
        return modals.UserDefined.GetMutation((int) Math.Floor(v) - 100);
      } else {
        machine.Log.Error("Unhandled MCode: M{code}", v);
      }

      return null;
    }*/

    public bool Equals(GCodeWord? other) {
      if (ReferenceEquals(null, other)) return false;
      if (ReferenceEquals(this, other)) return true;
      return Letter == other.Letter && Value == other.Value;
    }

    public override bool Equals(object? obj) {
      if (ReferenceEquals(null, obj)) return false;
      if (ReferenceEquals(this, obj)) return true;
      if (obj.GetType() != this.GetType()) return false;
      return Equals((GCodeWord) obj);
    }

    public override int GetHashCode() => HashCode.Combine((int) Letter, Value);
  }
}
