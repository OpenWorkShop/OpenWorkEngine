using System;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl;
using OpenWorkEngine.OpenController.ControllerSyntax.Grbl.Maslow;

namespace OpenWorkEngine.OpenController.MachineProfiles.Enums {
  public enum MachineControllerType {
    Unknown = -1,
    TinyG,
    Smoothie,
    Maslow,
    Grbl,
    Marlin
  }

  public static class MachineControllerTypeExtensions {
    public static void LoadMachineSyntax(this Controller controller) {
      MachineControllerType controllerType = controller.ControllerType;
      if (controllerType == MachineControllerType.Grbl)
        controller.Translator.UseGrblSyntax();
      else if (controllerType == MachineControllerType.Maslow)
        controller.Translator.UseMaslowSyntax();
      else
        throw new ArgumentException($"Unsupported controller type: {controllerType}");
    }
  }
}
