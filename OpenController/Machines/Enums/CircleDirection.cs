namespace OpenWorkEngine.OpenController.Machines.Enums {
  /// <summary>
  ///   Also reperenents an on/off state, i.e., for lasers.
  ///   Simply cast the enum to a bool for "On."
  /// </summary>
  public enum CircleDirection {
    Ccw = -1,
    None = 0,
    Cw = 1
  }
}
