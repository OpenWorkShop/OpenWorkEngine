using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Grbl.Maslow {
  public class MaslowCommands : GrblCommands {
    public MaslowCommands(Controller controller) : base(controller) {
      SetCommandCode(nameof(Homing), "G21\nG90\nG0 Z5\nG0 X0 Y0");
    }
  }
}
