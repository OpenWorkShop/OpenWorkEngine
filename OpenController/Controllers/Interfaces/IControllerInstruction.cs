
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using HotChocolate.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using OpenWorkEngine.OpenController.Controllers.Models;
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
    /// The parsed syntax chunks (words) from the line.
    /// </summary>
    public List<SyntaxChunk> CompileChunks(string line);
  }

  public static class ControllerInstructionExtensions {
    /// <summary>
    /// Turn an instruction into something which can be written onto the serial port by replacing variables (args).
    /// </summary>
    /// <param name="instruction">Templated instruction</param>
    /// <param name="args">Object which has public properties relating to the instruction's template.</param>
    /// <returns>String which may be written to the serial port.</returns>
    public static CompiledInstruction Compile(this IControllerInstruction instruction, object? args) {
      string template = instruction.Template;
      if (args == null) return new CompiledInstruction(instruction, template);

      string compiled = $"{template}"; // lazy clone
      string src = instruction.InstructionSource;
      string pattern = @"(\${(?<name>\w+)(:=(?<def>[\w\d]+))?})";
      Log.Verbose("[INSTRUCTION] compile template {temp}", template);
      Dictionary<string, PropertyInfo> argProps = args.GetType()
                                        .GetProperties().Where(p => p.CanRead)
                                        .ToDictionary(
                                           p => p.GetCustomAttribute<JsonPropertyAttribute>()?.PropertyName ?? p.Name,
                                           p => p);
      foreach (Match match in Regex.Matches(template, pattern, RegexOptions.IgnoreCase)) {
        string varName = match.Groups["name"].Value; // "X"
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
        string replacement = strVal.Length > 0 ? $"{varName}{strVal} " : "";
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
        throw new ArgumentException($"Compiled instruction '{compiled}' from '{src}' had a line break.");

      return new CompiledInstruction(instruction, compiled);
    }
  }
}
