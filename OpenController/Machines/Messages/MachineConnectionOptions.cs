using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Ports.Interfaces;
using OpenWorkEngine.OpenController.Ports.Messages;

namespace OpenWorkEngine.OpenController.Machines.Messages {
  public class MachineConnectionOptions : IMachineConnectionSettings {
    public string PortName { get; } = default!;

    public string? MachineProfileId => null;

    private SerialPortOptions _opts;
    public ISerialPortOptions ToSerialPortOptions() => _opts;

    private FirmwareRequirement _req;
    public IMachineFirmwareRequirement GetFirmwareRequirement() => _req;

    public MachineConnectionOptions(string portName, SerialPortOptions opts, FirmwareRequirement req) {
      _opts = opts;
      _req = req;
      PortName = portName;
    }
  }
}
