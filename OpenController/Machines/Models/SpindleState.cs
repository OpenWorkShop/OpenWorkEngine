namespace OpenWorkEngine.OpenController.Machines.Models {
  public record SpindleState {
    // How fast it's moving.
    public decimal FeedRate { get; set; }

    // How fast it's rotating.
    public decimal SpinSpeed { get; set; }

    //
    public bool IsFloodCoolantEnabled { get; set; } = false;

    //
    public bool IsMistCoolantEnabled { get; set; } = false;
  }
}
