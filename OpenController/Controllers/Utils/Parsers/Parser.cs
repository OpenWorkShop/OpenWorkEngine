using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  public abstract class Parser {
    public abstract Task PatchMachine(Machine connection, string line);
  }
}
