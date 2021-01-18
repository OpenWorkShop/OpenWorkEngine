using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  /// Active state of an applicator (data provided by machine)
  /// </summary>
  public record MachineApplicatorState : ApplicatorState {
    // CW / CCW
    public SpinDirection SpinDirection { get; set; } = SpinDirection.None;

    // Lasers, etc. can simply be on/off.
    public bool IsOn => SpinDirection != SpinDirection.None;
  }
}
