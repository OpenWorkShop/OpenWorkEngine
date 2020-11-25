using System;
using System.IO.Ports;
using System.Threading;
using Serilog;

namespace OpenWorkEngine.OpenController.Controller.Models {
  public class PortConnection : IDisposable {
    public SystemPort Port { get; }

    internal ILogger Log { get; }

    public PortOptions Options { get; }

    public PortState State { get; }

    public Controller Controller { get; }

    private readonly SerialPort _serialPort;

    private bool _read = true;

    public PortConnection(SystemPort port, ISerialPortOptions options, ILogger log) {
      Log = log;
      Port = port;
      _serialPort = new SerialPort(port.PortName, options.BaudRate);
      _serialPort.Open();
      State = new(_serialPort);
      Options = new(_serialPort);
      Controller = new(this);
      Thread readThread = new Thread(Read);
      readThread.Start();
    }

    private void Read() {
      while (_read) {
        try {
          Controller.Receive(_serialPort.ReadLine());
        } catch (TimeoutException e) {
          Log.Error(e, "Timeout");
        }
      }
    }

    public void Write(string text) => _serialPort.Write(text);

    public void WriteLine(string line) => _serialPort.WriteLine(line);

    public void Dispose() {
      _read = false;
      _serialPort.Dispose();
    }
  }
}
