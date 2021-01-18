using OpenWorkEngine.OpenController.Programs.Interfaces;
using OpenWorkEngine.OpenController.Syntax;
using Serilog;
using Serilog.Core;

namespace OpenWorkEngine.OpenController.Programs.Models {
  public abstract class ProgramFile : IProgramSource {
    internal ILogger Log { get; }

    // (File) name (without extension)
    public string Name { get; } = default!;

    public abstract ProgramSyntax Syntax { get; }

    public ProgramFile(string name, ILogger log) {
      Name = name;
      Log = log.ForContext(GetType())
               .ForContext(Syntax.ToString(), Name);
    }
  }
}
