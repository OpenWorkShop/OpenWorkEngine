using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachineSpindle : SpindleState {
    // CW / CCW
    public SpinDirection Direction { get; set; } = SpinDirection.None;

    // Lasers, etc. can simply be on/off.
    public bool IsOn => Direction != SpinDirection.None;
  }
}
