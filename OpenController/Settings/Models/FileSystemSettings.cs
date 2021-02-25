using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Graphql;

namespace OpenWorkEngine.OpenController.Settings.Models {
  [AuthorizeOpenControllerUser]
  public class FileSystemSettings : ILoadSettingsObject {
    public static string defaultCurrentDirectory = System.IO.Directory.GetCurrentDirectory();

    [JsonProperty("documentsDirectory")] public string? DocumentsDirectory { get; set; }

    public string ProgramsDirectory => Path.Join(DocumentsDirectory ?? defaultCurrentDirectory, "gcode");

    [JsonProperty("mountPoints")] public List<MountPointSettings> MountPoints { get; set; } = new();

    public void LoadSettings(JObject obj) {
      JsonConvert.PopulateObject(JsonConvert.SerializeObject(obj), this);
    }
  }
}
