using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading;
using OpenWorkEngine.OpenController.Controllers;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Machines.Observables;
using OpenWorkEngine.OpenController.Ports.Messages;
using Serilog;

namespace OpenWorkEngine.OpenController.Ports.Models {
  /// <summary>
  /// Wraps a system port. As soon as it is created, it opens the port.
  /// To close the port, dispose the object.
  /// </summary>
  public class ConnectedPort {
    // User-assigned
    public string FriendlyName { get; }

    public DateTime CreatedAt { get; }

    public SystemPort Port { get; }

    internal ILogger Log { get; }

    // Controllers are internal concepts. The type is all that is exposed to the API.
    public FirmwareRequirement FirmwareRequirement { get; }

    // Bytes available to read, etc.
    public PortStatus Status { get; }

    // Machines represent the entirity of the state object. Their "business logic" lives in the Controller.
    public Machine Machine { get; }

    public ConnectedPort(string friendlyName, SystemPort port, FirmwareRequirement firmwareRequirement) {
      if (!port.SerialPort.IsOpen) throw new ArgumentException("ConnectedPort() requires an open SerialPort.");

      FriendlyName = friendlyName;
      CreatedAt = DateTime.Now;
      Log = port.Log.ForContext("ConnectedPort", friendlyName);
      Port = port;
      FirmwareRequirement = firmwareRequirement;
      Status = new PortStatus(Port.SerialPort);
      Machine = new(Log);
    }

    public override string ToString() => $"[{FriendlyName}] [{Port.PortName}] [{Status}]";
  }
}
