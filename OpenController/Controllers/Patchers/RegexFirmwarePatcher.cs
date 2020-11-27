using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Messages;

namespace OpenWorkEngine.OpenController.Controllers.Patchers {
  public class RegexFirmwarePatcher : IParseMachinePatches {

    public MachinePatch ParsePortConnectionPatch(string line) {
      return new MachinePatch();
    }
  }
}
