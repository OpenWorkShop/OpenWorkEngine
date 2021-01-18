using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Grbl;
using OpenWorkEngine.OpenController.Controllers.Grbl.Maslow;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Interfaces;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Ports.Services;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Services {
  /// <summary>
  ///   Singleton DI service for creating/managing Controllers + Orchestrators.
  /// </summary>
  public class ControllerManager : SubscriptionManager<MachineTopic, ControlledMachine>, IDisposable {
    // internal ITopicEventSender Sender { get; }
    //
    public Controller this[string portName] =>
      _controllers.TryGetValue(portName, out Controller? val) ? val :
        throw new ArgumentException($"Controller missing: {portName}");

    // PortName -> Controller (one controller per port).
    private readonly ConcurrentDictionary<string, Controller> _controllers = new();

    public ControllerManager(ILogger logger) {
      Log = logger.ForContext("App", "OC").ForContext(typeof(ControllerManager));
      Ports = new PortManager(this);
    }

    public override ILogger Log { get; }

    public PortManager Ports { get; }

    public void Dispose() {
      List<Controller> controllers = _controllers.Values.ToList();
      _controllers.Clear();
      foreach (Controller controller in controllers) {
        ClosePort(controller.Connection.Port);
        controller.Dispose();
      }
    }

    private Controller Create(MachineControllerType type, ConnectedPort connection) {
      Controller? controller = null;

      if (type == MachineControllerType.Grbl)
        controller = new GrblController(this, connection);
      else if (type == MachineControllerType.Maslow)
        controller = new MaslowController(this, connection);
      else
        throw new ArgumentException($"Unsupported controller type: {type}");

      controller.StartTask();
      return controller;
    }

    public async Task<Controller> Open(
      IMachineConnectionSettings machine, bool reconnect = false
    ) {
      SystemPort systemPort = Ports[machine.PortName];
      ISerialPortOptions opts = machine.ToSerialPortOptions();
      bool optionsChanged = systemPort.ApplyPortOptions(opts);
      if (systemPort.SerialPort.IsOpen) {
        if (!optionsChanged && !reconnect && _controllers.TryGetValue(systemPort.PortName, out Controller? c)) {
          Log.Information("[OPEN] port was already open with the same options: {portName}", systemPort.PortName);
          if (systemPort.State == PortState.Error) Log.Error("[OPEN] System port has error: {@error}", systemPort.Error);
          return c;
        }
        await Close(systemPort);
      }
      try {
        // Send an "Opening" state and begin the actual attempt to open the port.
        Ports.EmitState(systemPort, PortState.Opening);

        // This synchronous core system function may throw exceptions.
        systemPort.SerialPort.Open();

        // Now wrap the systemPort with a ConnectedPort
        systemPort.Connection = new ConnectedPort(systemPort, machine);

        // And wrap the ConnectedPort with a controller
        IMachineFirmwareRequirement req = machine.GetFirmwareRequirement();
        MachineControllerType controllerType = req.ControllerType;
        return _controllers.AddOrUpdate(systemPort.PortName,
          v => Create(controllerType, systemPort.Connection),
          (k, v) => {
            if (v.ControllerType != controllerType || v.Connection != systemPort.Connection) // Updating an existng controller implies the connection was not closed correctly.
              throw new ArgumentException($"{systemPort.PortName} could not open because the last buffer was not closed.");
            // The controller exists, but a new client is connecting.
            return v;
          });
      } catch (Exception e) {
        // Any error: log it, notify subscribers.
        Log.Error(e, "Failed to open port {portName}", systemPort.PortName);
        try {
          // Just to be safe, do extra cleanup, analogous to the Close() method.
          systemPort.Connection = null;
          systemPort.SerialPort.Close();
          _controllers.TryRemove(systemPort.SerialPort.PortName, out Controller? controller);
          systemPort.Error = new AlertError(e);
          Ports.EmitState(systemPort, PortState.Error);
        } catch (Exception e2) {
          Log.Error(e2, "Fallback error handler failed!");
        }
        throw;
      }
    }

    private void ClosePort(SystemPort systemPort) {
      systemPort.Connection = null;
      if (systemPort.SerialPort.IsOpen) {
        systemPort.SerialPort.Close();
        Log.Information("[CLOSED] port: {portName}", systemPort.PortName);
      }
      systemPort.State = PortState.Ready;
    }

    public Task<SystemPort> Close(SystemPort systemPort) {
      if (_controllers.TryRemove(systemPort.PortName, out Controller? controller))
        controller.Dispose();
      else
        Log.Debug("[DISPOSE] no controller to close {portName}", systemPort.PortName);
      ClosePort(systemPort);
      Ports.EmitState(systemPort);
      return Task.FromResult(systemPort);
    }
  }
}
