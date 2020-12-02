using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Subscriptions;
using OpenWorkEngine.OpenController.Controllers.Grbl;
using OpenWorkEngine.OpenController.Controllers.Grbl.Maslow;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Extensions;
using OpenWorkEngine.OpenController.Ports.Interfaces;
using OpenWorkEngine.OpenController.Ports.Messages;
using OpenWorkEngine.OpenController.Ports.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Services {
  public class ControllerManager {
    internal ILogger Log { get; }

    internal ITopicEventSender Sender { get; }

    private readonly ConcurrentDictionary<string, Controller> _controllers = new();

    public ValueTask BroadcastPortState(SystemPort port, PortState? state = null) {
      if (state.HasValue) {
        if (state.Value < port.State) {
          if (state.Value != PortState.Error && state.Value != PortState.Ready) {
            throw new ArgumentException($"Cannot go back from {port.State} to {state.Value}");
          }
        }
        if (state.Value != port.State) {
          Log.Debug("[STATE] {state}: {port}", state.Value, port.ToString());
        }
        port.State = state.Value;
        if (port.State != PortState.Error) {
          port.Error = null;
        }
      }
      return Sender.OnPortStatus(port);
    }

    private Controller Create(MachineControllerType type, ConnectedPort connection) {
      if (type == MachineControllerType.Grbl) return new GrblController(this, connection);
      if (type == MachineControllerType.Maslow) return new MaslowController(this, connection);

      throw new ArgumentException($"Unsupported controller type: {type}");
    }

    public async Task<SystemPort> Open(
      string friendlyName, FirmwareRequirement firmware, SystemPort systemPort,
      ISerialPortOptions opts, bool reconnect = false
    ) {
      bool optionsChanged = systemPort.ApplyPortOptions(opts);
      if (systemPort.SerialPort.IsOpen) {
        if (!optionsChanged && !reconnect) {
          Log.Information("[OPEN] port was already open with the same options: {portName}", systemPort.PortName);
          return systemPort;
        }
        await Close(systemPort);
      }
      try {
        // Send an "Opening" state and begin the actual attempt to open the port.
        await BroadcastPortState(systemPort, PortState.Opening);

        // This synchronous core system function may throw exceptions.
        systemPort.SerialPort.Open();

        // If no exception thrown, now create a ConnectedPort and SerialBuffer
        systemPort.Connection = new ConnectedPort(friendlyName, systemPort, firmware);
        _controllers.AddOrUpdate(systemPort.PortName,
          (v) => Create(firmware.ControllerType, systemPort.Connection),
          (k, v) => {
            if (v.ControllerType != firmware.ControllerType || v.Connection != systemPort.Connection) {
              // Updating an existng controller implies the connection was not closed correctly.
              throw new ArgumentException($"{systemPort.PortName} could not open because the last buffer was not closed.");
            }
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
          systemPort.Error = new PortError() {Name = GetConnectionErrorName(e), Message = e.Message};
          await BroadcastPortState(systemPort, PortState.Error);
        } catch (Exception e2) {
          Log.Error(e2, "Fallback error handler failed!");
        }
      }
      return systemPort;
    }

    private string GetConnectionErrorName(Exception e) {
      if (e.GetType() != typeof(UnauthorizedAccessException)) return e.GetType().Name;
      Exception? inner = e.InnerException;
      if (inner == null || inner.GetType() != typeof(IOException)) return "Unable to access port";

      if (inner.Message.Equals("Resource busy")) return "This port is already in-use.";
      return inner.Message;

      // System.UnauthorizedAccessException: Access to the port '/dev/tty.AirPods-WirelessiAP' is denied.
      //   ---> System.IO.IOException: Resource busy

    }

    public async Task<SystemPort> Close(SystemPort systemPort) {
      systemPort.Connection = null;
      if (systemPort.SerialPort.IsOpen) {
        systemPort.SerialPort.Close();
        Log.Information("[CLOSED] port: {portName}", systemPort.PortName);
      }
      if (_controllers.TryRemove(systemPort.PortName, out Controller? controller)) {
        controller.Dispose();
      } else {
        Log.Error("There was no controller for {portName}", systemPort.PortName);
      }
      systemPort.State = PortState.Ready;
      await Sender.OnPortStatus(systemPort);
      return systemPort;
    }


    public ControllerManager(ITopicEventSender sender, ILogger logger) {
      Log = logger.ForContext("App", "OC").ForContext(typeof(ControllerManager));
      Sender = sender;
    }
  }
}
