using System.IO.Ports;

namespace OpenWorkEngine.OpenController.Controller.Models {
  public class PortState {
    public int BytesToRead => _serialPort.BytesToRead;

    public int BytesToWrite => _serialPort.BytesToWrite;

    public bool IsOpen => _serialPort.IsOpen;

    private readonly SerialPort _serialPort;

    public PortState(SerialPort port) {
      _serialPort = port;
    }
  }
}
