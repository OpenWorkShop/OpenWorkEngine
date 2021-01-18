using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Syntax;

namespace OpenWorkEngine.OpenController.Workspaces.Models {
  [AuthorizeOpenControllerUser]
  public class MachineCommandSettings : IMachineCommand, ILoadSettingsObject {
    [JsonProperty("id")] public string Id { get; set; } = default!;

    public void LoadSettings(JObject obj) {
      JsonConvert.PopulateObject(JsonConvert.SerializeObject(obj), this);
    }

    [JsonProperty("name")] public string Name { get; set; } = default!;

    [JsonProperty("value")] public string Value { get; set; } = default!;

    public ProgramSyntax Syntax { get; internal set; } = ProgramSyntax.GCode;
  }
}
