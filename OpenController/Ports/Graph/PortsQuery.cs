using System.Linq;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Ports.Services;

namespace OpenWorkEngine.OpenController.Ports.Graph {
  [ExtendObjectType(Name = "Query")]
  public class PortsQuery {
    [AuthorizeReadControllers]
    public SystemPort[] ListPorts([Service] PortManager ports) => ports.Map.Values.ToArray();

    [AuthorizeReadControllers]
    [GraphQLName("getPort")]
    public SystemPort GetPort([Service] PortManager ports, string portName) => ports.Map[portName];
  }
}
