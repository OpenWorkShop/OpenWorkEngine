using System;
using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl;
using OpenWorkEngine.OpenController.Lib.Linq;
using OpenWorkEngine.OpenController.Syntax;
using OpenWorkEngine.OpenController.Syntax.GCode;

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
    internal Parser? Welcome { get; set; }

    internal Parser? Firmware { get; set; }

    internal Parser? Alarm { get; set; }

    // Tip, etc.
    internal Parser? Help { get; set; }

    // eg.g., work coordinates (G54-G59), predefined positions (G28, G30), tool length, probing
    internal Parser? Parameters { get; set; }

    // e.g., firmware settings
    internal Parser? Settings { get; set; }

    // ??
    internal Parser? Options { get; set; }

    internal List<Parser> OptionalParsers =>
      new List<Parser?> {Alarm, Welcome, Firmware, Help, Parameters, Settings, Options}.SelectNonNull();

    // Command codes that apply to all types of machines.
    private readonly Dictionary<string, ControllerScript> _commandScripts = new () { };

    internal ControllerScript GetCommandScript(string methodName) {
      ControllerScript? script = _commandScripts.ContainsKey(methodName) ? _commandScripts[methodName] : null;
      if (script == null) {
        throw new ArgumentException($"The command {methodName} is not supported.");
      }
      return script;
    }

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
  }
}
