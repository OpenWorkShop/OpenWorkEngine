using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Ports.Services {
  public class PortManager : SubscriptionStateManager<PortTopic, SystemPort, PortState>, IDisposable {
    // Once a port it detected via the scanner, it lives forever in memory.

    private bool _isAlive = true;

    internal PortManager(ControllerManager controllers) {
      Log = controllers.Log.ForContext(typeof(PortManager));
      Controllers = controllers;
      ScanPorts().Wait(); // Run once on the main thread to ensure loaded before other classes try to use data.
      Task.Run(DoWorkAsync);
    }

    public override ILogger Log { get; }

    public SystemPort this[string portName] =>
      TryGetPort(portName) ?? throw new ArgumentException($"Port missing: {portName}");

    public SystemPort? TryGetPort(string? portName) =>
      (!string.IsNullOrEmpty(portName) && Map.TryGetValue(portName, out SystemPort? val)) ? val : null;

    public ConcurrentDictionary<string, SystemPort> Map { get; } = new();

    public ControllerManager Controllers { get; }

    public override PortTopic StateTopic => PortTopic.State;
    protected override PortState ErrorState => PortState.Error;

    public void Dispose() {
      Log.Information("[DISPOSE] PortManager");
      _isAlive = false;
    }

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

      foreach (string name in Map.Keys)
        if (!ports.Contains(name) && Map.TryGetValue(name, out SystemPort? port)) // Port is not in the list any more, so it has been unplugged.
          await OnPortDisappeared(port);

      foreach (string name in ports)
        Map.AddOrUpdate(name, p => {
          // New port just appeared for the first time in this run of the app.
          SystemPort port = new(p);
          OnPortAppeared(port);
          return port;
        }, (pn, port) => {
          // Port already existed, but it had been unplugged and is now available again.
          OnPortAppeared(port);
          return port;
        });
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

    public ConnectedPort GetConnection(string portName) => this[portName].Connection ?? throw new ArgumentException($"Port not open: {portName}");
  }
}
