using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Graph;
using OpenWorkEngine.OpenController.Ports.Extensions;
using OpenWorkEngine.OpenController.Ports.Messages;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Ports.Services;

namespace OpenWorkEngine.OpenController.Ports.Graph {
  [ExtendObjectType(Name = "Mutation")]
  public class PortsMutation {
    [AuthorizeWriteControllers]
    public Task<SystemPort> OpenPort(
      [Service] PortManager ports,
      string friendlyName, string portName, FirmwareRequirement firmware, SerialPortOptions options
    )  => ports.Controllers.Open(friendlyName, firmware, ports[portName], options);

    [AuthorizeWriteControllers]
    public Task<SystemPort> ClosePort([Service] PortManager ports, string portName) =>
      ports.Controllers.Close(ports[portName]);
  }
}
