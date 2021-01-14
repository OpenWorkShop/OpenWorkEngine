using System;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Exceptions;
using OpenWorkEngine.OpenController.Controllers.Utils;
using OpenWorkEngine.OpenController.Controllers.Utils.Parsers;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Extensions;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Services {
  public abstract class Controller : IDisposable {
    // Thread managament liveness
    private bool _isAlive = true;
    private ILogger? _logger;

    public Controller(ControllerManager controllerManager, ConnectedPort connection) {
      Manager = controllerManager;
      Connection = connection;
      Buffer = new SerialBuffer(this);
      Commander = new Commander(this);
      CreatedAt = DateTime.Now;
    }

    internal ControllerManager Manager { get; }

    public ILogger Log => _logger ??= Manager.Log
                                             .ForContext("ControllerType", ControllerType.ToString())
                                             .ForContext("Buffer", Buffer)
                                             .ForContext("Connection", Connection);

    public abstract MachineControllerType ControllerType { get; }

    internal ConnectedPort Connection { get; }

    internal SerialBuffer Buffer { get; }

    public Commander Commander { get; }

    public ParserSet Parsers { get; } = new();

    internal DateTime CreatedAt { get; }

    // Timeout for the entire startup process, including all firmware verification.
    internal int StartupTimeoutMs { get; } = 20000;
    public bool IsAlive => _isAlive && Connection.Port.SerialPort.IsOpen;

    public bool IsActive => IsAlive && Connection.Port.State == PortState.Active;

    public void Dispose() {
      Log.Information("[DISPOSE] controller: {controller}", ToString());
      _isAlive = false;
    }

    protected abstract Task RunStartupCommands();

    // Background thread "main" function for this port/controller combo.
    // Coordinates all serial I/O.
    private async Task InfiniteWorkLoop() {
      while (IsActive) {
        foreach (CommandResponsePoll poll in Parsers.Polls) await poll.Invoke(this);
        int readCharacters = await Buffer.TryRead();
        Log.Verbose("[WORK] I:{characters}", readCharacters);
      }
      Log.Debug("[WORK] termination state: {state}", Connection.Port.State);
    }

    // Perform controller and firmware checks against this port.
    // Spawned immediately when Controller becomes active.
    // If it enters the "Active" state successfully, it will become the Work thread.
    private async Task Startup() {
      Log.Debug("[STARTUP] {controller}", ToString());
      try {
        Manager.Ports.EmitState(Connection.Port, PortState.Startup);
        await RunStartupCommands();

        Log.Debug("[AWAIT] data from {port}", Connection.Port.ToString());
        if (!await StartupCondition(
          PortState.HasData,
          () => Buffer.HasPendingData,
          () => new TimeoutException("No data received."))
        )
          return;
        Log.Debug("[DATA] {controller}: {count} bytes", ToString(), Connection.Status.BytesToRead);

        // Any kind of valid firmware (well-known response from board)
        MachineDetectedFirmware firmware = Connection.Machine.Configuration.Firmware;
        if (!await StartupCondition(
          PortState.HasFirmware,
          () => firmware.IsValid,
          () => new SystemException("No firmware version could be detected."))
        )
          return;
        Log.Debug("[FIRMWARE] requirement?: {firmwareRequirement}", Connection.Machine.FirmwareRequirement.ToString());

        // Ensure that any required firmware is met.
        IMachineFirmwareRequirement req = Connection.Machine.FirmwareRequirement;
        if (!await StartupCondition(
          PortState.Active,
          () => req.IsSatisfiedBy(firmware),
          () => new FirmwareException("No firmware version could be detected.", firmware, req))
        )
          return;
        Log.Information("[FIRMWARE] requirements satisfied: {firmware}", firmware.ToString());
      } catch (Exception e) {
        Log.Error(e, "[STARTUP] failed");
        Connection.Port.Error = new AlertError(e);
        Manager.Ports.EmitState(Connection.Port, PortState.Error);
        // Serial port is still open in the "error" state.
        return;
      }

      Log.Information("[CONTROLLER] Ready. Beginning work.");
      await InfiniteWorkLoop();
    }

    // Helper function which transitions to a new state after a condition check is passed.
    // Uses timeout starting at object instantiation, creating a timeout on this specific controller startup.
    private async Task<bool> StartupCondition(
      PortState becomeState, Func<bool> isComplete, Func<Exception> errBuilder, int delay = 100) {
      while (!isComplete.Invoke()) {
        if (!IsAlive) {
          Log.Debug("[DEAD] startup aborted before {state}", becomeState);
          return false;
        }
        TimeSpan elapsed = DateTime.Now - CreatedAt;
        Log.Verbose("[AWAIT] {ms}/{max}ms elapsed", elapsed.TotalMilliseconds, StartupTimeoutMs);
        if (elapsed.TotalMilliseconds >= StartupTimeoutMs) {
          Log.Debug("[TIMEOUT] startup aborted before {state}", becomeState);
          throw errBuilder();
        }
        await Task.Delay(delay);
        if (becomeState > PortState.HasData) // Once we have data, we need to start consuming it for the startup conditions.
          await Buffer.TryRead();
      }
      Manager.Ports.EmitState(Connection.Port, becomeState);
      return true;
    }

    protected abstract Task ParseLine(string line);

    public async Task HandleSerialRead(string line) {
      line = line.Trim();
      if (string.IsNullOrWhiteSpace(line)) {
        Log.Verbose("Whitespace line: {line}", line);
        return;
      }
      Log.Debug("[READ] {line}", line);
      await Parsers.Update(this, Connection.Machine, line);
      await ParseLine(line);
    }

    public void StartTask() => Task.Run(Startup);

    public override string ToString() => $"[{ControllerType}] {Connection}";
  }
}
