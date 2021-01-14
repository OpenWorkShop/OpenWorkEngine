using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Ports.Interfaces;
using OpenWorkEngine.OpenController.Ports.Messages;

namespace OpenWorkEngine.OpenController.Machines.Messages {
  public class MachineConnectionOptions : IMachineConnectionSettings {
    private readonly SerialPortOptions _opts;

    private readonly FirmwareRequirement _req;

    public MachineConnectionOptions(string portName, SerialPortOptions opts, FirmwareRequirement req) {
      _opts = opts;
      _req = req;
      PortName = portName;
    }

    public string PortName { get; } = default!;

    public string? MachineProfileId => null;
    public ISerialPortOptions ToSerialPortOptions() => _opts;
    public IMachineFirmwareRequirement GetFirmwareRequirement() => _req;
  }
}
