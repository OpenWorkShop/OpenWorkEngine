using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  public abstract class Parser {
    // If controller not provided, no broadcast to subscription topic happens.
    public abstract Task<bool> UpdateMachine(Controller? controller, ControlledMachine machine, string line);
  }
}
