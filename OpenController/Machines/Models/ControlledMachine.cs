using System.Collections.Generic;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Messages;
using OpenWorkEngine.OpenController.Ports.Messages;
using Serilog;

namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  ///
  /// </summary>
  public class ControlledMachine : ITopicMessage {
    internal ILogger Log { get; }

    public string TopicId => PortName;

    public MachineTopic LastTopic { get; internal set; }

    // Used for keying of messages related to this machine.
    internal string PortName { get; }

    // Controllers are internal concepts. The type is all that is exposed to the API.
    public FirmwareRequirement FirmwareRequirement { get; }

    public string? MachineProfileId { get; }

    public MachineState State { get; } = new();

    public MachineConfiguration Configuration { get; } = new();

    public List<MachineSetting> Settings { get; } = new();

    public ControlledMachine(string portName, IMachineConnectionSettings? opts, ILogger log) {
      PortName = portName;
      if (opts != null) {
        IMachineFirmwareRequirement req = opts.GetFirmwareRequirement();
        FirmwareRequirement = new FirmwareRequirement() {
          ControllerType = req.ControllerType,
          Name = req.Name,
          Edition = req.Edition,
          HelpUrl =  req.HelpUrl,
          DownloadUrl = req.DownloadUrl,
          SuggestedVersion = req.SuggestedVersion,
          RequiredVersion = req.RequiredVersion,
        };
        MachineProfileId = opts.MachineProfileId;
      } else {
        FirmwareRequirement = new FirmwareRequirement() {
          RequiredVersion = 0,
          SuggestedVersion = 0,
        };
      }
      Log = log.ForContext("portName", portName)
               .ForContext("machineProfileId", MachineProfileId);
    }
  }
}
