using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Ports.Interfaces;
using OpenWorkEngine.OpenController.Ports.Messages;
using OpenWorkEngine.OpenController.Workspaces.Models;

namespace OpenWorkEngine.OpenController.Settings.Models {
  [AuthorizeOpenControllerUser]
  public class ConnectionSettings : IMachineConnectionSettings, ILoadSettingsObject {
    [JsonProperty("manufacturer")] public string? Manufacturer { get; set; }

    [JsonProperty("firmware")] public MachineFirmwareSettings Firmware { get; set; } = new();

    public void LoadSettings(JObject obj) {
      JsonConvert.PopulateObject(JsonConvert.SerializeObject(obj), this);
    }

    [JsonProperty("port")] public string PortName { get; set; } = default!;

    public string? MachineProfileId { get; internal set; }

    public IMachineFirmwareRequirement GetFirmwareRequirement() => Firmware;

    public ISerialPortOptions ToSerialPortOptions() => new SerialPortOptions {
      BaudRate = Firmware.BaudRateValue,
      RtsEnable = Firmware.Rtscts
    };
  }
}
