using OpenWorkEngine.OpenController.Machines.Messages;

namespace OpenWorkEngine.OpenController.Machines.Interfaces {
  public interface IParseMachinePatches {
    MachinePatch? ParsePortConnectionPatch(string line);
  }
}
