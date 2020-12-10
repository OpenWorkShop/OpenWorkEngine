using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OpenWorkEngine.OpenController.Machines.Models;

using ParserAction = System.Action<
  OpenWorkEngine.OpenController.Controllers.Services.Controller?,
  OpenWorkEngine.OpenController.Machines.Models.ControlledMachine,
  System.Collections.Generic.Dictionary<string, string>
>;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  public class RegexParser : Parser {
    private readonly string _pattern;

    private readonly ParserAction _handler;

    public RegexParser(string pattern, ParserAction handler) {
      _pattern = pattern;
      _handler = handler;
    }

    public override Task UpdateMachine(Services.Controller? controller, ControlledMachine machine, string line) {
      machine.Log.Verbose("[CHECK] {pattern}", _pattern);
      foreach (Match match in Regex.Matches(line, _pattern, RegexOptions.IgnoreCase)) {
        Dictionary<string, string> captures = new();
        for (int i=0; i<match.Groups.Count; i++ ) {
          Group? group = match.Groups[i];
          if (!group.Captures.Any()) continue;
          captures.Add(group.Name, group.Captures.First().Value);
        }
        _handler.Invoke(controller, machine, captures);
      }
      return Task.CompletedTask;
    }
  }
}
