using System.Collections.Generic;
using System.Linq;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax.GCode;
using OpenWorkEngine.OpenController.Syntax.GCode.Extensions;

namespace OpenWorkEngine.OpenController.ControllerSyntax.Grbl {
  internal class GrblConfigParser : RegexParser {
    public GrblConfigParser() : base(@"^\[(?:GC:)?(?<data>(?:[a-zA-Z][0-9]+(?:\.[0-9]*)?\s*)+)\]$") { }

    protected override MachineOutputLine OnData(MachineOutputLine line, Dictionary<string, string> values) {
      ControlledMachineHash hash = line.Machine.SnapshotHash();

      string data = values["data"];
      line.Machine.Log.Debug("[CONFIG] {data}", data.Trim());

      GCodeBlock block = new GCodeBlock(data, "config");
      CompiledInstruction inst = block.Compile();
      List<InstructionStep> steps = inst.GetSteps(line.Machine);
      foreach (InstructionStep step in steps) {
        step.Apply();
      }

      return line.WithTopics(line.Machine.GetMachineChanges(hash).ToArray());
    }
  }
}
