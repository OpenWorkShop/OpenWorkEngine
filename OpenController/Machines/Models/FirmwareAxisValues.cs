using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record FirmwareAxisValues {
    public FirmwareSetting<decimal> X { get; }
    public FirmwareSetting<decimal> Y { get; }
    public FirmwareSetting<decimal> Z { get; }

    public FirmwareAxisValues(MachineSettingUnits units) {
      X = FirmwareSetting.Define(0M, units);
      Y = FirmwareSetting.Define(0M, units);
      Z = FirmwareSetting.Define(0M, units);
    }

    public List<FirmwareSetting> Settings => FirmwareSettings.GetSortedList(X, Y, Z);
  }
}
