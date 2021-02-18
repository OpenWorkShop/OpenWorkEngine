
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using HotChocolate.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Interfaces {
  /// <summary>
  /// Encapsulates text to be written to the serial port.
  ///
  /// Can use a parser to wait on acknowledgement (e.g., "ok" from Grbl)
  /// </summary>
  public interface IControllerInstruction {
    /// <summary>
    /// Identifier of where the instruction came from. Might be a program, or a widget on frontend.
    /// </summary>
    public string InstructionSource { get; }

    /// <summary>
    /// Text which will be written, including templated variables (e.g., ${X})
    /// </summary>
    public string Template { get; }

    /// <summary>
    /// Prevents newline when writing to serial.
    /// </summary>
    public bool Inline { get; }

    /// <summary>
    /// Bypass the queue (Real-Time Commands)
    /// </summary>
    public bool Immediate { get; }

    /// <summary>
    /// e.g., ok/error
    /// </summary>
    public bool ResponseExpected { get; }

    /// <summary>
    /// The parsed syntax chunks (words) from the line.
    /// </summary>
    public SyntaxLine CompileSyntax(string line);

    /// <summary>
    /// Apply the SyntaxLine to a given machine.
    /// </summary>
    /// <param name="machine">The machine to edit.</param>
    /// <param name="line"></param>
    /// <returns>A list of all mutations (steps) performed on the machine.</returns>
    List<InstructionStep> GetSteps(ControlledMachine machine, SyntaxLine line);
  }

  public static class ControllerInstructionExtensions {
    /// <summary>
    /// Turn an instruction into something which can be written onto the serial port by replacing variables (args).
    /// </summary>
    /// <param name="instruction">Templated instruction</param>
    /// <param name="opts"></param>
    /// <returns>String which may be written to the serial port.</returns>
    public static CompiledInstruction Compile(
      this IControllerInstruction instruction, ControllerExecutionOptions? opts = null
    ) {
      string template = instruction.Template;
      opts ??= new ControllerExecutionOptions();
      object? args = opts.Args;
      if (args == null) return new CompiledInstruction(instruction, template, opts.OverrideSource);

      string compiled = $"{template}"; // lazy clone
      string pattern = @"((?<pre>\$)?{(?<name>\w+)(:=(?<def>[\w\d]+))?})";
      Log.Verbose("[INSTRUCTION] compile template {temp}", template);
      Dictionary<string, PropertyInfo> argProps = args.GetType()
                                        .GetProperties().Where(p => p.CanRead)
                                        .ToDictionary(
                                           p => p.GetCustomAttribute<JsonPropertyAttribute>()?.PropertyName ?? p.Name,
                                           p => p);
      foreach (Match match in Regex.Matches(template, pattern, RegexOptions.IgnoreCase)) {
        string varName = match.Groups["name"].Value; // "X"
        string pre = match.Groups["pre"].Value;
        string varTmpStr = match.Value; // "${X}"
        string? defaultVal = match.Groups.ContainsKey("def") ? match.Groups["def"].Value : null;
        object? val = defaultVal;
        PropertyInfo? prop = argProps.ContainsKey(varName) ? argProps[varName] : null;
        if (prop != null) {
          object? nv = prop.GetValue(args);
          if (nv != null) val = nv;
          // Convert enums to integer values
          if (val?.GetType().IsAssignableTo(typeof(Enum)) ?? false) {
            val = (int) val;
          }
        } else if (defaultVal == null) {
          Log.Debug("[INSTRUCTION] Args:\n{props}", argProps);
          throw new ArgumentException($"Variable {varName} requested by template \"{template}\", but not provided.");
        }
        string strVal = val?.ToString() ?? "";
        Log.Verbose("[INSTRUCTION] template {name} = {val}", varName, strVal);
        string replacement = "";
        if (strVal.Length > 0) {
          if (pre.Equals("$"))
            replacement = $"{varName}{strVal} ";
          else
            replacement = strVal;
        }
        compiled = compiled.Replace(varTmpStr, replacement);
      }

      //
      // List<PropertyInfo> argProps = args.GetType().GetProperties().Where(p => p.CanRead).ToList();
      // foreach (PropertyInfo prop in argProps) {
      //   object? val = prop.GetValue(args);
      //   string v = val?.ToString() ?? "";
      //   string k = $"${{{prop.Name}}}";
      //   template = template.Replace(k, v);
      // }

      while (compiled.Contains("  ")) compiled = compiled.Replace("  ", " ");

      compiled = compiled.Trim();
      Log.Debug("[INSTRUCTION] '{template}' => '{compiled}'", template, compiled);

      if (compiled.Contains('\n') || compiled.Contains('\r'))
        throw new ArgumentException($"Compiled instruction '{compiled}' had a line break.");

      return new CompiledInstruction(instruction, compiled, opts.OverrideSource);
    }
  }
}
