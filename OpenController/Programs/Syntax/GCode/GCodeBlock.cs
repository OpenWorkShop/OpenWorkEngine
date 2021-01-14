using System.Collections.Generic;
using System.Linq;
using HotChocolate.Language;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Syntax.GCode {
  // https://www.cnccookbook.com/g-code-basics-program-format-structure-blocks/
  public class GCodeBlock {
    public GCodeBlock(string line, ILogger log) {
      Log = log.ForContext("line", line);
      Line = line;
      Chunks = ParseLine(line);
      Log.Debug("[GCODE] parsed line: {gCodeLine}", ToString());
    }

    public ILogger Log { get; }

    public string Line { get; }

    public List<SyntaxChunk> Chunks { get; }

    public bool IsValid => Chunks.Any(c => c.IsValid);

    public bool IsCommand => Chunks.Any(c => c.IsCommand);

    // Those
    public List<SyntaxChunk> Commands => Chunks.Where(c => IsCommand).ToList();

    private List<SyntaxChunk> ParseLine(string line) {
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
          if (whitespace && curChunk.IsCommand) {
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
