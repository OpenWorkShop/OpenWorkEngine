using System.Collections.Generic;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.ControllerSyntax {
  /// <summary>
  /// Lookup for syntax-specific settings.
  /// </summary>
  public record SettingDefinition(string code, MachineSettingType title, MachineSettingUnits units);
}
