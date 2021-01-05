using System;
using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Programs.Enums;
using OpenWorkEngine.OpenController.Programs.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.GCode {
  public class GCodeProgram {
    public ILogger Log { get; }

    public string Name { get; }

    public List<GCodeLine> Lines { get; } = new();

    public GCodeProgram(string name) {
      Name = name;
      Log = Serilog.Log.Logger
                   .ForContext(GetType())
                   .ForContext("gCodeProgram", Name);
    }

    public void AppendLines(string[] lines) {
      foreach (string line in lines) {
        Lines.Append(new GCodeLine(line, Log));
      }
    }

    public override string ToString() => $"<GC:{Name}>";
  }
}
