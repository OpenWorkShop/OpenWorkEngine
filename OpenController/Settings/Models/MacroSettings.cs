using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Graphql;

namespace OpenWorkEngine.OpenController.Settings.Models {
  [AuthorizeOpenControllerUser]
  public class MacroSettings : ILoadSettingsObject {
    [JsonProperty("id")] public string Id { get; set; } = default!;

    [JsonProperty("mtime")] public long Mtime { get; set; }

    [JsonProperty("name")] public string Name { get; set; } = default!;

    [JsonProperty("content")] public string Content { get; set; } = default!;

    public void LoadSettings(JObject obj) {
      JsonConvert.PopulateObject(JsonConvert.SerializeObject(obj), this);
    }
  }
}
