using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Machines.Observables {
  public class MachineTopicSet {
    public MachineSubscriptionTopic<MachineState> MachineState { get; } = new();

    public MachineSubscriptionTopic<MachineSetting> MachineSetting { get; } = new();

    public MachineSubscriptionTopic<MachineConfiguration> MachineConfiguration { get; } = new();
  }
}
