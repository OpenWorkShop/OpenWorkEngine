using System;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Attributes {
  [AttributeUsage(AttributeTargets.Property)]
  public class FirmwareSettingAttribute : Attribute {
    public FirmwareSettingAttribute(MachineSettingUnits units = MachineSettingUnits.Unknown) {

    }
  }
}
