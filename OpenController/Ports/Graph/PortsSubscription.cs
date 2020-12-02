using System;
using System.Collections.Generic;
using System.Linq;
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
    public Task<SystemPort> OnPortStatus([EventMessage] SystemPort port, [Service] PortManager ports) {
      ports.Log.Verbose("[PORT] [STATE] {portName}", port.State, port.PortName);
      return Task.FromResult(port);
    }

    [Subscribe]
    [Topic]
    [AuthorizeReadControllers]
    public Task<List<SystemPort>> OnPortList([EventMessage] List<SystemPort> portList, [Service] PortManager ports) {
      ports.Log.Information("[PORT] [LIST] {count}", ports.Map.Count);
      return Task.FromResult(portList);
    }
  }
}
