using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils;
using OpenWorkEngine.OpenController.Lib.Graphql;

namespace OpenWorkEngine.OpenController.Machines.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Mutation)]
  public class MachinesMutation {
    [AuthorizeWriteControllers]
    public Commands CommandMachine([Service] ControllerManager controllers, string portName)
      => controllers[portName].Commands;
  }
}
