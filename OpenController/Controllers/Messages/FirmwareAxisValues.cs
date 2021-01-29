using System;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Messages {
  public record FirmwareAxisValues {
    public FirmwareSetting<decimal> X { get; }
    public FirmwareSetting<decimal> Y { get; }
    public FirmwareSetting<decimal> Z { get; }

    public FirmwareAxisValues(MachineSettingUnits units) {
      X = new FirmwareSetting<decimal>(0) {Units = units};
      Y = new FirmwareSetting<decimal>(0) {Units = units};
      Z = new FirmwareSetting<decimal>(0) {Units = units};
    }
  }
}
