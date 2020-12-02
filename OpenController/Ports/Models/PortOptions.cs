using System.IO.Ports;
using OpenWorkEngine.OpenController.Ports.Interfaces;

namespace OpenWorkEngine.OpenController.Ports.Models {
  public class PortOptions : ISerialPortOptions {
    public static int DefaultReadTimeoutMs = 100;

    public int BaudRate => _serialPort.BaudRate;

    public Parity? Parity => _serialPort.Parity;

    public int? DataBits => _serialPort.DataBits;

    public StopBits? StopBits => _serialPort.StopBits;

    public Handshake? Handshake => _serialPort.Handshake;

    public int? ReadBufferSize => _serialPort.ReadBufferSize;

    public int? WriteBufferSize => _serialPort.WriteBufferSize;

    public bool? RtsEnable => _serialPort.RtsEnable;

    public int? ReadTimeout {
      get => _serialPort.ReadTimeout <= 0 ? DefaultReadTimeoutMs : _serialPort.ReadTimeout;
      internal set {
        if (value != null) _serialPort.ReadTimeout = value.Value;
      }
    }

    public int? WriteTimeout {
      get => _serialPort.WriteTimeout;
      internal set {
        if (value != null) _serialPort.WriteTimeout = value.Value;
      }
    }

    private readonly SerialPort _serialPort;

    public PortOptions(SerialPort port) {
      _serialPort = port;
    }
  }
}
