using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Settings.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Filesystem {
  public class ConfigFile : WatchedJsonFile<Settings.Models.OpenControllerSettings> {
    private readonly Settings.Models.OpenControllerSettings _settings = new ();

    public ConfigFile(ILogger logger) : base(logger, "./.makerverse") { }

    protected override void OnChanged(Settings.Models.OpenControllerSettings data) {
      base.OnChanged(data);
      // Log.Information("Users: {users}", Data.Users);
      // Log.Information("Commands: {@commands}", Data.Commands);
      // Log.Information("Workspaces: {@workspaces}", Data.Workspaces);
    }

    protected override Settings.Models.OpenControllerSettings Load(JObject obj) {
      _settings.LoadSettings(obj);
      return _settings;
    }
  }
}
