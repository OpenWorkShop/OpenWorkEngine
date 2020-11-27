namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  /// Conveniently matches the Name/Message interface of a client side error.
  /// But represents an alarm/error from a controller.
  /// </summary>
  public class MachineAlert {
    public string Code { get; set; } = default!;

    public string Name { get; set; } = default!;

    public string Message { get; set; } = default!;
  }
}
