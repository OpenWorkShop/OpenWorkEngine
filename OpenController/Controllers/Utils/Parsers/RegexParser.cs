using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Machines.Models;
using ParserAction = System.Action<
  OpenWorkEngine.OpenController.Controllers.Services.Controller?,
  OpenWorkEngine.OpenController.Machines.Models.ControlledMachine, System.Collections.Generic.Dictionary<string, string>
>;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  internal class RegexParser : Parser {
    private readonly ParserAction _handler;
    private readonly string _pattern;

    public RegexParser(string pattern, ParserAction handler) {
      _pattern = pattern;
      _handler = handler;
    }

    public override Task<bool> UpdateMachine(Controller? controller, ControlledMachine machine, string line) {
      machine.Log.Verbose("[CHECK] {pattern}", _pattern);
      bool matched = false;
      foreach (Match match in Regex.Matches(line, _pattern, RegexOptions.IgnoreCase)) {
        _handler.Invoke(controller, machine, MatchToDictionary(match));
        matched = true;
      }
      return Task.FromResult(matched);
    }

    public static Dictionary<string, string> MatchToDictionary(Match match) {
      Dictionary<string, string> captures = new();
      for (int i = 0; i < match.Groups.Count; i++) {
        Group? group = match.Groups[i];
        if (!group.Captures.Any()) continue;
        captures.Add(group.Name, group.Captures.First().Value);
      }
      return captures;
    }
  }
}
