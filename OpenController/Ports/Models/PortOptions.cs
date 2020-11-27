using System.IO.Ports;
using OpenWorkEngine.OpenController.Ports.Interfaces;

namespace OpenWorkEngine.OpenController.Ports.Models {
  public class PortOptions : ISerialPortOptions {
    public int BaudRate => _serialPort.BaudRate;

    public Parity? Parity => _serialPort.Parity;

    public int? DataBits => _serialPort.DataBits;

    public StopBits? StopBits => _serialPort.StopBits;

    public Handshake? Handshake => _serialPort.Handshake;

    public int? ReadBufferSize => _serialPort.ReadBufferSize;

    public int? WriteBufferSize => _serialPort.WriteBufferSize;

    public bool? RtsEnable => _serialPort.RtsEnable;

    public int? ReadTimeout => _serialPort.ReadTimeout;

    public int? WriteTimeout => _serialPort.WriteTimeout;

    private readonly SerialPort _serialPort;

    public PortOptions(SerialPort port) {
      _serialPort = port;
    }
  }
}
