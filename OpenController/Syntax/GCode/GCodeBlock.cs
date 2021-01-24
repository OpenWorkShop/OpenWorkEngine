using System;
using System.Collections.Generic;
using System.Linq;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Programs.Interfaces;
using OpenWorkEngine.OpenController.Programs.Models;
using Serilog;
using Parser = OpenWorkEngine.OpenController.Controllers.Services.Serial.Parser;

namespace OpenWorkEngine.OpenController.Syntax.GCode {
  // https://www.cnccookbook.com/g-code-basics-program-format-structure-blocks/
  public class GCodeBlock : IControllerInstruction {
    // Those commands which are realtime (sent inline, no Response expected).
    private static readonly string[] RealTimeCommands = new[] { "?", "!", "~", "\u0018" };

    public string InstructionSource { get; }
    public string Template { get; }
    public bool Inline { get; }

    public GCodeBlock(string line, string instructionSource) {
      if (line.Contains('\n') || line.Contains('\r'))
        throw new ArgumentException($"GCode block '{line}' had a line break.");
      InstructionSource = instructionSource;
      Template = line;
      Inline = RealTimeCommands.Contains(line);
      Chunks = ParseLine(line);
    }

    public List<SyntaxChunk> Chunks { get; }

    public bool IsValid => Chunks.Any(c => c.IsValid);

    public bool IsCode => Chunks.Any(c => c.IsCode);

    public List<SyntaxChunk> CodeChunks => Chunks.Where(c => c.IsCode).ToList();

    public List<SyntaxChunk> CompileChunks(string line) => ParseLine(line);

    public static List<SyntaxChunk> ParseLine(string line) {
      List<SyntaxChunk> chunks = new();
      SyntaxChunk curChunk = new();
      bool whitespace = false;
      for (int i = 0; i < line.Length; i++) {
        char c = line[i];
        string? comment = null;

        if (c == ';') {
          // Comment from here on out.
          comment = line.Substring(i + 1);
        } else if (c == '(') {
          // Extract a partial comment
          int close = line.IndexOf(')', i);
          if (close > i) {
            comment = line.Substring(i + 1, close - i - 1);
            i += 1; // Skip the close paren.
          } else {
            comment = line.Substring(i + 1);
          }
        } else if (c == ' ') {
          whitespace = true;
        } else {
          // Not a comment. If we had whitespace w/ a valid command, we need a new chunk.
          if (whitespace && curChunk.IsCode) {
            chunks.Add(curChunk);
            curChunk = new SyntaxChunk();
            whitespace = false;
          }
          // Append to a command.
          curChunk.Value += c;
        }

        if (comment != null) {
          curChunk.Comments.Push(comment);
          i += comment.Length + 1;
        }
      }
      chunks.Add(curChunk);
      return chunks;
    }

    public override string ToString() => $"[{string.Join(", ", Chunks.Select(c => c.ToString()))}]";
  }
}
