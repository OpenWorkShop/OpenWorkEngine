using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using Serilog;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  public static class GrblSettings {
    // https://github.com/gnea/grbl/blob/master/doc/markdown/settings.md
    private static List<SettingDefinition> Settings = new List<SettingDefinition>() {
      new ("0", MachineSettingType.StepPulse, MachineSettingUnits.Microseconds),
      new ("1", MachineSettingType.StepIdleDelay, MachineSettingUnits.Milliseconds),
      new ("2", MachineSettingType.StepPortInvert, MachineSettingUnits.Mask),
      new ("3", MachineSettingType.DirectionPortInvert, MachineSettingUnits.Mask),
      new ("4", MachineSettingType.StepEnableInvert, MachineSettingUnits.Boolean),
      new ("5", MachineSettingType.LimitPinsInvert, MachineSettingUnits.Boolean),
      new ("6", MachineSettingType.ProbePinInvert, MachineSettingUnits.Boolean),
      new ("10", MachineSettingType.StatusReport, MachineSettingUnits.Mask),
      new ("11", MachineSettingType.JunctionDeviation, MachineSettingUnits.Millimeters),
      new ("12", MachineSettingType.ArcTolerance, MachineSettingUnits.Millimeters),
      new ("13", MachineSettingType.ReportInches, MachineSettingUnits.Boolean),
      new ("20", MachineSettingType.SoftLimits, MachineSettingUnits.Boolean),
      new ("21", MachineSettingType.HardLimits, MachineSettingUnits.Boolean),
      new ("22", MachineSettingType.HomingCycle, MachineSettingUnits.Boolean),
      new ("23", MachineSettingType.HomingDirectionInvert, MachineSettingUnits.Boolean),
      new ("24", MachineSettingType.HomingFeed, MachineSettingUnits.MillimetersPerMinute),
      new ("25", MachineSettingType.HomingSeek, MachineSettingUnits.MillimetersPerMinute),
      new ("26", MachineSettingType.HomingDebounce, MachineSettingUnits.Milliseconds),
      new ("27", MachineSettingType.HomingPullOff, MachineSettingUnits.Millimeters),
      new ("30", MachineSettingType.MaxSpindleSpeed, MachineSettingUnits.Rpm),
      new ("31", MachineSettingType.MinSpindleSpeed, MachineSettingUnits.Rpm),
      new ("32", MachineSettingType.LaserMode, MachineSettingUnits.Boolean),
      new ("100", MachineSettingType.StepsX, MachineSettingUnits.StepsPerMillimeter),
      new ("101", MachineSettingType.StepsY, MachineSettingUnits.StepsPerMillimeter),
      new ("102", MachineSettingType.StepsZ, MachineSettingUnits.StepsPerMillimeter),
      new ("110", MachineSettingType.RateMaxX, MachineSettingUnits.MillimetersPerMinute),
      new ("111", MachineSettingType.RateMaxY, MachineSettingUnits.MillimetersPerMinute),
      new ("112", MachineSettingType.RateMaxZ, MachineSettingUnits.MillimetersPerMinute),
      new ("120", MachineSettingType.AccelerationX, MachineSettingUnits.MillimetersPerSecondsSquared),
      new ("121", MachineSettingType.AccelerationY, MachineSettingUnits.MillimetersPerSecondsSquared),
      new ("122", MachineSettingType.AccelerationZ, MachineSettingUnits.MillimetersPerSecondsSquared),
      new ("130", MachineSettingType.TravelMaxX, MachineSettingUnits.Millimeters),
      new ("131", MachineSettingType.TravelMaxY, MachineSettingUnits.Millimeters),
      new ("132", MachineSettingType.TravelMaxZ, MachineSettingUnits.Millimeters),
    };

    public static Dictionary<string, SettingDefinition> Map = Settings.ToDictionary(s => s.code, s => s);

    public static SettingDefinition? Find(string code) {
      if (code.StartsWith('$')) code = code.Substring(1);
      return Map.ContainsKey(code) ? Map[code] : null;
    }

    public static SettingDefinition Get(string code, string comment) {
      SettingDefinition? s = Find(code);
      if (s != null) return s;
      Log.Warning("GRBL setting ${code} is unknown: '{comment}'", code, comment);
      return new SettingDefinition(code, MachineSettingType.Grbl, MachineSettingUnits.Unknown);
    }
  }
}
