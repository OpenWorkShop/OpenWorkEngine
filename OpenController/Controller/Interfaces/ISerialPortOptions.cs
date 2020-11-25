namespace OpenWorkEngine.OpenController.Controller {
  public interface ISerialPortOptions {
    int BaudRate { get; }

    string? Parity { get; }

    int? DataBits { get; }

    int? StopBits { get; }

    string? Handshake { get; }

    int? ReadBufferSize { get; }

    int? WriteBufferSize { get; }

    bool? RtsEnable { get; }

    int? ReadTimeout { get; }

    int? WriteTimeout { get; }
  }
}
