using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Syntax.GCode {
  // https://www.cnccookbook.com/g-code-basics-program-format-structure-blocks/
  public class GCodeBlock : IControllerInstruction {
    // Those commands which are realtime (sent inline, no Response expected).
    private static readonly string[] InLineCommands = new[] { "?", "!", "~", "\u0018" };

    public string InstructionSource { get; }
    public string Template { get; }
    public bool Inline { get; }
    public bool Immediate { get; }
    public bool ResponseExpected => !Inline; // Grbl sends responses to commands with line-breaks only.

    public GCodeBlock(string line, string instructionSource) {
      if (line.Contains('\n') || line.Contains('\r'))
        throw new ArgumentException($"GCode block '{line}' had a line break.");
      InstructionSource = instructionSource;
      Template = line;
      Inline = InLineCommands.Contains(line);
      // $X, $H, etc. all bypass the queue.
      Immediate = Inline || (line.Length == 2 && line.StartsWith("$"));
      Chunks = ParseLine(line);
    }

    public List<SyntaxChunk> Chunks { get; }

    public bool IsValid => Chunks.Any(c => c.IsValid);

    public bool IsCode => Chunks.Any(c => c.IsCode);

    public List<SyntaxChunk> CodeChunks => Chunks.Where(c => c.IsCode).ToList();

    public SyntaxLine CompileSyntax(string line) => new (line, ParseLine(line));

    public List<InstructionStep> GetSteps(ControlledMachine machine, SyntaxLine line) {
      List<InstructionStep> steps = new List<InstructionStep>();
      for(int i=0; i<line.Chunks.Count; i++) {
        SyntaxChunk chunk = line.Chunks[i];
        if (!chunk.IsCode || chunk.Value.StartsWith("$")) {
          continue;
        }
        GCodeWord word = new GCodeWord(chunk.Value);
        InstructionStep? step = null;

        if (word.Letter.IsMovementLetter()) {
          UpdateStepPosition(steps.Last(), word);
        } else {
          Func<ControlledMachine, InstructionStep>? setter = GCodeWord.GetModalSetter(word.LetterChar, word.Value);
          if (setter == null) throw new ArgumentException($"Invalid GCode: '{word.Raw}'");
          step = setter.Invoke(machine);
        }

        if (step != null) steps.Add(step);
      }
      return steps;
    }

    private void UpdateStepPosition(InstructionStep step, GCodeWord word) {
      if (!decimal.TryParse(word.Raw.Substring(1), out decimal val)) {
        val = 0;
      }
      if (step.Movement == null) step.Movement = new MachineMovement();
      if (word.Letter == GCodeLetter.A) step.Movement.A = val;
      if (word.Letter == GCodeLetter.B) step.Movement.B = val;
      if (word.Letter == GCodeLetter.C) step.Movement.C = val;
      if (word.Letter == GCodeLetter.I) step.Movement.I = val;
      if (word.Letter == GCodeLetter.J) step.Movement.J = val;
      if (word.Letter == GCodeLetter.K) step.Movement.K = val;
      if (word.Letter == GCodeLetter.U) step.Movement.U = val;
      if (word.Letter == GCodeLetter.V) step.Movement.V = val;
      if (word.Letter == GCodeLetter.W) step.Movement.W = val;
      if (word.Letter == GCodeLetter.X) step.Movement.X = val;
      if (word.Letter == GCodeLetter.Y) step.Movement.Y = val;
      if (word.Letter == GCodeLetter.Z) step.Movement.Z = val;
      if (word.Letter == GCodeLetter.P) step.Movement.Dwell = val;
    }

    private static bool IsCoordinateWord(string w) => w.StartsWith("X") || w.StartsWith("Y") || w.StartsWith("Z");

    public static List<SyntaxChunk> ParseLine(string line) {
      List<SyntaxChunk> chunks = new();
      SyntaxChunk curChunk = new() {Type = SyntaxType.Keyword};
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
        } else if (c == '=') {
          chunks.Add(curChunk);
          chunks.Add(new SyntaxChunk() { Value = "=", Type = SyntaxType.Operator });
          curChunk = new SyntaxChunk() { Type = SyntaxType.Value };
          whitespace = false;
        } else {
          // Not a comment. If we had whitespace w/ a valid command, we need a new chunk.
          if (whitespace && curChunk.IsCode) {
            chunks.Add(curChunk);
            curChunk = new SyntaxChunk() {Type = SyntaxType.Value}; // After the first chunk, everything should be vals
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
