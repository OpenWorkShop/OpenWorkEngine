using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Utils {
  /// <summary>
  ///   Wraps the serial I/O for a ConnectedPort with a thread for doing work.
  /// </summary>
  public class SerialBuffer {
    private readonly ConcurrentQueue<string> _writeBuffer = new();

    public SerialBuffer(Controller controller) {
      Log = controller.Log;
      Controller = controller;
      Connection = controller.Connection;
    }

    internal ConnectedPort Connection { get; }

    internal Controller Controller { get; }

    internal ILogger Log { get; }

    public int BytesToRead => Connection.Status.BytesToRead;

    public bool HasPendingData => BytesToRead > 0;

    // try/catch around a core read loop; broadcasts state & returns # of characters read.
    internal async Task<int> TryRead() {
      try {
        if (HasPendingData) {
          string line = Connection.Port.SerialPort.ReadLine();

          int readCharacters = line.Length;
          if (readCharacters > 0) {
            if (Connection.Port.State < PortState.HasData) Connection.Port.State = PortState.HasData;
            Connection.Status.CharactersRead += readCharacters;
            Connection.Status.LinesRead++;
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
      } catch (ObjectDisposedException) {
        // terminated via the dispose command.
        Log.Verbose("[BUFFER] terminated with disposal: {portName}", Connection.Port.PortName);
      } catch (Exception e) {
        Log.Error(e, "[BUFFER] Unknown IO exception for {portName}", Connection.Port.PortName);
      }
      Log.Verbose("[BUFFER] returning zero data.");
      return 0;
    }

    internal async Task Write(string text) {
      // Invariant: the write function should only write raw text which does NOT contain a line break.
      string[] lines = text.Split(new char[] {'\n', '\r'});
      for (int i = 0; i < (lines.Length - 1); i++) {
        await WriteLine(lines[i]);
      }

      string rawText = lines.Last();
      Log.Verbose("[WRITE] {connection} > {text}", Connection.ToString(), rawText.ToCharArray()[0]);
      Connection.Port.SerialPort.Write(rawText);
      Connection.Status.CharactersWritten += rawText.Length;
    }

    internal Task WriteLine(string line) {
      line = line.Trim();
      if (line.Length <= 0) return Task.CompletedTask;
      Log.Verbose("[WRITE] {connection} >> {line}", Connection.ToString(), line);
      Connection.Port.SerialPort.WriteLine(line);
      Connection.Status.CharactersWritten += line.Length + 1; // Account for newline.
      Connection.Status.LinesWritten++;
      return Task.CompletedTask;
    }
  }
}
