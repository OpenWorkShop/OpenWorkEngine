using Newtonsoft.Json.Linq;

namespace OpenWorkEngine.OpenController.Lib.Filesystem {
  public interface ILoadSettingsObject {
    void LoadSettings(JObject obj);
  }
}
