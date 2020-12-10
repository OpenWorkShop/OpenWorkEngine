namespace OpenWorkEngine.OpenController.Ports.Enums {
  public enum PortState {
    Unplugged = -2,
    Error = -1,
    Ready,
    Opening,
    Startup,
    HasData,
    HasFirmware,
    Active,
  }
}
