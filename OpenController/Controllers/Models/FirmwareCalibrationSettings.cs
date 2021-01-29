using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Enums;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public class FirmwareCalibrationSettings {
    public FirmwareSetting<KinematicsMode> Kinematics { get; } = new(KinematicsMode.Linear);

    // MASLOW:
    public FirmwareAxisValues MotorDistance { get; } = new(MachineSettingUnits.Millimeters);

    public FirmwareAxisValues Scaling { get; } = new(MachineSettingUnits.Percent);

    public FirmwareSetting<decimal> ChainLength { get; } = new(0) { Units = MachineSettingUnits.Millimeters };

    public FirmwareSetting<bool> ChainOverSprocket { get; } = new(false);

    public FirmwareSetting<decimal> ChainSagCorrection { get; } = new(0);

    public FirmwareSetting<decimal> ChainElongationFactor { get; } = new(0);

    public FirmwareSetting<decimal> LeftChainTolerance { get; } = new(0);

    public FirmwareSetting<decimal> RightChainTolerance { get; } = new(0);

    public FirmwareSetting<decimal> HomeChainLengths { get; } = new(0);

    public List<FirmwareSetting> Settings => new() {
      Kinematics,
      MotorDistance.X, MotorDistance.Y, MotorDistance.Z,
      Scaling.X, Scaling.Y, Scaling.Z,
      ChainLength, ChainOverSprocket, ChainSagCorrection, ChainElongationFactor,
      LeftChainTolerance, RightChainTolerance, HomeChainLengths,
    };
  }
}
