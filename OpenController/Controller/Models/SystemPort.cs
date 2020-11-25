using System;
using System.IO.Ports;
using Serilog;
using Serilog.Core;

namespace OpenWorkEngine.OpenController.Controller.Models {
  /// High-order wrapper around a SerialPort, so that it may be represented in the closed state.
  public class SystemPort : IDisposable {
    private ILogger Log { get; }

    public string PortName { get; set; } = default!;

    public bool IsOpen => Connection?.State.IsOpen ?? false;

    public PortConnection? Connection { get; private set; }

    public SystemPort(string portName) {
      PortName = portName;
      Log = Serilog.Log.Logger.ForContext("port", PortName);
    }

    public void Open(ISerialPortOptions opts) {
      if (IsOpen) {
        Close();
      }
      try {
        Connection = new PortConnection(this, opts, Log);
        Log.Information("Opened Port: {portName}", PortName);
      } catch (Exception e) {
        Log.Error(e, "Failed to open port {portName}", PortName);
      }
    }

    public void Close() {
      if (Connection == null) return;
      Connection?.Dispose();
      Connection = null;
      Log.Information("Closed Port: {portName}", PortName);
    }

    public void Dispose() {
      Close();
    }
  }
}
