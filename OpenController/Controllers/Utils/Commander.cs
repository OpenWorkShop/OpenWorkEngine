using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Utils {
  public class Commander : ICommandMachines {
    internal ILogger Log { get; }

    internal Controller Controller { get; }

    internal Dictionary<MachineCommandType, string[]> Commands { get; } = new ();

    public async Task Command(MachineCommandType type) {
      if (!Commands.ContainsKey(type)) {
        throw new System.NotImplementedException($"{type} is not supported.");
      }
      Log.Debug("[CMD] {count} commands for {controller}", Commands.Count, Controller.ToString());
      foreach (string cmd in Commands[type]) {
        Log.Debug("[CMD] {type} > {cmd}", type, cmd);
        await Controller.Buffer.Write(cmd);
      }
    }

    public Commander(Controller controller) {
      Controller = controller;
      Log = Controller.Log.ForContext(typeof(Commander));
    }
  }
}