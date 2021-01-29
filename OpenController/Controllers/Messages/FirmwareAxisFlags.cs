using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Messages {
  public record FirmwareAxisFlags {
    public bool X { get; internal set; } = false;
    public bool Y { get; internal set; } = false;
    public bool Z { get; internal set; } = false;
  }
}
