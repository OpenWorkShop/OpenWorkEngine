using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Messages;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record FirmwarePinsSettings {
    public FirmwareSetting<decimal> StepPulse { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Microseconds);

    public FirmwareSetting<decimal> StepIdleDelay { get; } = FirmwareSetting.Define(0M, MachineSettingUnits.Milliseconds);

    public FirmwareSetting<AxisFlags> StepSignalInvert { get; } = FirmwareSetting.Define(new AxisFlags());

    public FirmwareSetting<AxisFlags> StepDirectionInvert { get; } = FirmwareSetting.Define(new AxisFlags());

    public FirmwareSetting<bool> StepEnableInvert { get; } = FirmwareSetting.Define (false);

    public FirmwareSetting<bool> LimitPinsInvert { get; } = FirmwareSetting.Define (false);

    public FirmwareSetting<bool> ProbePinInvert { get; } = FirmwareSetting.Define (false);

    public FirmwareAxisValues Steps { get; } = new(MachineSettingUnits.StepsPerMillimeter);

    // Kp
    public FirmwareAxisValues KProportional { get; } = new(MachineSettingUnits.Pid);

    // Kd
    public FirmwareAxisValues KDerivative { get; } = new(MachineSettingUnits.Pid);

    // Ki
    public FirmwareAxisValues KIntegral { get; } = new(MachineSettingUnits.Pid);

    // IMax
    public FirmwareAxisValues Imax{ get; } = new(MachineSettingUnits.Pid);

    public List<FirmwareSetting> Settings =>
      FirmwareSettings.GetSortedList(
        Steps.Settings
             .Union(KProportional.Settings)
             .Union(KDerivative.Settings)
             .Union(KIntegral.Settings)
             .Union(Imax.Settings)
             .Union(new List<FirmwareSetting>() {
                StepPulse, StepIdleDelay, StepSignalInvert, StepDirectionInvert,
                StepEnableInvert, LimitPinsInvert, ProbePinInvert
              }));
  }
}
