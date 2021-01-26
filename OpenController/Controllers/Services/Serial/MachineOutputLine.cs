using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging.Abstractions;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Syntax;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Services.Serial {
  internal class MachineOutputLine {
    internal string Raw { get; }

    internal Controller? Controller { get; }

    internal ControlledMachine Machine { get; }

    internal HashSet<MachineTopic>? Topics { get; private set; }

    //
    public bool WasParsed { get; private set; }

    private bool _finished;

    private MachineLogEntry? _logEntry;

    internal ILogger Log => Machine.Log;

    public MachineOutputLine(string line, ControlledMachine machine, Controller? controller) {
      Raw = line;
      Machine = machine;
      Controller = controller;
    }

    public MachineOutputLine WithTopics(params MachineTopic[] topics) {
      if (Topics == null) Topics = new();
      Topics.UnionWith(topics);
      return this;
    }

    public MachineOutputLine WithLogEntry(MachineLogEntry entry) {
      if (_logEntry != null) throw new ArgumentException($"Log entry already provided for {Raw}");
      _logEntry = entry;
      Machine.AddLogEntry(entry);
      return WithTopics(MachineTopic.Log);
    }

    public MachineOutputLine WithParsedResponse() {
      WasParsed = true;
      return this;
    }

    public MachineOutputLine Finish() {
      if (!WasParsed) {
        // Should be prevented by serial buffer
        throw new SystemException($"Line was never parsed: {Raw}");
      }
      if (_finished) {
        throw new SystemException($"Line was already finished: {Raw}");
      }
      _finished = true;
      return this;
    }
  }
}
