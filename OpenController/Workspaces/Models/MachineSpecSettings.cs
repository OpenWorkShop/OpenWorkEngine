using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;

namespace OpenWorkEngine.OpenController.Workspaces.Models {
  [AuthorizeOpenControllerUser]
  public class MachineSpecSettings : IMachineSpec, ILoadSettingsObject {
    [JsonProperty("id")] public string Id { get; set; } = default!;

    public void LoadSettings(JObject obj) {
      // JsonConvert.PopulateObject(JsonConvert.SerializeObject(obj), this);
      this.AssignScalarValue<string>(obj, "id", v => Id = v);
      this.AssignScalarValue<decimal>(obj, "value", v => Value = v);
      this.AssignScalarValue<string>(obj, "specType", AssignSpecType);
    }

    private void AssignSpecType(string val) {
      // handle legacy MAX_AMPS, etc.
      val = val.Replace("_", "");
      SpecType = Enum.Parse<MachineSpecType>(val, true);
    }

    [JsonProperty("specType")]
    [JsonConverter(typeof(StringEnumConverter))]
    public MachineSpecType SpecType { get; set; }

    [JsonProperty("value")] public decimal Value { get; set; }
  }
}
