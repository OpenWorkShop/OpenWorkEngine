using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Programs.Enums;
using OpenWorkEngine.OpenController.Syntax.GCode;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public sealed class ProgramFile {
    public string Id => Meta.GetId();

    public ProgramFileMeta Meta { get; }

    // Number of instructions total
    public int InstructionCount => Instructions.Count;

    public List<CompiledInstruction> Instructions { get; } = new();

    internal ILogger Log { get; }

    public ProgramFile(ProgramFileMeta meta, ILogger log) {
      Meta = meta;
      Log = log.ForContext(GetType())
               .ForContext(Meta.Syntax.ToString(), Id);

      if (!meta.IsUpload && meta.LocalFile != null) {
        Log.Debug("[PGM] [LOCAL] {@meta}", meta);
        StreamReader stream = new StreamReader(meta.LocalFile.FullName);
        string? line;
        while ((line = stream.ReadLine()) != null) {
          AddLines(line);
        }
        stream.Close();
      } else if (meta.Upload != null) {
        Log.Debug("[PGM] [UPLOAD] {@meta}", meta);
        AddLines(meta.Upload.Text.Replace("\r\n", "\n").Split('\n').ToArray());
      } else {
        Log.Error("Invalid file meta.");
      }
    }

    private void AddLines(params string[] lines) {
      foreach (string line in lines) {
        GCodeBlock instruction = new GCodeBlock(line, Id);
        CompiledInstruction compiledInstruction = instruction.Compile();
        if (instruction.IsCode) {
          Log.Verbose("[PGM] [LINE] {instruction}", compiledInstruction.ToString());
        }
        Instructions.Push(compiledInstruction);
      }
    }
  }
}
