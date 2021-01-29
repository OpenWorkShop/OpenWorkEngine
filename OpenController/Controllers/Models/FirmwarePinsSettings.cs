using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Attributes;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  public record FirmwarePinsSettings {
    public FirmwareSetting<decimal> StepPulse { get; } = new (0)  { Units = MachineSettingUnits.Microseconds };

    public FirmwareSetting<decimal> StepIdleDelay { get; } = new (0) { Units = MachineSettingUnits.Milliseconds };

    public FirmwareSetting<FirmwareAxisFlags> StepSignalInvert { get; } = new(new FirmwareAxisFlags());

    public FirmwareSetting<FirmwareAxisFlags> StepDirectionInvert { get; } = new(new FirmwareAxisFlags());

    public FirmwareSetting<bool> StepEnableInvert { get; } = new (false);

    public FirmwareSetting<bool> LimitPinsInvert { get; } = new (false);

    public FirmwareSetting<bool> ProbePinInvert { get; } = new (false);

    public FirmwareAxisValues Steps { get; } = new(MachineSettingUnits.StepsPerMillimeter);

    // Kp
    public FirmwareAxisValues KProportional { get; } = new(MachineSettingUnits.Pid);

    // Kd
    public FirmwareAxisValues KDerivative { get; } = new(MachineSettingUnits.Pid);

    // Ki
    public FirmwareAxisValues KIntegral { get; } = new(MachineSettingUnits.Pid);

    // IMax
    public FirmwareAxisValues Imax{ get; } = new(MachineSettingUnits.Pid);

    public List<FirmwareSetting> Settings => new() {
      StepPulse, StepIdleDelay, StepSignalInvert, StepDirectionInvert, StepEnableInvert, LimitPinsInvert, ProbePinInvert,
      Steps.X, Steps.Y, Steps.Z,
      KProportional.X, KProportional.Y, KProportional.Z,
      KDerivative.X, KDerivative.Y, KDerivative.Z,
      KIntegral.X, KIntegral.Y, KIntegral.Z,
      Imax.X, Imax.Y, Imax.Z,
    };
  }
}
