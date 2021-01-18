using System.Collections.Generic;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Lib.Linq;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  public class ParserSet {
    internal Parser? WelcomeParser { get; set; }

    internal Parser? FirmwareParser { get; set; }

    internal List<Parser> ToList() =>
      new List<Parser?> {WelcomeParser, FirmwareParser}.SelectNonNull();
    //
    // public async Task<bool> Update(Controller? controller, ControlledMachine machine, string line) {
    //   for (int i = 0; i < Polls.Count; i++) await Polls[i].Parse(controller, machine, line);
    //   foreach (Parser parser in ToList()) await parser.UpdateMachine(controller, machine, line);
    //
    //   return false;
    // }
  }
}
