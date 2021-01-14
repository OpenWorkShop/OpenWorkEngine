using System;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Utils {
  /// <summary>
  ///   Issue a command on some time interval and parse the expected response.
  ///   Example: updating status/position by polling the serial port.
  /// </summary>
  public class CommandResponsePoll {
    private DateTime _lastCommandAt;

    public CommandResponsePoll(MachineCommandType command, Parser parser, int timeoutMs = 5000) {
      Command = command;
      Parser = parser;
      TimeoutMs = timeoutMs;
      _lastCommandAt = DateTime.MinValue;
      LastParseAt = DateTime.MinValue;
    }

    public Parser Parser { get; }
    public MachineCommandType Command { get; }
    public int TimeoutMs { get; }

    public DateTime LastParseAt { get; private set; }

    public async Task<bool> Parse(Controller? controller, ControlledMachine machine, string line) {
      bool parsed = await Parser.UpdateMachine(controller, machine, line);
      if (parsed) {
        LastParseAt = DateTime.Now;
        return true;
      }

      return false;
    }

    public async Task Invoke(Controller controller) {
      DateTime now = DateTime.Now;
      TimeSpan sinceCommand = now - _lastCommandAt;
      TimeSpan sinceParse = now - LastParseAt;
      double elapsed = Math.Min(sinceCommand.TotalMilliseconds, sinceParse.TotalMilliseconds);
      if (elapsed > TimeoutMs) {
        _lastCommandAt = DateTime.Now;
        await controller.Commander.Command(Command);
      }
    }
  }
}
