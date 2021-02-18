using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  /// Active state of an applicator (data provided by machine)
  /// </summary>
  public record MachineApplicatorState : ApplicatorState {
    // CW / CCW
    public ModalSetting<ApplicatorSpinDirection> SpinDirection { get; } =
      FirmwareSetting.Modal(ApplicatorSpinDirection.None);

    // Lasers, etc. can simply be on/off.
    public bool IsOn => SpinDirection.Data != ApplicatorSpinDirection.None;

    public FirmwareSetting<string> ToolId { get; } = FirmwareSetting.Define("");

    public MachinePosition? LengthOffset { get; internal set; }

    public ModalSetting<FactorType> LengthOffsetFactorType { get; } = FirmwareSetting.Modal(FactorType.None);

    public ModalSetting<ApplicatorRadiusCompensation> RadiusCompensation { get; } =
      FirmwareSetting.Modal(ApplicatorRadiusCompensation.None);

    public MachinePosition? ProbePosition { get; internal set; }
  }
}
