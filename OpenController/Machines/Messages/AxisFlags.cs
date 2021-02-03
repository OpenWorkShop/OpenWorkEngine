namespace OpenWorkEngine.OpenController.Machines.Messages {
  public record AxisFlags {
    internal const int X_FLAG = (1 << 0);
    internal const int Y_FLAG = (1 << 1);
    internal const int Z_FLAG = (1 << 2);

    public bool X { get; internal set; } = false;
    public bool Y { get; internal set; } = false;
    public bool Z { get; internal set; } = false;

    internal static AxisFlags FromMask(int mask) => new AxisFlags() {
      X = (mask & X_FLAG) != 0,
      Y = (mask & Y_FLAG) != 0,
      Z = (mask & Z_FLAG) != 0,
    };

    internal int ToMask() => (X ? X_FLAG : 0) + (Y ? Y_FLAG : 0) + (Z ? Z_FLAG : 0);
  }
}
