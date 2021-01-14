using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Machines.Messages;
using OpenWorkEngine.OpenController.Ports.Messages;
using OpenWorkEngine.OpenController.Ports.Models;

namespace OpenWorkEngine.OpenController.Ports.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Mutation)]
  public class PortsMutation {
    [AuthorizeWriteControllers]
    public async Task<SystemPort> OpenPort(
      [Service] ControllerManager controllers, string portName, FirmwareRequirement firmware, SerialPortOptions options
    ) => (await controllers.Open(
      new MachineConnectionOptions(portName, options, firmware)
    )).Connection.Port;

    [AuthorizeWriteControllers]
    public Task<SystemPort> ClosePort([Service] ControllerManager controllers, string portName) =>
      controllers.Close(controllers.Ports[portName]);
  }
}
