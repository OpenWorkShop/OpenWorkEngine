using OpenWorkEngine.OpenController.Programs.Interfaces;

namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineCommand : IProgramSource {
    public string Value { get; }
  }
}
