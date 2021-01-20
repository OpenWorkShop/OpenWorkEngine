using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HotChocolate.Utilities;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Utils.Parsers {
  internal class ConstantStringParser : Parser {
    private readonly Func<Controller?, ControlledMachine, HashSet<MachineTopic>?> _applyPatch;

    private readonly bool _ignoreCase;
    private readonly string _str;

    public ConstantStringParser(
      string str, Func<Controller?, ControlledMachine, HashSet<MachineTopic>?> applyPatch, bool ignoreCase = true
    ) {
      _str = str;
      _applyPatch = applyPatch;
      _ignoreCase = ignoreCase;
    }

    private bool Test(string line) => _ignoreCase ? _str.EqualsInvariantIgnoreCase(line) : _str.Equals(line);

    public override Task<HashSet<MachineTopic>?> UpdateMachine(Controller? controller, ControlledMachine machine, string line) {
      if (!Test(line)) return Task.FromResult<HashSet<MachineTopic>?>(null);
      return Task.FromResult(_applyPatch.Invoke(controller, machine));
    }
  }
}
