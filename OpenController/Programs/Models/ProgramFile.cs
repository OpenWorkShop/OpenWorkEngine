using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Programs.Enums;
using OpenWorkEngine.OpenController.Syntax.GCode;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public sealed class ProgramFile {
    public string Id => Meta.FilePath;

    public ProgramFileMeta Meta { get; }

    // "Instructions" only include code, not comments & whitespace lines.
    public int InstructionCount => Instructions.Count;

    public List<CompiledInstruction> Instructions { get; } = new();

    // All lines are represented by compiled instructions.
    public int LineCount => Lines.Count;

    public List<CompiledInstruction> Lines { get; } = new();

    internal ILogger Log { get; }

    public ProgramFile(ProgramFileMeta meta, ILogger log) {
      Meta = meta;
      Log = log.ForContext(GetType())
               .ForContext(Meta.Syntax.ToString(), Id);

      if (!meta.FileExists) {
        throw new ArgumentException($"Program file does not exist: {meta.FilePath}");
      }
    }

    internal async Task ReadFile() {
      if (LineCount > 0) return;
      Log.Debug("[PGM] [READ] {@meta}", Meta);
      StreamReader stream = new StreamReader(Meta.LocalFile.FullName);
      try {
        string? line;
        while ((line = await stream.ReadLineAsync()) != null) {
          GCodeBlock instruction = new GCodeBlock(line, Id);
          CompiledInstruction compiledInstruction = instruction.Compile();
          if (instruction.IsCode) {
            Instructions.Push(compiledInstruction);
            Log.Verbose("[PGM] [LINE] {instruction}", compiledInstruction.ToString());
          }
          Lines.Push(compiledInstruction);
        }
      } catch (Exception e) {
        Log.Error(e, "Failed to read program.");
      } finally {
        stream.Close();
      }
    }
  }
}
