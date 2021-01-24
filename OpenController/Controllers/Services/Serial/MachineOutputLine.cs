using System;
using System.Collections.Generic;
using Microsoft.Extensions.Logging.Abstractions;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers.Services.Serial {
  public class MachineOutputLine {
    public string Raw { get; }

    public Controller? Controller { get; }

    public ControlledMachine Machine { get; }

    private MachineLogEntry? _logEntry;

    public HashSet<MachineTopic>? Topics { get; private set; }

    //
    public bool WasParsed { get; private set; }

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
  }
}
