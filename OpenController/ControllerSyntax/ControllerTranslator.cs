using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Runtime.CompilerServices;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl;
using OpenWorkEngine.OpenController.Lib.Linq;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax;
using OpenWorkEngine.OpenController.Syntax.GCode;
using Serilog;

namespace OpenWorkEngine.OpenController.ControllerSyntax {

  internal class ControllerTranslator {
    // Generic command acknowledgement, e.g., "ok", executed before all others.
    internal Parser Response { get; set; } = new GrblResponseParser();

    // Fallback parser, executed after all others.
    internal Parser Fallback { get; set; }

    // ConfigPoll, StatusPoll
    internal SerialPoll? StatusPoll { get; set; }

    internal SerialPoll? ConfigPoll { get; set; }

    internal List<SerialPoll> Polls => new List<SerialPoll?> {StatusPoll, ConfigPoll}.SelectNonNull();

    // Connection message (startup)
    internal Parser? WelcomeParser { get; set; }

    internal Parser? FirmwareParser { get; set; }

    internal Parser? AlarmParser { get; set; }

    // Tip, etc.
    internal Parser? HelpParser { get; set; }

    // eg.g., work coordinates (G54-G59), predefined positions (G28, G30), tool length, probing
    internal Parser? ParameterParser { get; set; }

    // e.g., firmware settings
    internal Parser? SettingParser { get; set; }

    // ??
    internal Parser? OptionParser { get; set; }

    internal List<Parser> OptionalParsers => new List<Parser?> {
      AlarmParser, WelcomeParser, FirmwareParser, HelpParser, ParameterParser, SettingParser, OptionParser
    }.SelectNonNull();

    // Command codes that apply to all types of machines.
    private readonly Dictionary<string, ControllerScript> _commandScripts = new () { };

    internal ControllerScript GetCommandScript(string methodName) {
      ControllerScript? script = _commandScripts.ContainsKey(methodName) ? _commandScripts[methodName] : null;
      if (script == null) {
        throw new ArgumentException($"The command {methodName} is not supported.");
      }
      return script;
    }

    internal ControllerScript SettingScript =
      new (Compiler.LoadInstructions("{Key}={Value}", line => new GCodeBlock(line, "Setting")));

    /// <summary>
    /// Directly set code for some well-known command (methodName) derived from an actual method name on the controller.
    /// </summary>
    /// <param name="methodName">An actual function on Controller</param>
    /// <param name="code">GCode; must be single line</param>
    /// <param name="inline">Use the immediate (write) flag</param>
    /// <param name="overwrite">Overwrite existing command?</param>
    /// <exception cref="ArgumentException">Command already exists.</exception>
    internal void SetCommandScript(string methodName, string code, bool overwrite = false) {
      if (_commandScripts.ContainsKey(methodName)) {
        if (!overwrite) {
          throw new ArgumentException($"Command already exists: {methodName}");
        }
        _commandScripts.Remove(methodName);
      }
      // Scripts are uncompiled. But the compiler parses the instructions into a script.
      _commandScripts[methodName] =
        new ControllerScript(Compiler.LoadInstructions(code, line => new GCodeBlock(line, methodName)));
    }

    internal readonly Dictionary<string, Func<FirmwareSettings, FirmwareSetting>> settingCodes = new();
    internal readonly Dictionary<string, string> settingPaths = new();

    internal FirmwareSetting? GetSetting(ControlledMachine machine, string code) =>
      settingCodes.ContainsKey(code) ? settingCodes[code].Invoke(machine.Settings) : null;

    internal void ApplyDefaultSettings(ControlledMachine machine) {
      foreach (string code in settingCodes.Keys) {
        FirmwareSetting? setting = GetSetting(machine, code);
        if (setting == null) {
          throw new ArgumentException($"Missing setting {code} for machine {machine.Id}");
        }
        if (string.IsNullOrWhiteSpace(setting.Title)) {
          List<string> paths = settingPaths[code].Split('.').ToList();
          setting.Id = string.Join('.', paths);
          string title = paths.Last();
          if (title.Length < 2 && paths.Count > 1) {
            title = paths[^2] + '.' + title;
          }
          setting.Title = title;
        }
      }
    }

    internal void DefineSetting(string code, Expression<Func<FirmwareSettings, FirmwareSetting>> expression) {
      // if (!(expression.Body is MemberExpression member))
      //   throw new ArgumentException($"Expression '{expression}' refers to a method, not a property.");
      // PropertyInfo? propInfo = member.Member as PropertyInfo;
      string path = GetExpressionPath(expression);
      // Log.Verbose("Defining {prop} as {code} ({type})", path, code, typeof(TData).Name);
      settingCodes[code] = expression.Compile();
      settingPaths[code] = path;
      // settingSetters[code] = setter;
    }

    // e.g., "StepperPins.Steps.X" -- the path from the root of the FirmwareSettings.
    private string GetExpressionPath<T>(Expression<Func<FirmwareSettings, T>> expression)
    {
      var body = expression.Body as MemberExpression;

      if (body == null)
      {
        body = ((UnaryExpression)expression.Body).Operand as MemberExpression;
      }

      return string.Join(".", GetPropertyNames(body).Reverse());
    }

    private IEnumerable<string> GetPropertyNames(MemberExpression? body)
    {
      while (body != null)
      {
        yield return body.Member.Name;
        Expression? inner = body.Expression;
        switch (inner?.NodeType)
        {
          case ExpressionType.MemberAccess:
            body = inner as MemberExpression;
            break;
          default:
            body = null;
            break;

        }
      }
    }
  }
}
