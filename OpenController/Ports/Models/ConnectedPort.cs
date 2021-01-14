using System;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Ports.Models {
  /// <summary>
  ///   Wraps a system port. As soon as it is created, it opens the port.
  ///   To close the port, dispose the object.
  /// </summary>
  public class ConnectedPort {
    public ConnectedPort(SystemPort port, IMachineConnectionSettings machineOpts) {
      if (!port.SerialPort.IsOpen) throw new ArgumentException("ConnectedPort() requires an open SerialPort.");

      CreatedAt = DateTime.Now;
      Log = port.Log.ForContext("ConnectedPort", port.PortName);
      Port = port;
      Status = new PortStatus(Port.SerialPort);
      Machine = new ControlledMachine(port.PortName, machineOpts, Log);
    }

    public DateTime CreatedAt { get; }

    public SystemPort Port { get; }

    internal ILogger Log { get; }

    // Bytes available to read, etc.
    public PortStatus Status { get; }

    // Machines represent the entirity of the state object. Their "business logic" lives in the Controller.
    public ControlledMachine Machine { get; }

    public override string ToString() => $"[{Port.PortName}] [{Status}]";
  }
}
