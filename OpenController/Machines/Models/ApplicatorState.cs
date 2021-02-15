using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  /// Represents a Spindle, Laser, or Hot-End configuration.
  /// Applicator (noun):
  ///   - a device used for inserting something [CNC] or for applying a substance to a surface [3DP]
  /// </summary>
  public record ApplicatorState {
    // How fast it's moving.
    public FirmwareSetting<decimal> FeedRate { get; } = FirmwareSetting.Define(0M);

    // On a 3DP, the hotend temperature. Could be used as a temperature sensor on CNC (?)
    public FirmwareSetting<decimal> Temperature { get; } = FirmwareSetting.Define(0M);

    // How fast it's rotating, if a spindle.
    public FirmwareSetting<decimal> SpinSpeed { get; } = FirmwareSetting.Define(0M);

    //
    public ModalSetting<MachineCoolantState> Coolant { get; } = FirmwareSetting.Modal(MachineCoolantState.None);
  }
}
