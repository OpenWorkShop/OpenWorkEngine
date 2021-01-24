using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Exceptions;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.ControllerSyntax;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Extensions;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Programs.Interfaces;
using OpenWorkEngine.OpenController.Syntax;
using OpenWorkEngine.OpenController.Syntax.GCode;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Services {
  /// <summary>
  /// Controllers are exposed directly as an object in GraphQL, allowing public methods to be invoked.
  /// They wrap a ConnectedPort, which contains a machine.
  /// </summary>
  public sealed class Controller : IDisposable {

    public MachineControllerType ControllerType { get; }

    // Used by GraphQL client for caching purposes.
    public string Id => Connection.Port.PortName;

    // Reference timestamp in case client is curious how long online/connected.
    public DateTime CreatedAt { get; }

    // Command methods simply invoke the correct "Code"
    // Concrete methods names are useful in many ways
    // 1. These are exposed via GraphQL mutations directly
    // 2. Using nameof() on the concrete names affords constant strings
    public Task<ControlledMachine> GetHelp() => Invoke(nameof(GetHelp));
    public Task<ControlledMachine> GetSettings() => Invoke(nameof(GetSettings));
    public Task<ControlledMachine> GetFirmware() => Invoke(nameof(GetFirmware));
    public Task<ControlledMachine> GetParameters() => Invoke(nameof(GetParameters));
    public Task<ControlledMachine> GetStartup() => Invoke(nameof(GetStartup));
    public Task<ControlledMachine> CheckCode() => Invoke(nameof(CheckCode));

    // Polling:
    public Task<ControlledMachine> GetConfiguration() => Invoke(nameof(GetConfiguration));
    public Task<ControlledMachine> GetStatus() => Invoke(nameof(GetStatus));

    public Task<ControlledMachine> Unlock() => Invoke(nameof(Unlock), nameof(GetStatus));
    public Task<ControlledMachine> Reset() => Invoke(nameof(Reset), nameof(GetStatus));
    public Task<ControlledMachine> Homing() => Invoke(nameof(Homing));
    public Task<ControlledMachine> Pause() => Invoke(nameof(Pause));
    public Task<ControlledMachine> Play() => Invoke(nameof(Play));

    public Task<ControlledMachine> Move(MoveCommand moveCommand) => Execute(nameof(Move), moveCommand);

    // Raw command
    public async Task<ControlledMachine> WriteCommand(string commandCode, string sourceName) {
      ControllerScript script = new (Compiler.LoadInstructions(commandCode, c => new GCodeBlock(c, sourceName)));
      Log.Verbose("[CMD] {code} from {src}", commandCode, sourceName);
      await Buffer.Execute(script);
      return Connection.Machine;
    }

    internal bool IsAlive => _isAlive && Connection.Port.SerialPort.IsOpen;

    internal bool IsActive => IsAlive && Connection.Port.State == PortState.Active;

    internal ControllerManager Manager { get; }

    internal ILogger Log => _logger ??= Manager.Log
                                               .ForContext("ControllerType", ControllerType.ToString())
                                               .ForContext("Buffer", Buffer)
                                               .ForContext("Connection", Connection);

    internal ConnectedPort Connection { get; }

    internal SerialBuffer Buffer { get; }

    internal ControllerTranslator Translator { get; } = new();

    // Timeout for the entire startup process, including all firmware verification.
    internal int StartupTimeoutMs { get; } = 20000;

    // Thread managament liveness
    private bool _isAlive = true;
    private ILogger? _logger;

    internal Controller(ControllerManager controllerManager, ConnectedPort connection, MachineControllerType type) {
      ControllerType = type;
      Manager = controllerManager;
      Connection = connection;
      Buffer = new SerialBuffer(this);
      CreatedAt = DateTime.Now;
      this.LoadMachineSyntax();
    }

    // Look up the code for a given method name and write it to the port.
    // Made private so that only the concrete methods are exposed
    private async Task<ControlledMachine> Invoke(params string[] methodNames) {
      foreach (string methodName in methodNames) {
        await Execute(methodName);
      }
      return Connection.Machine;
    }

    internal async Task<ControlledMachine> Execute(string methodName, object? args = null) {
      ControllerScript script = Translator.GetCommandScript(methodName);
      Log.Verbose("[CMD] {name} args {args}", methodName, args);
      await Buffer.Execute(script, args);
      return Connection.Machine;
    }

    public void Dispose() {
      Log.Information("[DISPOSE] controller: {controller}", ToString());
      _isAlive = false;
    }

    // Background thread "main" function for this port/controller combo.
    // Coordinates all serial I/O.
    private async Task InfiniteWorkLoop() {
      while (IsActive) {
        await Buffer.TryReadSerial();
        await Buffer.TryEmitChanges();
        await Buffer.TryWriteSerial();
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
        await GetFirmware();

        Log.Debug("[AWAIT] data from {port}", Connection.Port.ToString());
        if (!await StartupCondition(
          PortState.HasData,
          () => Buffer.HasPendingData,
          () => new TimeoutException("No data received."))
        )
          return;
        Log.Debug("[DATA] {controller}: {count} bytes", ToString(), Connection.Status.BytesToRead);
        await GetSettings();

        // Any kind of valid firmware (well-known response from board)
        MachineDetectedFirmware firmware = Connection.Machine.Configuration.Firmware;
        if (!await StartupCondition(
          PortState.HasFirmware,
          () => firmware.IsValid,
          () => new SystemException("No firmware version could be detected."))
        )
          return;
        Log.Debug("[FIRMWARE] requirement?: {firmwareRequirement}", Connection.Machine.FirmwareRequirement.ToString());
        await GetParameters();

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
          await Buffer.TryReadSerial();
      }
      Manager.Ports.EmitState(Connection.Port, becomeState);
      return true;
    }

    public void StartTask() => Task.Run(Startup);

    public override string ToString() => $"[{ControllerType}] {Connection}";
  }
}
