using System;
using System.Collections.Generic;
using System.Threading;
using OpenWorkEngine.OpenController.Controllers;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Ports.Models {
  /// <summary>
  /// Wraps a system port. As soon as it is created, it opens the port.
  /// To close the port, dispose the object.
  /// </summary>
  public class ConnectedPort : IDisposable {
    public SystemPort Port { get; }

    internal ILogger Log { get; }

    // Controllers are internal concepts. The type is all that is exposed to the API.
    public MachineControllerType ControllerType { get; }

    // Bytes available to read, etc.
    public PortStatus Status { get; }

    // Machines represent the entirity of the state object. Their "business logic" lives in the Controller.
    public Machine Machine { get; }

    internal Controller Controller { get; }

    private bool _read = true;

    private readonly Thread _dispatchThread;

    public ConnectedPort(SystemPort port, MachineControllerType type) {
      _dispatchThread = new Thread(Read);
      if (!port.SerialPort.IsOpen) throw new ArgumentException("ConnectedPort() requires an open SerialPort.");

      Log = port.Log.ForContext("Open", true);
      Port = port;
      ControllerType = type;
      Status = new PortStatus(Port.SerialPort);
      Controller = Controller.Factory(type, this);
      Machine = new();
      _dispatchThread.Start();
    }

    private void Read() {
      while (_read) {
        try {
          if (Status.BytesToRead > 0) {
            Controller.ApplyPatchLine(Port.SerialPort.ReadLine());
          } else {
            Thread.Sleep(10);
          }
        } catch (TimeoutException e) {
          Log.Error(e, "Timeout");
        }
      }
    }

    public void Write(string text) => Port.SerialPort.Write(text);

    public void WriteLine(string line) => Port.SerialPort.WriteLine(line);

    public void Dispose() {
      _read = false;
      while (_dispatchThread.IsAlive) {
        Log.Debug("Waiting for dispatch thread to complete...");
        Thread.Sleep(100);
      }
    }
  }
}
