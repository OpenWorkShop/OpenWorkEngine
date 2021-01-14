namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  ///   Tracks the board's memory capacity and
  /// </summary>
  public class MachineBuffer {
    // Current execution point in the program
    public int LineNumber { get; internal set; } = 0;

    public int AvailableSend { get; set; } = 0;

    public int AvailableReceive { get; set; } = 0;
  }
}
