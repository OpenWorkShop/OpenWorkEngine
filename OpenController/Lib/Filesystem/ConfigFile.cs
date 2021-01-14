using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Settings.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Filesystem {
  public class ConfigFile : WatchedJsonFile<OpenControllerSettings> {
    private readonly OpenControllerSettings _settings = new();

    public ConfigFile(ILogger logger) : base(logger, "./.makerverse") { }

    protected override void OnChanged(OpenControllerSettings data) {
      base.OnChanged(data);
      // Log.Information("Users: {users}", Data.Users);
      // Log.Information("Commands: {@commands}", Data.Commands);
      // Log.Information("Workspaces: {@workspaces}", Data.Workspaces);
    }

    protected override OpenControllerSettings Load(JObject obj) {
      _settings.LoadSettings(obj);
      return _settings;
    }
  }
}
