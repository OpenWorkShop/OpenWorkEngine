using System.IO.Ports;

namespace OpenWorkEngine.OpenController.Ports.Interfaces {
  public interface ISerialPortOptions {
    int BaudRate { get; }

    Parity? Parity { get; }

    int? DataBits { get; }

    StopBits? StopBits { get; }

    Handshake? Handshake { get; }

    int? ReadBufferSize { get; }

    int? WriteBufferSize { get; }

    bool? RtsEnable { get; }

    int? ReadTimeout { get; }

    int? WriteTimeout { get; }
  }
}
