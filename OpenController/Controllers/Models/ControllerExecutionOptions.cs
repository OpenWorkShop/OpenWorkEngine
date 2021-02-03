using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Models {
  /// <summary>
  /// When executing one or more controller commands, these are options for the Script/execution
  /// </summary>
  public class ControllerExecutionOptions {
    public object? Args { get; internal init; } = null;

    public MachineLogLevel LogLevel { get; internal init; } = MachineLogLevel.Inf;

    public bool AwaitResponse { get; internal init; } = false;

    public string? Source { get; internal init; }

    public string? Comment { get; internal init; }
  }
}
