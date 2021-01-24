using System.Collections.Generic;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Services.Serial {
  internal abstract class Parser {
    // If controller not provided, no broadcast to subscription topic happens.
    public abstract Task<MachineOutputLine> UpdateMachine(MachineOutputLine line);
  }
}
