using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  /// Active state of an applicator (data provided by machine)
  /// </summary>
  public record MachineApplicatorState : ApplicatorState {
    // CW / CCW
    public ModalSetting<CircleDirection> SpinDirection { get; } = FirmwareSetting.Modal(CircleDirection.None);

    // Lasers, etc. can simply be on/off.
    public bool IsOn => SpinDirection.Data != CircleDirection.None;

    public FirmwareSetting<string> ToolId { get; } = FirmwareSetting.Define("");

    public MachinePosition? LengthOffset { get; internal set; }

    public ModalSetting<FactorType> LengthOffsetFactorType { get; } = FirmwareSetting.Modal(FactorType.None);

    public ModalSetting<ApplicatorRadiusCompensation> RadiusCompensation { get; } =
      FirmwareSetting.Modal(ApplicatorRadiusCompensation.None);

    public MachinePosition? ProbePosition { get; internal set; }
  }
}
