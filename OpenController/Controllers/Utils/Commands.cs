using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using HotChocolate.Utilities;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.MachineProfiles.Interfaces;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Programs.Interfaces;
using OpenWorkEngine.OpenController.Programs.Models;
using OpenWorkEngine.OpenController.Syntax;
using OpenWorkEngine.OpenController.Syntax.GCode;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Utils {
  public abstract class Commands : IProgramSource {
    // Used by GraphQL client for caching purposes.
    public string Id => Controller.Connection.Port.PortName;

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
    public Task<ControlledMachine> Startup() =>
      Invoke(nameof(GetFirmware), nameof(GetSettings), nameof(GetParameters));

    // Polling:
    public Task<ControlledMachine> GetConfiguration() => Invoke(nameof(GetConfiguration));
    public Task<ControlledMachine> GetStatus() => Invoke(nameof(GetStatus));

    public Task<ControlledMachine> Unlock() => Invoke(nameof(Unlock), nameof(GetStatus));
    public Task<ControlledMachine> Reset() => Invoke(nameof(Reset), nameof(GetStatus));
    public Task<ControlledMachine> Homing() => Invoke(nameof(Homing));
    public Task<ControlledMachine> Pause() => Invoke(nameof(Pause));
    public Task<ControlledMachine> Play() => Invoke(nameof(Play));

    public Task<ControlledMachine> Move(MoveCommand moveCommand) => Execute(nameof(Move), moveCommand);

    // Command codes that apply to all types of machines.
    private readonly Dictionary<string, ControllerScript> _commandScripts = new () { };

    public Commands(Controller controller) {
      Controller = controller;
    }

    protected void SetCommandCode(string command, string code, bool inline = false) {
      _commandScripts[command] = this.CompileScript(code, command, inline);
    }

    //
    // public static bool IsCommandMethod(MethodInfo mi, string? methodName = null) {
    //   if (methodName != null && !mi.Name.EqualsInvariantIgnoreCase(methodName)) return false;
    //   return mi.IsPublic && mi.ReturnType == typeof(Task<ControlledMachine>);
    // }

    private ControllerScript GetCommandScript(string methodName) {
      ControllerScript? script = _commandScripts.ContainsKey(methodName) ? _commandScripts[methodName] : null;
      if (script == null) {
        throw new ArgumentException($"The command {methodName} is not supported by {Controller.ControllerType}");
      }
      return script;
    }

    // Look up the code for a given method name and write it to the port.
    // Made private so that only the concrete methods are exposed
    private async Task<ControlledMachine> Invoke(params string[] methodNames) {
      foreach (string methodName in methodNames) {
        await Execute(methodName);
      }
      return Controller.Connection.Machine;
    }

    private async Task<ControlledMachine> Execute(string methodName, object? args = null) {
      ControllerScript script = GetCommandScript(methodName);
      Log.Verbose("[CMD] {name} args {args}", methodName, args);
      await Controller.Execute(script, args);
      return Controller.Connection.Machine;
    }

    // protected Task<ControlledMachine> WriteLine(string raw) {
    //   Controller.Buffer.WriteLine(raw);
    //   return Task.FromResult(Controller.Connection.Machine);
    // }
    //
    // internal async Task Instruct(IControllerInstruction instruction) {
    //   // if (!Commands.ContainsKey(type)) throw new NotImplementedException($"{type} is not supported.");
    //   // Log.Debug("[CMD] {count} commands for {controller}", Commands.Count, Controller.ToString());
    //   Log.Verbose("[CMD] {cmd}", instruction.Raw);
    //   await Controller.Buffer.Write(instruction.Raw);
    // }
    //
    // internal async Task Command(IMachineCommand command) {
    //   Conroller instructions = command.ToInstructions();
    //   Log.Debug("[CMD] {count} commands for {controller}", instructions.Count, ToString());
    //   foreach (IControllerInstruction instruction in instructions) {
    //     await Instruct(instruction);
    //   }
    // }

    private Controller Controller { get; }
    public string Name => Controller.ControllerType.ToString();
    public ProgramSyntax Syntax => ProgramSyntax.GCode;
  }
}
