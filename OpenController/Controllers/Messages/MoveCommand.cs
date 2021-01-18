using Newtonsoft.Json;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Messages {
  /// <summary>
  /// Defaults to the current modal motion type.
  /// </summary>
  public record MoveCommand : MachinePosition {
    [JsonProperty("G")]
    public MachineMotionType? MotionType { get; set; }

    public MovementDistanceType DistanceType { get; set; }
  }
}
