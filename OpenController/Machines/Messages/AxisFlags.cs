namespace OpenWorkEngine.OpenController.Machines.Messages {
  public record AxisFlags {
    internal const int XFlag = (1 << 0);
    internal const int YFlag = (1 << 1);
    internal const int ZFlag = (1 << 2);

    public bool X { get; internal set; } = false;
    public bool Y { get; internal set; } = false;
    public bool Z { get; internal set; } = false;

    internal static AxisFlags FromMask(int mask) => new AxisFlags() {
      X = (mask & XFlag) != 0,
      Y = (mask & YFlag) != 0,
      Z = (mask & ZFlag) != 0,
    };

    internal int ToMask() => (X ? XFlag : 0) + (Y ? YFlag : 0) + (Z ? ZFlag : 0);
  }
}
