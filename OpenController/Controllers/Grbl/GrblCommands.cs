using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils;

namespace OpenWorkEngine.OpenController.Controllers.Grbl {
  public class GrblCommands : Commands {
    public const string MoveTemplate = "${G:=0}${X}${Y}${Z}${A}${B}${C}";

    public GrblCommands(Controller controller) : base(controller) {
      SetCommandCode(nameof(GetHelp), "$$");
      SetCommandCode(nameof(GetSettings), "$$");
      SetCommandCode(nameof(EmergencyStop), "$X");
      SetCommandCode(nameof(Reset), "$X");
      SetCommandCode(nameof(GetFirmware), "$I");
      SetCommandCode(nameof(GetParameters), "$#");
      SetCommandCode(nameof(GetConfiguration), "$G");
      SetCommandCode(nameof(GetStatus), "?");
      SetCommandCode(nameof(Homing), "$H");
      SetCommandCode(nameof(Move), MoveTemplate);
    }
  }
}
