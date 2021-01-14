using System;
using System.Threading.Tasks;
using HotChocolate.Utilities;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  public class ConstantStringParser : Parser {
    private readonly Action<ControlledMachine> _applyPatch;

    private readonly bool _ignoreCase;
    private readonly string _str;

    public ConstantStringParser(string str, Action<ControlledMachine> applyPatch, bool ignoreCase = true) {
      _str = str;
      _applyPatch = applyPatch;
      _ignoreCase = ignoreCase;
    }

    private bool Test(string line) => _ignoreCase ? _str.EqualsInvariantIgnoreCase(line) : _str.Equals(line);

    public override Task<bool> UpdateMachine(Controller? controller, ControlledMachine machine, string line) {
      if (!Test(line)) return Task.FromResult(false);
      _applyPatch.Invoke(machine);
      return Task.FromResult(true);
    }
  }
}
