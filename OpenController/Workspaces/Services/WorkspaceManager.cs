using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.Ports.Services;
using OpenWorkEngine.OpenController.Settings.Models;
using OpenWorkEngine.OpenController.Workspaces.Enums;
using OpenWorkEngine.OpenController.Workspaces.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Workspaces.Services {
  public class WorkspaceManager : SubscriptionStateManager<WorkspaceTopic, Workspace, WorkspaceState> {
    private readonly ConfigFile _configFile;

    private readonly OpenControllerSettings _openControllerSettings;

    private readonly ConcurrentDictionary<string, Workspace> _workspaces;

    public WorkspaceManager(
      ControllerManager controllerManager, ConfigFile settingsFile, ILogger log
    ) {
      Controllers = controllerManager;
      Ports = controllerManager.Ports;
      Log = log.ForContext(typeof(WorkspaceManager));

      _configFile = settingsFile;
      _openControllerSettings = settingsFile.Data ?? throw new ArgumentNullException(nameof(settingsFile));
      _workspaces = new ConcurrentDictionary<string, Workspace>(
        settingsFile.Data?
                    .Workspaces.Select(InitWorkspace)
                    .ToDictionary(ws => ws.Id, ws => ws) ?? new Dictionary<string, Workspace>());
    }

    public override ILogger Log { get; }

    public PortManager Ports { get; }

    private ControllerManager Controllers { get; }

    public Workspace this[string workspaceId] =>
      _workspaces.TryGetValue(workspaceId, out Workspace? val) ? val : throw new ArgumentException($"Workspace missing: {workspaceId}");

    private Dictionary<string, WorkspaceSettings> Settings =>
      _openControllerSettings.Workspaces.ToDictionary(ws => ws.Id, ws => ws);

    public override WorkspaceTopic StateTopic => WorkspaceTopic.State;
    protected override WorkspaceState ErrorState => WorkspaceState.Error;

    public List<Workspace> ToList() => _workspaces.Values.ToList();

    // This is not a "create" per se; it is an internal model tracker, not a creation of a new workspace.
    private Workspace InitWorkspace(WorkspaceSettings wss) {
      Workspace ws = new(this, wss);
      Log.Debug("[WORKSPACE] init {workspace}", ws.ToString());
      return ws;
    }

    public async Task<Workspace> ChangePort(string workspaceId, string portName) {
      Workspace workspace = this[workspaceId];
      await workspace.ChangePort(portName); // throw if missing.

      // Successfully changed listeners. Update settings.
      _configFile.Save();

      Log.Debug("[WORKSPACE] changed port", workspace.ToString());

      return workspace;
    }

    // Inform the in-memory Workspace object it has a settings change.
    private Workspace UpdateWorkspaceSettings(Workspace ws, WorkspaceSettings wss) {
      ws.Settings = wss;
      Log.Debug("[WORKSPACE] updated {workspace}", ws.ToString());
      return ws;
    }

    // Update the settings file with the new workspace settings and get the in-memory Workspace object.
    private Workspace UpsertWorkspaceSettings(WorkspaceSettings wss) {
      Dictionary<string, WorkspaceSettings> map = Settings;
      if (map.ContainsKey(wss.Id))
        map[wss.Id] = wss;
      else
        map.Add(wss.Id, wss);
      _openControllerSettings.Workspaces = map.Values.ToList();
      _configFile.Save();

      // Create or update the workspace and immediately broadcast its state.
      return EmitState(_workspaces.AddOrUpdate(
        wss.Id,
        wsId => InitWorkspace(wss),
        (wsId, existingState) => UpdateWorkspaceSettings(existingState, wss)
      ));
    }

    // General CRUD
    internal Workspace Create(WorkspaceSettings wss) {
      if (Settings.ContainsKey(wss.Id)) throw new DuplicateNameException($"{wss.Id} already exists");
      return UpsertWorkspaceSettings(wss);
    }

    // General CRUD
    internal Workspace Update(WorkspaceSettings wss) {
      if (!Settings.ContainsKey(wss.Id)) throw new KeyNotFoundException($"{wss.Id} does not exist");
      return UpsertWorkspaceSettings(wss);
    }

    // General CRUD
    internal Workspace Delete(string workspaceId) {
      if (!_workspaces.TryRemove(workspaceId, out Workspace? ws)) throw new KeyNotFoundException($"{workspaceId}'s workspace did not exist");
      EmitState(ws, WorkspaceState.Deleted);

      Dictionary<string, WorkspaceSettings> map = Settings;
      if (!map.ContainsKey(workspaceId)) throw new KeyNotFoundException($"{workspaceId}'s settings did not exist");
      map.Remove(workspaceId);

      _openControllerSettings.Workspaces = map.Values.ToList();
      _configFile.Save();
      ws.Dispose();
      return ws;
    }
  }
}
