using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Enums;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public class FirmwareCalibrationSettings {
    public FirmwareSetting<KinematicsMode> Kinematics { get; } = FirmwareSetting.Define(KinematicsMode.Linear);

    // MASLOW:
    public FirmwareAxisValues MotorDistance { get; } = new(MachineSettingUnits.Millimeters);

    public FirmwareAxisValues Scaling { get; } = new(MachineSettingUnits.Percent);

    public FirmwareSetting<decimal> ChainLength { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Millimeters);

    public FirmwareSetting<bool> ChainOverSprocket { get; } = FirmwareSetting.Define(false);

    public FirmwareSetting<decimal> ChainSagCorrection { get; } = FirmwareSetting.Define(0M);

    public FirmwareSetting<decimal> ChainElongationFactor { get; } = FirmwareSetting.Define(0M);

    public FirmwareSetting<decimal> LeftChainTolerance { get; } = FirmwareSetting.Define(0M);

    public FirmwareSetting<decimal> RightChainTolerance { get; } = FirmwareSetting.Define(0M);

    public FirmwareSetting<decimal> HomeChainLengths { get; } =
      FirmwareSetting.Define(0M, MachineSettingUnits.Millimeters);

    public List<FirmwareSetting> Settings => FirmwareSettings.GetSortedList(
      MotorDistance.Settings
                   .Union(Scaling.Settings)
                   .Union(new List<FirmwareSetting>() {
                      Kinematics,
                      ChainLength,
                      ChainOverSprocket,
                      ChainSagCorrection,
                      ChainElongationFactor,
                      LeftChainTolerance,
                      RightChainTolerance,
                      HomeChainLengths,
                    }));
  }
}
