using OpenWorkEngine.OpenController.Syntax;
using Serilog;

namespace OpenWorkEngine.OpenController.Programs.Interfaces {
  public interface IProgramSource {
    string Name { get; }

    ProgramSyntax Syntax { get; }
  }
}
