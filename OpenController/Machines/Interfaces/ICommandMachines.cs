using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Interfaces {
  public interface ICommandMachines {
    public Task Command(MachineCommandType type);
  }
}
