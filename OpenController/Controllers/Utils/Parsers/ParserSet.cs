using System.Collections.Generic;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Lib.Linq;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  public class ParserSet {
    // Generic command acknowledgement, e.g., "ok"
    internal Parser? Response { get; set; }

    // Connection message (startup)
    internal Parser? Welcome { get; set; }

    internal Parser? Firmware { get; set; }

    internal Parser? Alarm { get; set; }

    // Feedback to user
    internal Parser? Message { get; set; }

    internal Parser? Help { get; set; }

    // eg.g., work coordinates (G54-G59), predefined positions (G28, G30), tool length, probing
    internal Parser? Parameters { get; set; }

    // e.g., firmware settings
    internal Parser? Settings { get; set; }

    //
    internal Parser? Options { get; set; }

    internal List<Parser> ToList() =>
      new List<Parser?> {Response, Welcome, Firmware, Alarm, Message, Help, Parameters, Settings, Options}.SelectNonNull();
  }
}
