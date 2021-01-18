using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Programs.Interfaces;
using OpenWorkEngine.OpenController.Syntax;

namespace OpenWorkEngine.OpenController.Controllers.Utils {
  public class ControllerCommand : IMachineCommand {
    public string Name { get; }

    public ProgramSyntax Syntax => ProgramSyntax.GCode;

    public string Value { get; }

    public ControllerCommand(string name, string value) {
      Name = name;
      Value = value;
    }
  }
}
