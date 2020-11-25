using System.IO.Ports;

namespace OpenWorkEngine.OpenController.Controller.Models {
  public class PortOptions : ISerialPortOptions {
    public int BaudRate => _serialPort.BaudRate;

    public string? Parity => _serialPort.Parity.ToString();

    public int? DataBits => _serialPort.DataBits;

    public int? StopBits => (int) _serialPort.StopBits;

    public string? Handshake => _serialPort.Handshake.ToString();

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
