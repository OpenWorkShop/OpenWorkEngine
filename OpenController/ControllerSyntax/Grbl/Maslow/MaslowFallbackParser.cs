using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl.Maslow {
  internal class MaslowFallbackParser : FallbackParser {
    protected override MachineOutputLine GetLine(
      MachineOutputLine line, string msg, string? pre, bool open, bool close
    ) {
      if (msg.Contains("Unable to find valid machine position for chain lengths")) {
        // Unique maslow message is, in effect, an error.
        MachineLogEntry entry =
          GrblResponseParser.GetAlertEntry(GrblError.Unknown, "Failed to compute position.", false);
        return line.WithLogEntry(entry)
                   .WithParsedResponse();
      }
      return base.GetLine(line, msg, pre, open, close);
    }
  }
}
