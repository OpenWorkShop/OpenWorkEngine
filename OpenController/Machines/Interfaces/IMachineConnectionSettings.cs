using OpenWorkEngine.OpenController.Ports.Interfaces;

namespace OpenWorkEngine.OpenController.Machines.Interfaces {
  public interface IMachineConnectionSettings {
    public string PortName { get; }

    public string? MachineProfileId { get; }

    public ISerialPortOptions ToSerialPortOptions();

    public IMachineFirmwareRequirement GetFirmwareRequirement();
  }
}
