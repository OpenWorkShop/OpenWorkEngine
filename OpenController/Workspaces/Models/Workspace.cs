using System;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Exceptions;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Ports.Services;
using OpenWorkEngine.OpenController.Syntax;
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

    private ILogger Log { get; }

    public void Dispose() {
      if (Controller != null) {
        Controller.OnCommandExecuted = null;
        Controller = null;
      }
      State = WorkspaceState.Closed;
      SetPortByName(null);
    }

    public void OnCompleted() { }
    public void OnError(Exception error) { }
    public void OnNext(SystemPort value) => UpdatePort(value);

    public string TopicId => Id;

    public AlertError? Error { get; set; }

    public WorkspaceState State { get; set; } = WorkspaceState.Closed;

    private Controller? Controller { get; set; }

    internal async Task<Workspace> Open() {
      if (State >= WorkspaceState.Active) {
        Log.Debug("[WORKSPACE] already active {workspace}", ToString());
        return this;
      }
      try {
        if (Port != null && Port.State != PortState.Ready) {
          Log.Debug("[WORKSPACE] closing port before opening...");
          await Manager.Ports.Controllers.Close(Port);
        }

        Log.Debug("[WORKSPACE] beginning port-open");
        Manager.EmitState(this, WorkspaceState.Opening);
        Log.Information("[WORKSPACE] opening: {workspace}", ToString());
        SystemPort? port = Port;
        if (port == null) throw new PortException($"Port is not plugged in: {PortName}", PortName);

        // Open the controller by converting internal settings into OpenController types.
        Controller = await Manager.Ports.Controllers.Open(Settings.Connection);
        Controller.OnCommandExecuted = OnCommandExecuted;
        Controller.StartTask();

        // Immediately update the port in case it was already open.
        UpdatePort(port);
      } catch (Exception e) {
        Log.Error(e, "[WORKSPACE] failed to open: {workspace}", ToString());
        Error = new AlertError(e);
        Manager.EmitState(this, WorkspaceState.Error);
      }
      return this;
    }

    internal async Task<MachineExecutionResult> OnCommandExecuted(string commandName, MachineExecutionResult res) {
      if (Controller == null) return res;
      if (commandName.Equals(nameof(Controller.Unlock))) {
        if (Settings.PreferImperial) {
          MachineExecutionResult r =
            await Controller.EnsureModalValue(res.Machine.Configuration.Modals.Units, UnitType.Imperial);
          res.InstructionResults.AddRange(r.InstructionResults);
        }
      }
      return res;
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
        if (st == PortState.Active) {
          Manager.EmitState(this, WorkspaceState.Active);
        }
        if (st == PortState.Error) {
          Error = port.Error ?? new AlertError(new PortException("Could not open port", port.PortName));
          Manager.EmitState(this, WorkspaceState.Error);
        }
      }
    }

    // Respond to ports appearing and disappearing by keeping the SystemPort up to date.
    private void UpdatePort(SystemPort? port) {
      bool hadPort = Port != null;
      bool hasPort = port != null;
      if (hadPort == hasPort && Port == port) {
        if (port != null) {
          Log.Debug("[WORKSPACE] update {port} [STATE] on {workspace}", port.ToString(), ToString());
          UpdatePortState(port);
        } else {
          Log.Debug("[WORKSPACE] port disconnected: {workspace}", ToString());
          Manager.EmitState(this, WorkspaceState.Disconnected);
        }
        return;
      }
      Log.Debug("[WORKSPACE] port changed from {oldPort} to {port} on {workspace}",
        Port?.ToString(), port?.ToString(), ToString());
      Port = port;
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
      SystemPort? port = Manager.Ports.TryGetPort(portName);
      _portListSubscription?.Dispose();
      _portListSubscription = null;

      if (portName != null) {
        _portListSubscription = Manager.Ports
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
