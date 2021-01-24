using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Services.Serial {
  /// <summary>
  ///   Issue a command on some time interval and parse the expected response.
  ///   Example: updating status/position by polling the serial port.
  /// </summary>
  public class SerialPoll {
    public DateTime LastParseAt { get; private set; }

    public bool PendingResponse { get; private set; }

    private Parser Parser { get; }
    private string MethodName { get; }
    private int TimeoutMs { get; set; }
    private int RepeatMs { get; set; }

    private DateTime _lastCommandAt;

    internal SerialPoll(string methodName, Parser parser, int timeoutMs = 5000, int repeatMs = 250) {
      MethodName = methodName;
      Parser = parser;
      TimeoutMs = timeoutMs;
      RepeatMs = repeatMs;
      ResetTimestamps();
    }


    public void ResetTimestamps() {
      _lastCommandAt = DateTime.MinValue;
      LastParseAt = DateTime.MinValue;
    }

    public async Task<MachineOutputLine> UpdateController(MachineOutputLine line) {
      line = await Parser.UpdateMachine(line);
      if (line.WasParsed) {
        LastParseAt = DateTime.Now;
        PendingResponse = false;
      }

      return line;
    }

    public async Task Write(Controller controller) {
      DateTime now = DateTime.Now;
      DateTime since = PendingResponse ? _lastCommandAt : LastParseAt;
      int max = PendingResponse ? TimeoutMs : RepeatMs;
      double elapsed = (now - since).TotalMilliseconds;
      if (elapsed > max) {
        _lastCommandAt = DateTime.Now;
        // By NOT using controller.Execute, we avoid creating a log entry.
        await controller.Buffer.Execute(controller.Translator.GetCommandScript(MethodName), null, false);
        PendingResponse = true;
      }
    }
  }
}
