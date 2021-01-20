using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Utils;

namespace OpenWorkEngine.OpenController.Controllers.Grbl {
  public class GrblCommands : Commands {
    public const string MoveTemplate = "${G:=0}${X}${Y}${Z}${A}${B}${C}";

    public GrblCommands(Controller controller) : base(controller) {
      SetCommandCode(nameof(GetHelp), "$$");
      SetCommandCode(nameof(GetSettings), "$$");
      SetCommandCode(nameof(Unlock), "$X"); // kill alarm
      SetCommandCode(nameof(GetFirmware), "$I"); // build info
      SetCommandCode(nameof(GetParameters), "$#"); //
      SetCommandCode(nameof(GetConfiguration), "$G"); // Parser state
      SetCommandCode(nameof(CheckCode), "$C"); // GCode mode
      SetCommandCode(nameof(GetStartup), "$N"); // Startup blocks
      SetCommandCode(nameof(Homing), "$H");
      SetCommandCode(nameof(GetStatus), "?", true);
      SetCommandCode(nameof(Pause), "!", true);
      SetCommandCode(nameof(Play), "~", true);
      SetCommandCode(nameof(Reset), "\u0018", true); // ctrl+x
      SetCommandCode(nameof(Move), MoveTemplate);
    }
  }
}
