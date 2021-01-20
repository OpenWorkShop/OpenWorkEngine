using System.Collections.Generic;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  internal abstract class Parser {
    // If controller not provided, no broadcast to subscription topic happens.
    public abstract Task<HashSet<MachineTopic>?>
      UpdateMachine(Controller? controller, ControlledMachine machine, string line);
  }
}
