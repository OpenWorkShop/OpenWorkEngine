using OpenWorkEngine.OpenController.Machines.Interfaces;

namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineFirmware : IMachineFirmwareRequirement {
    public bool Rtscts { get; }

    public int BaudRateValue { get; }
  }
}
