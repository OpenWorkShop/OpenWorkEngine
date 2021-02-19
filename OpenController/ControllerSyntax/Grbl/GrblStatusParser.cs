using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Lib.Linq;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  /// <summary>
  ///   Grbl Status includes the GrblState (Active, Idle, etc.) as well as one or more arguments (WPos, MPos, etc.)
  /// </summary>
  internal class GrblStatusParser : RegexParser {
    public GrblStatusParser() : base(@"^<(?<state>[\w:]+)(?<data>.*)>$") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      int orig = line.Machine.Status.GetHashCode();

      string? state = values["state"];
      if (state != null) ApplyState(state, line.Machine);

      string? data = values["data"];
      if (data == null || data.Length <= 0) {
        return CheckChange(line, orig, line.Machine.Status.GetHashCode(), MachineTopic.Status);
      }

      // Extract the various arguments
      string pattern = @"(?<key>[a-zA-Z]+)(:(?<value>[0-9\.\-\w]+(,[0-9\.\-]+){0,5}))?";
      foreach (Match match in Regex.Matches(data, pattern, RegexOptions.IgnoreCase)) {
        Dictionary<string, string> args = MatchToDictionary(match);
        string val = "";
        if (!args.ContainsKey("value"))
          line.Machine.Log.Error("Empty argumnent: {key} from {data}", args["key"], data);
        else
          val = args["value"] ?? "";
        ApplyArgument(args["key"], val, line.Machine);
      }

      if (orig != line.Machine.Status.GetHashCode()) {
        line.Log.Debug("[STATUS] {status}", line.Machine.Status.ToString());
        line = line.WithTopics(MachineTopic.Status);
      }
      return line;
    }

    private static void ApplyState(string grblStateStr, ControlledMachine machine) {
      string[] parts = grblStateStr.Split(':');
      string first = parts.First();

      // Parse out the state at the beginning.
      if (Enum.TryParse(first, true, out GrblActiveState state)) machine.Status.ActivityState = state.ToActiveState();

      // Check for sub-state?
    }

    private static void ApplyArgument(string key, string value, ControlledMachine machine) {
      machine.Log.Verbose("[ARG] {key} = {value}", key, value);

      if (key.Equals("WPos")) {
        // Work Position (v0.9, v1.1)
        MachinePosition wPos = GetPositionArgument(value, machine);
        if (wPos.HasValue) machine.Status.WorkPosition = wPos;
      } else if (key.Equals("MPos")) {
        // Machine Position (v0.9, v1.1)
        machine.Status.MachinePosition = GetPositionArgument(value, machine);
      } else if (key.Equals("WCO")) {
        // Work Coordinate Offset (v1.1)
        MachinePosition wco = GetPositionArgument(value, machine);
        if (wco.HasValue) machine.Status.WorkCoordinateOffset = GetPositionArgument(value, machine);
      } else if (key.Equals("Buf")) {
        // Planner Buffer (v0.9)
        machine.Status.Buffer.AvailableSend = (int) GetNumbers(value)[0];
      } else if (key.Equals("RX")) {
        // RX Buffer (v0.9)
        machine.Status.Buffer.AvailableReceive = (int) GetNumbers(value)[0];
      } else if (key.Equals("Bf")) {
        // Buffer State (v1.1)
        decimal[] nums = GetNumbers(value, 2);
        // the number of available blocks in the planner buffer
        machine.Status.Buffer.AvailableSend = (int) nums[0];
        // available bytes in the serial RX buffer.
        machine.Status.Buffer.AvailableReceive = (int) nums[1];
      } else if (key.Equals("Ln")) {
        // Line Number (v0.9, v1.1)
        // Ln:99999 indicates line 99999 is currently being executed.
        machine.Status.Buffer.LineNumber = (int) GetNumbers(value)[0];
      } else if (key.Equals("F")) {
        // Feed Rate (v0.9, v1.1)
        // F:500 contains real-time feed rate data as the value.
        // This appears only when VARIABLE_SPINDLE is disabled.
        machine.Status.Applicator.FeedRate.Data = GetNumbers(value)[0];
      } else if (key.Equals("FS")) {
        // Current Feed and Speed (v1.1)
        // FS:500,8000 contains real-time feed rate, followed by spindle speed, data as the values.
        decimal[] nums = GetNumbers(value, 2);
        machine.Status.Applicator.FeedRate.Data = nums[0];
        machine.Status.Applicator.SpinSpeed.Data = nums[1];
      } else if (key.Equals("Lim")) {
        // Limit Pins (v0.9)
        // X_AXIS is (1<<0) or bit 0
        // Y_AXIS is (1<<1) or bit 1
        // Z_AXIS is (1<<2) or bit 2
        machine.Status.ActivePins.Clear();
        int val = (int) GetNumbers(value)[0];
        if ((val & (1 << 0)) == 1 << 0) machine.Status.ActivePins.Push(MachinePinType.X);
        if ((val & (1 << 1)) == 1 << 1) machine.Status.ActivePins.Push(MachinePinType.Y);
        if ((val & (1 << 2)) == 1 << 2) machine.Status.ActivePins.Push(MachinePinType.Z);
        if ((val & (1 << 2)) == 1 << 2) machine.Status.ActivePins.Push(MachinePinType.A);
      } else if (key.Equals("Pn")) {
        // Input Pin State (v1.1)
        // * Pn:XYZPDHRS indicates which input pins Grbl has detected as 'triggered'.
        // * Each letter of XYZPDHRS denotes a particular 'triggered' input pin.
        machine.Status.ActivePins.Clear();
        char[] chars = value.ToCharArray();
        foreach (char c in chars) {
          if (!Enum.TryParse(c.ToString(), true, out MachinePinType pinType)) {
            machine.Log.Warning("[GRBL] Unknown pin type '{pin}' in Pn:{pins}", c, value);
            continue;
          }
          machine.Status.ActivePins.Push(pinType);
        }
      } else if (key.Equals("Ov")) {
        // Override Values (v1.1)
        decimal[] nums = GetNumbers(value, 3);
        machine.Status.Overrides.Feed.Data = nums[0];
        machine.Status.Overrides.Rapids.Data = nums[1];
        machine.Status.Overrides.Speed.Data = nums[2];
      } else if (key.Equals("A")) {
        // Accessory State (v1.1)
        // * A:SFM indicates the current state of accessory machine components, such as the spindle and coolant.
        // * Each letter after A: denotes a particular state. When it appears, the state is enabled. When it does not appear, the state is disabled.

        char[] chars = value.ToCharArray();

        CircleDirection dir = CircleDirection.None;
        //   - S indicates spindle is enabled in the CW direction. This does not appear with C.
        if (chars.Contains('S'))
          dir = CircleDirection.Cw;
        //   - C indicates spindle is enabled in the CCW direction. This does not appear with S.
        else if (chars.Contains('C')) dir = CircleDirection.Ccw;

        if (dir != CircleDirection.None) machine.Status.Applicator.SpinDirection.Data = dir;

        bool flood = chars.Contains('F');
        bool mist = chars.Contains('M');
        if (flood || mist) {
          //   - F indicates flood coolant is enabled.
          if (flood && mist) machine.Status.Applicator.Coolant.Data = MachineCoolantState.All;
          else if (flood) machine.Status.Applicator.Coolant.Data = MachineCoolantState.Flood;
          else if (mist) machine.Status.Applicator.Coolant.Data = MachineCoolantState.Mist;
        } else {
          machine.Status.Applicator.Coolant.Data = MachineCoolantState.None;
        }
      } else {
        throw new ArgumentException($"Invalid Grbl Status Argument: '{key}' = {value}");
      }
    }

    // Will always return at least minCount array size of numbers.
    private static decimal[] GetNumbers(string? value, int minCount = 1) {
      List<decimal> nums = (value ?? "").Split(',').Select(v => decimal.TryParse(v, out decimal res) ? res : 0).ToList();
      while (nums.Count < minCount) nums.Add(0);
      return nums.ToArray();
    }

    private static decimal ParseUnits(string val, decimal factor) {
      if (!decimal.TryParse(val, out decimal ret)) return 0;
      return ret * factor;
    }

    // String to coordinates: "0.00,1.00,1.00" => { x: 0, y: 1, z: 1 }
    internal static MachinePosition GetPositionArgument(string? val, ControlledMachine machine) {
      string[] parts = val?.Split(',') ?? new string[] { };
      decimal? x = null, y = null, z = null, a = null, b = null, c = null;
      decimal factor = machine.Settings.Reporting.ReportInches.Data ? (1M /  25.4M) : 1M;
      if (parts.Length >= 1) x = ParseUnits(parts[0], factor);
      if (parts.Length >= 2) y = ParseUnits(parts[1], factor);
      if (parts.Length >= 3) z = ParseUnits(parts[2], factor);
      if (parts.Length >= 4) a = ParseUnits(parts[3], factor);
      if (parts.Length >= 5) b = ParseUnits(parts[4], factor);
      if (parts.Length >= 6) c = ParseUnits(parts[5], factor);
      return new MachinePosition {X = x, Y = y, Z = z, A = a, B = b, C = c};
    }
  }
}
