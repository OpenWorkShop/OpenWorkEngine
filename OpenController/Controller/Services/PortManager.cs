using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using OpenWorkEngine.OpenController.Controller.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Controller.Services {
  public class PortManager {
    private ILogger Log { get; }

    public SystemPort this[string portName] =>
      Map.TryGetValue(portName, out SystemPort? val) ? val : throw new ArgumentException(portName);

    private readonly ConcurrentDictionary<string, SystemPort> _ports = new ();
    public ConcurrentDictionary<string, SystemPort> Map => UpdatePorts();

    private ConcurrentDictionary<string, SystemPort> UpdatePorts() {
      List<string> ports = SerialPort.GetPortNames().ToList();

      foreach (string name in _ports.Keys) {
        if (!ports.Contains(name)) {
          _ports.Remove(name, out SystemPort? port);
          Log.Debug("Removed port: {name}", port?.PortName);
          port?.Dispose();
        }
      }

      foreach (string name in ports) {
        SystemPort port = _ports.GetOrAdd(name, (p) => new SystemPort(p));
        Log.Verbose("Updated port: {name}", port.PortName);
      }

      return _ports;
    }

    public PortManager(ILogger logger) {
      Log = logger.ForContext("Context", nameof(PortManager));
    }
  }
}
