using System;
using System.Collections.Generic;
using System.Linq;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.ControllerSyntax {
  internal class FallbackParser : RegexParser {
    // Works for Grbl & Marlin & anything that puts the data between the []s
    // Should always be used as the last parser, because it is greedy.
    public FallbackParser() : base(@"^(?<open>\[)?(?<pre>\w+)?:?\s*(?<message>[^\]]+)(?<close>\])?$") { }

    protected virtual MachineOutputLine GetLine(MachineOutputLine line, string msg, string? pre, bool open, bool close) {
      // By default, only parse messages contained within brackets (complete lines).
      if (!open || !close) return line;

      string p = pre?.ToLowerInvariant() ?? "";
      if (!string.IsNullOrWhiteSpace(p) && !p.Equals("echo") && !p.Equals("msg") && !p.Equals("message")) {
        // Unknown prefix. Re-combine message.
        msg = $"{pre}:{msg}";
      }
      return line.WithLogEntry(MachineLogEntry.FromReadMessage(msg)).WithParsedResponse();
    }

    protected override MachineOutputLine OnData(
      MachineOutputLine line, Dictionary<string, string> values
    ) => GetLine(
      line,
      values["message"],
      values.ContainsKey("pre") ? values["pre"] : null,
      values.ContainsKey("open"),
      values.ContainsKey("close")
    );
  }
}
