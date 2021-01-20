using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

using ParserAction = System.Func<
  OpenWorkEngine.OpenController.Controllers.Services.Controller?,
  OpenWorkEngine.OpenController.Machines.Models.ControlledMachine, System.Collections.Generic.Dictionary<string, string>,
  System.Collections.Generic.HashSet<OpenWorkEngine.OpenController.Machines.Enums.MachineTopic>?
>;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  internal class RegexParser : Parser {
    private readonly ParserAction _handler;
    private readonly string _pattern;

    public RegexParser(string pattern, ParserAction handler) {
      _pattern = pattern;
      _handler = handler;
    }

    public override Task<HashSet<MachineTopic>?> UpdateMachine(Controller? controller, ControlledMachine machine, string line) {
      machine.Log.Verbose("[CHECK] {pattern}", _pattern);
      MatchCollection matches = Regex.Matches(line, _pattern, RegexOptions.IgnoreCase);
      if (!matches.Any()) return Task.FromResult<HashSet<MachineTopic>?>(null);
      HashSet<MachineTopic> ret = new HashSet<MachineTopic>();
      foreach (Match match in Regex.Matches(line, _pattern, RegexOptions.IgnoreCase)) {
        HashSet<MachineTopic>? vals = _handler.Invoke(controller, machine, MatchToDictionary(match));
        if (vals != null) {
          ret.UnionWith(vals);
        }
      }
      return Task.FromResult<HashSet<MachineTopic>?>(ret);
    }

    protected static HashSet<MachineTopic> BroadcastChange(
      Controller? controller, ControlledMachine machine, int origHash, int newHash, MachineTopic topic
    ) {
      if (newHash == origHash) return new HashSet<MachineTopic>();
      machine.Log.Verbose("[CHANGE] {topic}", topic.ToString());
      controller?.Manager.GetSubscriptionTopic(topic).Emit(machine);
      return new HashSet<MachineTopic>() { topic };
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
