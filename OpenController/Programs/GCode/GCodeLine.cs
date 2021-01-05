using System;
using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Programs.Enums;
using OpenWorkEngine.OpenController.Programs.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.GCode {
  public class GCodeLine {
    public ILogger Log { get; }

    public string Line { get; }

    public List<GCodeChunk> Chunks { get; }

    public List<string> Commands => _commands ??= Chunks.Where(c => !c.IsComment).Select(c => c.Value).ToList();
    private List<string>? _commands;

    public List<string> Comments => _comments ??= Chunks.Where(c => c.IsComment).Select(c => c.Value).ToList();
    private List<string>? _comments;

    public bool IsCommand => Commands.Any();

    public GCodeLine(string line, ILogger log) {
      Log = log.ForContext("line", line);
      Line = line;
      Chunks = ParseLine(line);
      Serilog.Log.Debug("[GCODE] parsed line: {gCodeLine}", ToString());
    }

    public ProgramInstruction ToProgramInstruction() => new() {
      InstructionType = GetInstructionType(),
      Comment = Comments.Any() ? string.Join(", ", Comments) : null,
    };

    private ProgramInstructionType GetInstructionType() {
      if (!IsCommand) return ProgramInstructionType.None;
      string firstCmdStr = Commands.First().ToUpperInvariant();
      Log.Debug("[GCODE] parse {cmd}", firstCmdStr);
      if (!Enum.TryParse(firstCmdStr, true, out GCodeCommand gCodeCommand)) {
        Log.Error("[GCODE] failed to parse {cmd}", firstCmdStr);
        return ProgramInstructionType.Invalid;
      }
      return ProgramInstructionType.MoveRelative;
    }

    private List<GCodeChunk> ParseLine(string line) {
      List<GCodeChunk> chunks = new List<GCodeChunk>();
      GCodeChunk? commandChunk = null;
      for (int i = 0; i < line.Length; i++) {
        char c = line[i];
        GCodeChunk? commentChunk = null;

        if (c == ';') {
          // Comment from here on out.
          commentChunk = new GCodeChunk(line.Substring(i + 1), true);
        } else if (c == '(') {
          // Extract a partial comment
          int close = line.IndexOf(')', i);
          if (close > i) {
            commentChunk = new GCodeChunk(line.Substring(i + 1, (close - i - 1)), true);
            i += 1; // Skip the close paren.
          } else {
            commentChunk = new GCodeChunk(line.Substring(i + 1), true);
          }
        } else if (c == ' ') {
          if (commandChunk != null) chunks.Add(commandChunk);
          commandChunk = null;
        } else {
          // Not a comment. Append to a command.
          if (commandChunk == null) commandChunk = new GCodeChunk("", false);
          commandChunk.Value += c;
        }

        if (commentChunk != null) {
          if (commandChunk != null) {
            chunks.Add(commandChunk);
            commandChunk = null;
          }
          chunks.Add(commentChunk);
          i += commentChunk.Value.Length + 1;
        }
      }
      if (commandChunk != null) {
        chunks.Add(commandChunk);
      }
      return chunks;
    }

    public override string ToString() => $"[{string.Join(", ", Chunks.Select(c => c.ToString()))}]";
  }
}
