using OpenWorkEngine.OpenController.Controllers.Patchers;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Ports.Models;

namespace OpenWorkEngine.OpenController.Controllers.Implementations.Grbl {
  public class GrblController : Controller {
    public override MachineControllerType ControllerType => MachineControllerType.Grbl;

    public override IParseMachinePatches FirmwarePatcher => new RegexFirmwarePatcher();

    public GrblController(ConnectedPort connectedPort) : base(connectedPort) { }
  }
}
