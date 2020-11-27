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
    public async Task<SystemPort> OpenPort(
      [Service] PortManager ports, [Service] ITopicEventSender sender,
      string portName, MachineControllerType controllerType, SerialPortOptions options
    ) {
      SystemPort port = ports[portName];
      port.Open(controllerType, options);
      await sender.OnPortStatus(portName);
      return port;
    }

    [AuthorizeWriteControllers]
    public async Task<SystemPort> ClosePort(
      [Service] PortManager ports, [Service] ITopicEventSender sender,
      string portName, MachineControllerType controllerType, SerialPortOptions options
    ) {
      SystemPort port = ports[portName];
      port.Close();
      await sender.OnPortStatus(portName);
      return port;
    }
  }
}
