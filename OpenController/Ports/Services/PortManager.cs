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
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Ports.Enums;
using Serilog;

namespace OpenWorkEngine.OpenController.Ports.Services {
  public class PortManager : SubscriptionStateManager<PortTopic, SystemPort, PortState>, IDisposable {
    public override ILogger Log { get; }

    public SystemPort this[string portName] =>
      Map.TryGetValue(portName, out SystemPort? val) ? val : throw new ArgumentException($"Port missing: {portName}");

    // Once a port it detected via the scanner, it lives forever in memory.
    private readonly ConcurrentDictionary<string, SystemPort> _ports = new ();
    public ConcurrentDictionary<string, SystemPort> Map => _ports;

    private bool _isAlive = true;

    public ControllerManager Controllers { get; }

    // Work thread (background scanner)
    private async Task DoWorkAsync() {
      while (_isAlive) {
        await ScanPorts();
        // we can afford to delay a little on port scans.
        await Task.Delay(100);
      }
    }

    // Scan for port changes.
    private async Task ScanPorts() {
      List<string> ports = SerialPort.GetPortNames().Where(s => !string.IsNullOrWhiteSpace(s)).ToList();

      foreach (string name in _ports.Keys) {
        if (!ports.Contains(name) && _ports.TryGetValue(name, out SystemPort? port)) {
          // Port is not in the list any more, so it has been unplugged.
          await OnPortDisappeared(port);
        }
      }

      foreach (string name in ports) {
        _ports.AddOrUpdate(name, (p) => {
          // New port just appeared for the first time in this run of the app.
          SystemPort port = new SystemPort(p);
          OnPortAppeared(port);
          return port;
        }, (pn, port) => {
          // Port already existed, but it had been unplugged and is now available again.
          OnPortAppeared(port);
          return port;
        });
      }
    }

    private async Task OnPortDisappeared(SystemPort port) {
      if (port.State == PortState.Unplugged) return;
      await Controllers.Close(port);
      port.State = PortState.Unplugged;
      Log.Information("[PORTS--] {name}", port.PortName);
      GetSubscriptionTopic(PortTopic.State).Emit(port);
    }

    private void OnPortAppeared(SystemPort port) {
      if (port.State != PortState.Unplugged) return;
      port.State = PortState.Ready;
      Log.Information("[PORTS++] {name}", port.PortName);
      GetSubscriptionTopic(PortTopic.State).Emit(port);
    }

    public ConnectedPort GetConnection(string portName) {
      return this[portName].Connection ?? throw new ArgumentException($"Port not open: {portName}");
    }

    internal PortManager(ControllerManager controllers) {
      Log = controllers.Log.ForContext(typeof(PortManager));
      Controllers = controllers;
      ScanPorts().Wait(); // Run once on the main thread to ensure loaded before other classes try to use data.
      Task.Run(DoWorkAsync);
    }

    public void Dispose() {
      Log.Information("[DISPOSE] PortManager");
      _isAlive = false;
    }

    public override PortTopic StateTopic => PortTopic.State;
    protected override PortState ErrorState => PortState.Error;
  }
}
