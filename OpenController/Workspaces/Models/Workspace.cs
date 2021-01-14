using System;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Exceptions;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Ports.Services;
using OpenWorkEngine.OpenController.Workspaces.Enums;
using OpenWorkEngine.OpenController.Workspaces.Services;
using Serilog;

namespace OpenWorkEngine.OpenController.Workspaces.Models {
  /// <summary>
  ///   In-memory representation of a single workspace. Lives as long as the workspace itself exists.
  ///   Maintains subscriptions for
  /// </summary>
  public class Workspace : ITopicStateMessage<WorkspaceState>, IObserver<SystemPort>, IDisposable {
    //
    // Interfaces
    //

    private IDisposable? _portListSubscription;

    public Workspace(WorkspaceManager mgr, WorkspaceSettings settings) {
      Log = mgr.Log.ForContext("WorkspaceSettings", Settings).ForContext(GetType());
      Manager = mgr;
      Settings = settings;

      SetPortByName(Settings.Connection.PortName);
    }

    public string Id => Settings.Id;

    public string PortName => Settings.Connection.PortName;

    public SystemPort? Port { get; private set; }

    public WorkspaceSettings Settings { get; internal set; }

    private WorkspaceManager Manager { get; }

    public UnitType Units => GetUnits();

    private ILogger Log { get; }

    public void Dispose() {
      State = WorkspaceState.Closed;
      SetPortByName(null);
    }

    public void OnCompleted() { }
    public void OnError(Exception error) { }
    public void OnNext(SystemPort value) => UpdatePort(value);

    public string TopicId => Id;

    public AlertError? Error { get; set; }

    public WorkspaceState State { get; set; } = WorkspaceState.Closed;

    private UnitType GetUnits() {
      UnitType def = Settings.PreferImperial ? UnitType.Imperial : UnitType.Metric;
      UnitType movementUnits = Port?.Connection?.Machine.Configuration.Modals.Units ?? def;
      return movementUnits == UnitType.Imperial ? UnitType.Imperial : UnitType.Metric;
    }

    internal async Task<Workspace> Open() {
      if (State >= WorkspaceState.Active) {
        Log.Debug("[WORKSPACE] already active {workspace}", ToString());
        return this;
      }
      Log.Debug("[WORKSPACE] beginning port-open");
      try {
        Manager.EmitState(this, WorkspaceState.Opening);
        Log.Information("[WORKSPACE] opening: {workspace}", ToString());
        SystemPort? port = Port;
        if (port == null) throw new PortException($"Port is not plugged in: {PortName}", PortName);

        // Open the controller by converting internal settings into OpenController types.
        await Manager.Ports.Controllers.Open(Settings.Connection);

        // Immediately update the port in case it was already open.
        UpdatePort(port);
      } catch (Exception e) {
        Log.Error(e, "[WORKSPACE] failed to open: {workspace}", ToString());
        Error = new AlertError(e);
        Manager.EmitState(this, WorkspaceState.Error);
      }
      return this;
    }

    internal async Task<Workspace> Close() {
      Log.Debug("[WORKSPACE] Close: {workspace}", ToString());
      try {
        SystemPort port = Port ?? throw new ArgumentNullException(PortName);
        Manager.EmitState(this, WorkspaceState.Closed);
        await Manager.Ports.Controllers.Close(port);
      } catch (Exception e) {
        Log.Error(e, "[WORKSPACE] failed to close: {workspace}", ToString());
        Error = new AlertError(e);
        Manager.EmitState(this, WorkspaceState.Error);
      }
      return this;
    }

    private void UpdatePortState(SystemPort port) {
      PortState st = port.State;
      if (st == PortState.Unplugged) Manager.EmitState(this, WorkspaceState.Disconnected);
      if (st == PortState.Ready) Manager.EmitState(this, WorkspaceState.Closed);

      if (State == WorkspaceState.Opening) {
        if (st == PortState.Active) Manager.EmitState(this, WorkspaceState.Active);
        if (st == PortState.Error) {
          Error = port.Error ?? new AlertError(new PortException("Could not open port", port.PortName));
          Manager.EmitState(this, WorkspaceState.Error);
        }
      }
    }

    // Respond to ports appearing and disappearing by keeping the SystemPort up to date.
    private void UpdatePort(SystemPort? port) {
      Log.Debug("[WORKSPACE] update port {port} on {workspace}", port?.ToString(), ToString());
      bool hadPort = Port != null;
      bool hasPort = port != null;
      if (hadPort == hasPort && Port == port) {
        if (port != null)
          UpdatePortState(port);
        else
          Manager.EmitState(this, WorkspaceState.Disconnected);
        return;
      }
      Port = port;
      Log.Debug("[WORKSPACE] port updated: {workspace}", ToString());
      Manager.EmitState(this, hasPort ? WorkspaceState.Closed : WorkspaceState.Disconnected);
    }

    public async Task ChangePort(string portName) {
      if (State > WorkspaceState.Closed) await Close();
      Settings.Connection.PortName = portName;
      SetPortByName(portName, true);
      // Enforce state change propagation.
      await Open();
    }

    // Use any arbitrary port name to set the current port,
    private SystemPort? SetPortByName(string? portName, bool requirePort = false) {
      PortManager ports = Manager.Ports;
      SystemPort? port = null;
      _portListSubscription?.Dispose();
      _portListSubscription = null;

      if (portName != null) {
        if (ports.Map.TryGetValue(portName, out port))
          _portListSubscription = ports
                                 .GetSubscriptionTopic(PortTopic.State)
                                 .SubscribeToTopicId(portName, this);
      } else if (requirePort) {
        throw new ArgumentException($"Cannot change Workspace to use missing port: {portName}");
      }

      UpdatePort(port);
      return port;
    }

    public override string ToString() => $"{Settings.Name} [{State}] /workspaces/{Id}:{Port?.PortName}";
  }
}
