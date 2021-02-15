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
  public sealed class ProgramFile : IDisposable {
    public string Id => Meta.GetId();

    public ProgramFileMeta Meta { get; }

    // Number of instructions total
    public int InstructionCount => Instructions.Count;

    // Current instruction (not yet run).
    public int InstructionIndex { get; } = 0;

    public ProgramState State { get; private set; } = ProgramState.Created;

    public List<CompiledInstruction> Instructions { get; } = new();

    internal ConcurrentQueue<string> UnprocessedLines { get; } = new();

    internal ILogger Log { get; }

    private StreamReader? _fileReader;

    public ProgramFile(ProgramFileMeta meta, ILogger log) {
      Meta = meta;
      Log = log.ForContext(GetType())
               .ForContext(Meta.Syntax.ToString(), Id);

      if (!meta.IsUpload && meta.LocalFile != null) {
        Log.Debug("[PGM] [LOCAL] {@meta}", meta);
        _fileReader = new StreamReader(meta.LocalFile.FullName);
      } else {
        Log.Debug("[PGM] [UPLOAD] {@meta}", meta);
      }
    }

    private void AddLines(params string[] lines) {
      foreach (string line in lines) {
        UnprocessedLines.Enqueue(line);
      }
    }

    private bool ProcessLine() {
      if (!UnprocessedLines.TryDequeue(out string? line)) {
        State = ProgramState.Loaded;
        return false;
      }

      GCodeBlock instruction = new GCodeBlock(line, Id);
      CompiledInstruction compiledInstruction = instruction.Compile();
      if (instruction.IsCode) {
        Log.Debug("[PGM] [LINE] {instruction}", compiledInstruction.ToString());
      }
      Instructions.Push(compiledInstruction);
      return true;
    }

    // Helper function to read from local file (if necessary) and process lines.
    internal bool Process() {
      string? line = _fileReader?.ReadLine();
      if (line != null) {
        AddLines(line);
      } else if (_fileReader != null) {
        CloseStream();
      }
      return ProcessLine();
    }

    internal void CloseStream() {
      _fileReader?.Close();
      _fileReader = null;
    }

    public void Dispose() {
      _fileReader?.Dispose();
    }
  }
}
