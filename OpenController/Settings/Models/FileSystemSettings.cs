using System.Collections.Generic;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Graphql;

namespace OpenWorkEngine.OpenController.Settings.Models {
  [AuthorizeOpenControllerUser]
  public class FileSystemSettings : ILoadSettingsObject {
    [JsonProperty("programDirectory")]
    public string ProgramDirectory { get; set; } = default!;

    [JsonProperty("mountPoints")]
    public List<MountPointSettings> MountPoints { get; set; } = new ();

    public void LoadSettings(JObject obj) {
      JsonConvert.PopulateObject(JsonConvert.SerializeObject(obj), this);
    }
  }
}
