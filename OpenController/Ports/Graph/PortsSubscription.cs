using System;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Ports.Services;

namespace OpenWorkEngine.OpenController.Ports.Graph {
  [ExtendObjectType(Name = "Subscription")]
  public class PortsSubscription {
    [Subscribe]
    [Topic]
    [AuthorizeReadControllers]
    public Task<SystemPort> OnPortStatus([EventMessage] string portName, [Service] PortManager ports) {
      ports.Log.Information("Subscription port: {name}", portName);
      return Task.FromResult(ports[portName]);
    }
  }
}
