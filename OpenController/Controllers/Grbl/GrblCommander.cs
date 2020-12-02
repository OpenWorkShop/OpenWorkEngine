using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Utils;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Grbl {
  public static class GrblCommander {
    public static void AddGrblCommands(this Commander commander) {
      commander.Commands.Add(MachineCommandType.Help, new [] { "$$\n" });
      commander.Commands.Add(MachineCommandType.GetSettings, new [] { "$$\n" }); // Help also prints settings.
      commander.Commands.Add(MachineCommandType.GetFirmware, new [] { "$I\n" });
      commander.Commands.Add(MachineCommandType.GetParameters, new [] { "$#\n" });
    }
  }
}
