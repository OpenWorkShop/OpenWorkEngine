using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Grbl.Parsers;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Syntax.GCode;

namespace OpenWorkEngine.OpenController.Controllers.Grbl {
  public class GrblController : Controller {
    private GrblCommands? _grblCommands;
    internal override Commands Commands => _grblCommands ??= new GrblCommands(this);

    public GrblController(ControllerManager controllerManager, ConnectedPort connection) : base(controllerManager, connection) {
      Parsers.AddGrblParsers();
    }

    public override MachineControllerType ControllerType => MachineControllerType.Grbl;

    protected override Task OnStartupComplete() {
      Polls.Clear();
      Polls.Add(new StatusPoll(this, Commands.GetStatus, new GrblStatusParser()));
      Polls.Add(new StatusPoll(this, Commands.GetConfiguration, new GrblConfigParser(), 10000, 10000));
      return Task.CompletedTask;
    }
  }
}
