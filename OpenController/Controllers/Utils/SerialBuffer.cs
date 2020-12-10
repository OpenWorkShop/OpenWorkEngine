using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Utils {
  /// <summary>
  /// Wraps the serial I/O for a ConnectedPort with a thread for doing work.
  /// </summary>
  public class SerialBuffer {
    internal ConnectedPort Connection { get; }

    internal Controller Controller { get; }

    internal ILogger Log { get; }

    public int BytesToRead => Connection.Status.BytesToRead;

    public bool HasPendingData => BytesToRead > 0;

    private readonly ConcurrentQueue<string> _writeBuffer = new();

    private bool _isAlive = true;

    public SerialBuffer(Controller controller) {
      Log = controller.Log;
      Controller = controller;
      Connection = controller.Connection;
    }

    // try/catch around a core read loop; broadcasts state & returns # of characters read.
    internal async Task<int> TryRead() {
      try {
        if (HasPendingData) {
          string line = Connection.Port.SerialPort.ReadLine();

          int readCharacters = line.Length;
          if (readCharacters > 0) {
            if (Connection.Port.State < PortState.HasData) Connection.Port.State = PortState.HasData;
            Connection.Status.CharactersRead += readCharacters;
            Log.Verbose("[BUFFER] {count} characters on {portName}", readCharacters, Connection.Port.PortName);
            await Controller.HandleSerialRead(line);
          } else {
            Log.Warning("[BUFFER] no bytes read (although {count} exist to be read) from {portName}",
              BytesToRead, Connection.Port.PortName);
          }

          return readCharacters;
        }
      } catch (TimeoutException e) {
        Log.Warning(e, "[BUFFER] caught timeout");
      } catch (ObjectDisposedException e) {
        // terminated via the dispose command.
        Log.Verbose("[BUFFER] terminated with disposal: {portName}", Connection.Port.PortName);
      } catch (Exception e) {
        Log.Error(e, "[BUFFER] Unknown IO exception for {portName}", Connection.Port.PortName);
      }
      Log.Verbose("[BUFFER] returning zero data.");
      return 0;
    }

    internal Task Write(string text) {
      if (text.EndsWith('\n') || text.EndsWith('\r')) {
        WriteLine(text);
      } else {
        Log.Debug("{connection} > {text}", Connection.ToString(), text);
        Connection.Port.SerialPort.Write(text);
      }
      return Task.CompletedTask;
    }

    internal void WriteLine(string line) {
      line = line.Trim();
      Log.Debug("{connection} >> {line}", Connection.ToString(), line);
      Connection.Port.SerialPort.WriteLine(line);
    }
  }
}
