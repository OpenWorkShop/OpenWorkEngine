using System;
using System.Threading.Tasks;
using HotChocolate.Utilities;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  public class ConstantStringParser : Parser {
    private readonly string _str;

    private readonly bool _ignoreCase;

    private readonly Action<Machine> _applyPatch;

    public ConstantStringParser(string str, Action<Machine> applyPatch, bool ignoreCase = true) {
      _str = str;
      _applyPatch = applyPatch;
      _ignoreCase = ignoreCase;
    }

    private bool Test(string line) => _ignoreCase ? _str.EqualsInvariantIgnoreCase(line) : _str.Equals(line);

    public override Task PatchMachine(Machine machine, string line) {
      if (!Test(line)) return Task.CompletedTask;
      _applyPatch.Invoke(machine);
      return Task.CompletedTask;
    }
  }
}
