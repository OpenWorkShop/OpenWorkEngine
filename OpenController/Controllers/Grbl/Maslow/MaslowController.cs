using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Ports.Models;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Maslow {
  /// <summary>
  /// A "Maslow" can be an Arduino Due with "real Grbl..."
  /// Or it can be an Arduino Mega, with the "classic" firmware.
  /// MaslowController overrides necessary components of Grbl to achieve the latter.
  /// </summary>
  public class MaslowController : GrblController {
    public MaslowController(ControllerManager controllerManager, ConnectedPort connection) : base(controllerManager, connection) { }
  }
}

