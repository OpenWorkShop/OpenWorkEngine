using System;
using System.IO.Ports;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Interfaces;
using Serilog;

namespace OpenWorkEngine.OpenController.Ports.Models {
  /// High-order wrapper around a SerialPort, so that it may be represented in the closed state.
  public class SystemPort {
    internal ILogger Log { get; }

    public string PortName { get; set; } = default!;

    public PortState State { get; set; } = PortState.Ready;

    public PortError? Error { get; set; }

    public PortOptions Options { get; }

    // The presence of a connection object implies that it is connected (open).
    public ConnectedPort? Connection { get; internal set; }

    internal SerialPort SerialPort { get; }

    public SystemPort(string portName) {
      PortName = portName;
      Log = Serilog.Log.Logger.ForContext("Port", PortName);

      SerialPort = new SerialPort(portName);
      Options = new(SerialPort);
    }

    internal bool ApplyPortOptions(ISerialPortOptions opts) {
      bool changed = SerialPort.BaudRate != opts.BaudRate;
      SerialPort.BaudRate = opts.BaudRate;
      if (opts.Parity != null) {
        changed = SerialPort.Parity != opts.Parity.Value || changed;
        SerialPort.Parity = opts.Parity.Value;
      }
      if (opts.DataBits != null) {
        changed = SerialPort.DataBits != opts.DataBits.Value || changed;
        SerialPort.DataBits = opts.DataBits.Value;
      }
      if (opts.StopBits != null) {
        changed = SerialPort.StopBits != opts.StopBits.Value || changed;
        SerialPort.StopBits = opts.StopBits.Value;
      }
      if (opts.Handshake != null) {
        changed = SerialPort.Handshake != opts.Handshake.Value || changed;
        SerialPort.Handshake = opts.Handshake.Value;
      }
      if (opts.ReadBufferSize != null) {
        changed = SerialPort.ReadBufferSize != opts.ReadBufferSize.Value || changed;
        SerialPort.ReadBufferSize = opts.ReadBufferSize.Value;
      }
      if (opts.WriteBufferSize != null) {
        changed = SerialPort.WriteBufferSize != opts.WriteBufferSize.Value || changed;
        SerialPort.WriteBufferSize = opts.WriteBufferSize.Value;
      }
      if (opts.RtsEnable != null) {
        changed = SerialPort.RtsEnable != opts.RtsEnable.Value || changed;
        SerialPort.RtsEnable = opts.RtsEnable.Value;
      }
      if (opts.ReadTimeout != null) {
        changed = SerialPort.ReadTimeout != opts.ReadTimeout.Value || changed;
        SerialPort.ReadTimeout = opts.ReadTimeout.Value;
      }
      if (opts.WriteTimeout != null) {
        changed = SerialPort.WriteTimeout != opts.WriteTimeout.Value || changed;
        SerialPort.WriteTimeout = opts.WriteTimeout.Value;
      }
      return changed;
    }

    public override string ToString() => $"[{PortName}] [{State}] [{Connection?.ToString() ?? "disconnected"}";
  }
}
