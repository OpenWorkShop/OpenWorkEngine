using System.Collections.Generic;
using HotChocolate.Language;
using Serilog;

namespace OpenWorkEngine.OpenController.Controller.Models {
  public class Controller {
    private ILogger Log { get; }

    public PortConnection Connection { get; }

    public List<string> ReadBuffer { get; } = new List<string>();

    public void Receive(string line) {
      line = line.Trim();
      if (string.IsNullOrWhiteSpace(line)) return;
      Log.Debug("[READ]: {line}", line);
      ReadBuffer.Push(line);
    }

    public Controller(PortConnection connection) {
      Log = connection.Log;
      Connection = connection;
    }
  }
}
