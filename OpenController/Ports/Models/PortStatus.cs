using System.IO.Ports;

namespace OpenWorkEngine.OpenController.Ports.Models {
  public class PortStatus {
    public int BytesToRead => IsOpen ? _serialPort.BytesToRead : -1;

    public int CharactersRead { get; set; } = 0;

    public int BytesToWrite => IsOpen ? _serialPort.BytesToWrite : -1;

    public int CharactersWritten { get; set; } = 0;

    public bool IsOpen => _serialPort.IsOpen;

    private readonly SerialPort _serialPort;

    public PortStatus(SerialPort port) {
      _serialPort = port;
    }

    public override string ToString() =>
      (IsOpen ? "[OPEN] " : "[CLOSED] ") +
      $"[I] {BytesToRead}/{CharactersRead} [O] {BytesToWrite}/{CharactersWritten}";
  }
}