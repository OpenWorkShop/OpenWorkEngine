using System;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Filesystem {
  public abstract class WatchedJsonFile<TJson> : IDisposable {
    private const string DefaultContents = "{}";

    private readonly string _path;

    private readonly FileSystemWatcher _watcher;

    private string? _lastContents;

    public WatchedJsonFile(ILogger logger, string path) {
      _path = path;
      Log = logger.ForContext("SettingsFile", path);

      _watcher = new FileSystemWatcher {
        Path = Path.GetDirectoryName(path) ?? throw new InvalidOperationException(),
        Filter = Path.GetFileName(path),
        NotifyFilter = NotifyFilters.LastAccess | NotifyFilters.LastWrite
      };

      // Add event handlers.
      _watcher.Changed += OnChanged;
      _watcher.Created += OnChanged;
      _watcher.Deleted += OnChanged;

      // Begin watching.
      _watcher.EnableRaisingEvents = true;

      Reload();
    }

    public TJson? Data { get; protected set; }

    internal ILogger Log { get; }

    public void Dispose() {
      _watcher.Dispose();
    }

    public void Save() {
      try {
        Log.Debug("Saving JSON file at {path}", _path);
        File.WriteAllText(_path, JsonConvert.SerializeObject(Data, Formatting.Indented));
      } catch (Exception e) {
        Log.Error(e, $"Failed to write config file: {_path}");
        throw new SystemException($"Failed to write config file: {_path}", e);
      }
    }

    protected virtual void OnChanged(TJson data) {
      Data = data;
      Log.Verbose("Loaded new {filename} data: {@data}", _path, Data);
    }

    protected abstract TJson Load(JObject obj);

    private void Reload() {
      string contents = DefaultContents;
      TJson? data;
      try {
        contents = File.Exists(_path) ? File.ReadAllText(_path) : "";
        contents = string.IsNullOrWhiteSpace(contents) ? "{}" : contents;
        data = Load(JsonConvert.DeserializeObject<JObject>(contents));
      } catch (Exception e) {
        Log.Error(e, $"Failed to read {_path}");
        return;
      }

      if (_lastContents != null && contents.Equals(_lastContents)) return;

      _lastContents = contents;
      OnChanged(data);
    }

    private void OnChanged(object source, FileSystemEventArgs e) {
      Reload();
    }

    public override string ToString() => $"{_path} [{_lastContents?.Length ?? -1}]";
  }
}
