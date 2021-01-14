using System.Collections.Generic;
using System.Linq;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Syntax.GCode {
  public class GCodeProgram {
    public GCodeProgram(string name) {
      Name = name;
      Log = Serilog.Log.Logger
                   .ForContext(GetType())
                   .ForContext("gCodeProgram", Name);
    }

    public ILogger Log { get; }

    public string Name { get; }

    public List<GCodeBlock> Lines { get; } = new();

    public void AppendLines(string[] lines) {
      foreach (string line in lines) Lines.Append(new GCodeBlock(line, Log));
    }

    public override string ToString() => $"<GC:{Name}>";
  }
}
