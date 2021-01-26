using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using ParserAction = System.Func<
  OpenWorkEngine.OpenController.Controllers.Services.Controller?,
  OpenWorkEngine.OpenController.Machines.Models.ControlledMachine, System.Collections.Generic.Dictionary<string, string>,
  System.Collections.Generic.HashSet<OpenWorkEngine.OpenController.Machines.Enums.MachineTopic>?
>;

namespace OpenWorkEngine.OpenController.Controllers.Services.Serial {
  internal abstract class RegexParser : Parser {
    private readonly string _pattern;

    public RegexParser(string pattern) {
      _pattern = pattern;
    }

    protected abstract MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> data);

    public override Task<MachineOutputLine> UpdateMachine(MachineOutputLine line) {
      line.Log.Verbose("[CHECK] {pattern}", _pattern);
      MatchCollection matches = Regex.Matches(line.Raw, _pattern, RegexOptions.IgnoreCase);

      foreach (Match match in matches) {
        line = OnData(line, MatchToDictionary(match));
      }
      if (matches.Any()) {
        line = line.WithParsedResponse();
      }
      return Task.FromResult<MachineOutputLine>(line);
    }

    protected static MachineOutputLine CheckChange(
      MachineOutputLine line, int origHash, int newHash, MachineTopic topic
    ) {
      if (newHash == origHash) return line;
      line.Log.Verbose("[CHANGE] {topic}", topic.ToString());
      // Emitting state is batched by the controller.
      // controller?.Manager.GetSubscriptionTopic(topic).Emit(machine);
      return line.WithTopics(topic);
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
