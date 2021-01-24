using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HotChocolate.Utilities;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Controllers.Services.Serial {
  internal class ConstantStringParser : Parser {
    private readonly Func<MachineOutputLine, MachineOutputLine> _applyPatch;

    private readonly bool _ignoreCase;
    private readonly string _str;

    public ConstantStringParser(
      string str, Func<MachineOutputLine, MachineOutputLine> applyPatch, bool ignoreCase = true
    ) {
      _str = str;
      _applyPatch = applyPatch;
      _ignoreCase = ignoreCase;
    }

    private bool Test(string line) => _ignoreCase ? _str.EqualsInvariantIgnoreCase(line) : _str.Equals(line);

    public override Task<MachineOutputLine> UpdateMachine(MachineOutputLine line) {
      if (!Test(line.Raw)) return Task.FromResult(line);
      return Task.FromResult(_applyPatch.Invoke(line));
    }
  }
}
