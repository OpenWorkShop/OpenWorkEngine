using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Subscriptions;
using OpenWorkEngine.OpenController.Ports.Extensions;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Controllers.Services;
using Serilog;

namespace OpenWorkEngine.OpenController.Ports.Services {
  public class PortManager : IDisposable {
    internal ILogger Log { get; }

    internal ITopicEventSender Sender { get; }

    public SystemPort this[string portName] =>
      Map.TryGetValue(portName, out SystemPort? val) ? val : throw new ArgumentException($"Port missing: {portName}");

    private readonly ConcurrentDictionary<string, SystemPort> _ports = new ();
    public ConcurrentDictionary<string, SystemPort> Map => _ports;

    private bool _isAlive = true;

    private bool _hasChanges = false;

    private DateTime _lastDispatch = DateTime.Now;

    internal ControllerManager Controllers { get; }

    // Work thread (background scanner)
    private async Task DoWorkAsync() {
      while (_isAlive) {
        bool changed = await ScanPorts();
        _hasChanges = changed || _hasChanges;
        await Dispatch();
      }
    }

    // Scan
    private async Task<bool> ScanPorts() {
      List<string> ports = SerialPort.GetPortNames().Where(s => !string.IsNullOrWhiteSpace(s)).ToList();
      bool changed = false;

      foreach (string name in _ports.Keys) {
        if (!ports.Contains(name)) {
          _ports.Remove(name, out SystemPort? port);
          if (port != null) {
            OnPortDisappeared(port);
            await Controllers.Close(port);
            changed = true;
          }
        }
      }

      foreach (string name in ports) {
        _ports.GetOrAdd(name, (p) => {
          changed = true;
          SystemPort port = new SystemPort(p);
          OnPortAppeared(port);
          return port;
        });
      }

      return changed;
    }

    private void OnPortDisappeared(SystemPort port) {
      Log.Debug("[PORTS--] {name}", port.PortName);
    }

    private void OnPortAppeared(SystemPort port) {
      Log.Debug("[PORTS++] {name}", port.PortName);
    }

    // Dispatch changes to the port list in a batched manner to avoid message overload
    private async Task Dispatch() {
      if (!_hasChanges) {
        return;
      }
      DateTime now = DateTime.Now;
      TimeSpan elapsed = now - _lastDispatch;
      if (elapsed.Milliseconds < 1000) {
        return;
      }
      await Sender.OnPortList(_ports.Values.ToList());
      _lastDispatch = DateTime.Now;
    }

    public ConnectedPort GetConnection(string portName) {
      return this[portName].Connection ?? throw new ArgumentException($"Port not open: {portName}");
    }

    public PortManager(ITopicEventSender sender, ControllerManager controllerManager) {
      Log = controllerManager.Log.ForContext(typeof(PortManager));
      Controllers = controllerManager;

      Sender = sender;
      Task.Run(DoWorkAsync);
    }

    public void Dispose() {
      Log.Information("[DISPOSE] PortManager");
      _isAlive = false;
    }
  }
}
