using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Ports.Models;

namespace OpenWorkEngine.OpenController.Controllers.Grbl {
  public class GrblController : Controller {
    public override MachineControllerType ControllerType => MachineControllerType.Grbl;

    protected override async Task RunStartupCommands() {
      await Commander.Command(MachineCommandType.GetSettings);
      await Commander.Command(MachineCommandType.GetFirmware);
    }

    protected override Task ParseLine(string line) {
      return Task.CompletedTask;
    }

    public GrblController(ControllerManager manager, ConnectedPort connection) : base(manager, connection) {
      Parsers.AddGrblParsers();
      Commander.AddGrblCommands();
    }
  }
}
