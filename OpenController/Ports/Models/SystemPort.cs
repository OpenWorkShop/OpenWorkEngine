using System;
using System.IO.Ports;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Ports.Interfaces;
using Serilog;

namespace OpenWorkEngine.OpenController.Ports.Models {
  /// High-order wrapper around a SerialPort, so that it may be represented in the closed state.
  public class SystemPort : IDisposable {
    internal ILogger Log { get; }

    public string PortName { get; set; } = default!;

    public PortOptions Options { get; }

    // The presence of a connection object implies that it is connected (open).
    public ConnectedPort? Connection { get; private set; }

    internal SerialPort SerialPort { get; }

    public SystemPort(string portName) {
      PortName = portName;
      Log = Serilog.Log.Logger.ForContext("Port", PortName);

      SerialPort = new SerialPort(portName);
      Options = new(SerialPort);
    }

    private void ApplyPortOptions(ISerialPortOptions opts) {
      SerialPort.BaudRate = opts.BaudRate;
      if (opts.Parity != null) SerialPort.Parity = opts.Parity.Value;
      if (opts.DataBits != null) SerialPort.DataBits = opts.DataBits.Value;
      if (opts.StopBits != null) SerialPort.StopBits = opts.StopBits.Value;
      if (opts.Handshake != null) SerialPort.Handshake = opts.Handshake.Value;
      if (opts.ReadBufferSize != null) SerialPort.ReadBufferSize = opts.ReadBufferSize.Value;
      if (opts.WriteBufferSize != null) SerialPort.WriteBufferSize = opts.WriteBufferSize.Value;
      if (opts.RtsEnable != null) SerialPort.RtsEnable = opts.RtsEnable.Value;
      if (opts.ReadTimeout != null) SerialPort.ReadTimeout = opts.ReadTimeout.Value;
      if (opts.WriteTimeout != null) SerialPort.WriteTimeout = opts.WriteTimeout.Value;
    }

    public void Open(MachineControllerType controllerType, ISerialPortOptions opts) {
      if (SerialPort.IsOpen) {
        Close();
      }
      try {
        ApplyPortOptions(opts);
        SerialPort.Open();
        Connection = new ConnectedPort(this, controllerType);
        Log.Information("[OPENED] port: {portName}", PortName);
      } catch (Exception e) {
        Log.Error(e, "Failed to open port {portName}", PortName);
      }
    }

    public void Close() {
      Connection?.Dispose();
      Connection = null;
      if (SerialPort.IsOpen) {
        SerialPort.Close();
        Log.Information("[CLOSED] port: {portName}", PortName);
      }
    }

    public void Dispose() {
      Close();
    }
  }
}
