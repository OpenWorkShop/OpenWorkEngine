namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  /// Represents a Spindle, Laser, or Hot-End configuration.
  /// Applicator (noun):
  ///   - a device used for inserting something [CNC] or for applying a substance to a surface [3DP]
  /// </summary>
  public record ApplicatorState {
    // How fast it's moving.
    public decimal FeedRate { get; set; }

    // On a 3DP, the hotend temperature. Could be used as a temperature sensor on CNC (?)
    public decimal? Temperature { get; set; }

    // How fast it's rotating, if a spindle.
    public decimal SpinSpeed { get; set; }

    //
    public bool IsFloodCoolantEnabled { get; set; } = false;

    //
    public bool IsMistCoolantEnabled { get; set; } = false;
  }
}
