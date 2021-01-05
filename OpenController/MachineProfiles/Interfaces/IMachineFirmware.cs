using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;

namespace OpenWorkEngine.OpenController.MachineProfiles.Interfaces {
  public interface IMachineFirmware : IMachineFirmwareRequirement {
    public bool Rtscts { get; }

    public int BaudRateValue { get; }
  }
}
