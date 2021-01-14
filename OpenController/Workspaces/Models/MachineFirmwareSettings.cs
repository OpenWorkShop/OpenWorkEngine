using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;

namespace OpenWorkEngine.OpenController.Workspaces.Models {
  [AuthorizeOpenControllerUser]
  public class MachineFirmwareSettings : IMachineFirmware, ILoadSettingsObject {
    [JsonProperty("id")] public string? Id { get; set; }

    [JsonProperty("baudRate")] public BaudRate? BaudRate { get; set; }

    public void LoadSettings(JObject obj) {
      JsonConvert.PopulateObject(JsonConvert.SerializeObject(obj), this);
    }

    public int BaudRateValue {
      get => BaudRate == null ? 0 : (int) BaudRate;
      set => BaudRate = (BaudRate) value;
    }

    [JsonProperty("controllerType")]
    [JsonConverter(typeof(StringEnumConverter))]
    public MachineControllerType ControllerType { get; set; }

    [JsonProperty("name")] public string? Name { get; set; }

    [JsonProperty("edition")] public string? Edition { get; set; }

    [JsonProperty("rtscts")] public bool Rtscts { get; set; }

    [JsonProperty("requiredVersion")] public decimal RequiredVersion { get; set; }

    [JsonProperty("suggestedVersion")] public decimal SuggestedVersion { get; set; }

    [JsonProperty("downloadUrl")] public string? DownloadUrl { get; set; }

    [JsonProperty("helpUrl")] public string? HelpUrl { get; set; }
  }
}
