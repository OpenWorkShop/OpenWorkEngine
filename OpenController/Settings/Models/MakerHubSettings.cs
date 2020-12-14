using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Graphql;

namespace OpenWorkEngine.OpenController.Settings.Models {
  [AuthorizeOpenControllerUser]
  public class MakerHubSettings : ILoadSettingsObject {
    [JsonProperty("enabled")]
    public bool Enabled { get; set; }

    public void LoadSettings(JObject obj) {
      JsonConvert.PopulateObject(JsonConvert.SerializeObject(obj), this);
    }
  }
}
