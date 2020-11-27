using System.IO.Ports;
using OpenWorkEngine.OpenController.Ports.Interfaces;

namespace OpenWorkEngine.OpenController.Ports.Messages {
  public class SerialPortOptions : ISerialPortOptions {
    public int BaudRate { get; set; }

    public Parity? Parity { get; set; }

    public int? DataBits { get; set; }

    public StopBits? StopBits { get; set; }

    public Handshake? Handshake { get; set; }

    public int? ReadBufferSize { get; set; }

    public int? WriteBufferSize { get; set; }

    public bool? RtsEnable { get; set; }

    public int? ReadTimeout { get; set; }

    public int? WriteTimeout { get; set; }
  }
}
