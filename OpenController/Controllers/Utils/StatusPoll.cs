using System;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Utils {
  /// <summary>
  ///   Issue a command on some time interval and parse the expected response.
  ///   Example: updating status/position by polling the serial port.
  /// </summary>
  public class StatusPoll {
    public DateTime LastParseAt { get; private set; }

    public bool PendingResponse { get; private set; }

    private Parser Parser { get; }
    private Func<Task> Command { get; }
    private int TimeoutMs { get; set; }
    private int RepeatMs { get; set; }

    private DateTime _lastCommandAt;

    private readonly Controller _controller;

    internal StatusPoll(Controller controller, Func<Task> command, Parser parser, int timeoutMs = 5000, int repeatMs = 250) {
      _controller = controller;
      Command = command;
      Parser = parser;
      TimeoutMs = timeoutMs;
      RepeatMs = repeatMs;
      ResetTimestamps();
    }


    public void ResetTimestamps() {
      _lastCommandAt = DateTime.MinValue;
      LastParseAt = DateTime.MinValue;
    }

    public async Task<bool> UpdateMachine(string line) {
      ControlledMachine machine = _controller.Connection.Machine;
      bool parsed = await Parser.UpdateMachine(_controller, machine, line);
      if (parsed) {
        LastParseAt = DateTime.Now;
        PendingResponse = false;
        return true;
      }

      return false;
    }

    public async Task Invoke() {
      DateTime now = DateTime.Now;
      DateTime since = PendingResponse ? _lastCommandAt : LastParseAt;
      int max = PendingResponse ? TimeoutMs : RepeatMs;
      double elapsed = (now - since).TotalMilliseconds;
      if (elapsed > max) {
        _lastCommandAt = DateTime.Now;
        await Command.Invoke();
        PendingResponse = true;
      }
    }
  }
}
