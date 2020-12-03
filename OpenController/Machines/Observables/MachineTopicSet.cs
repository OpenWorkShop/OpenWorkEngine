using System;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Machines.Observables {
  public class MachineTopicSet {
    public SubscriptionTopic<MachineState> MachineState { get; } = new();

    public SubscriptionTopic<MachineSetting> MachineSetting { get; } = new();

    public SubscriptionTopic<MachineConfiguration> MachineConfiguration { get; } = new();
  }
}
