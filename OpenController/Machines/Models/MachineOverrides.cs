namespace OpenWorkEngine.OpenController.Machines.Models {
  public record MachineOverrides {
    public decimal Feed { get; internal set; } = 100;

    public bool FeedAllowed { get; internal set; } = true;

    public decimal Rapids { get; internal set; } = 100;

    public decimal Speed { get; internal set; } = 100;

    public bool SpeedAllowed { get; internal set; } = true;

    public override string ToString() => $"<OV:F{Feed}:R{Rapids}:S{Speed}>";
  }
}
