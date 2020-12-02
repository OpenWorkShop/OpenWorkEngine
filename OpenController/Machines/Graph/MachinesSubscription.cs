using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Machines.Observables;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Ports.Services;

namespace OpenWorkEngine.OpenController.Machines.Graph {
  [ExtendObjectType(Name = "Subscription")]
  public class MachinesSubscription {
    private Exception GetPortException(string portName) {
      return new SystemException($"Port not found: {portName}");
    }

    [Subscribe(With = nameof(SubscribeToMachineConfiguration))]
    public MachineConfiguration OnMachineConfiguration(
      [Service] PortManager ports,
      string portName,
      [EventMessage] MachineConfiguration config,
      CancellationToken cancellationToken)
    {
      ports.Log.Information("[MACHINE-CONFIG] {config}", config.ToString());
      return config;
    }

    public ValueTask<IObservable<MachineConfiguration>> SubscribeToMachineConfiguration(
      string portName,
      [Service] PortManager ports,
      [Service] ITopicEventReceiver eventReceiver,
      CancellationToken cancellationToken
    ) {
      MachineSubscriptionTopic<MachineConfiguration> machineConfig =
        ports.GetConnection(portName).Machine.Topics.MachineConfiguration;
      ports.Log.Information("[SUBSCRIBE] [CONFIG] {portName}: {@machineConfig}", portName, machineConfig);
      return ValueTask.FromResult<IObservable<MachineConfiguration>>(machineConfig);
    }

    [Subscribe(With = nameof(SubscribeToMachineState))]
    public MachineState OnMachineState(
      [Service] PortManager ports,
      string portName,
      [EventMessage] MachineState state,
      CancellationToken cancellationToken)
    {
      ports.Log.Information("[MACHINE-STATE] {state}", state.ToString());
      return state;
    }

    public ValueTask<IObservable<MachineState>> SubscribeToMachineState(
      string portName,
      [Service] PortManager ports,
      [Service] ITopicEventReceiver eventReceiver,
      CancellationToken cancellationToken
    ) => ValueTask.FromResult<IObservable<MachineState>>(ports.GetConnection(portName).Machine.Topics.MachineState);

    [Subscribe(With = nameof(SubscribeToMachineSetting))]
    public MachineSetting OnMachineSetting(
      [Service] PortManager ports,
      string portName,
      [EventMessage] MachineSetting setting,
      CancellationToken cancellationToken)
    {
      ports.Log.Information("[MACHINE-SETTING] {setting}", setting.ToString());
      return setting;
    }

    public ValueTask<IObservable<MachineSetting>> SubscribeToMachineSetting(
      string portName,
      [Service] PortManager ports,
      [Service] ITopicEventReceiver eventReceiver,
      CancellationToken cancellationToken
    ) => ValueTask.FromResult<IObservable<MachineSetting>>(ports.GetConnection(portName).Machine.Topics.MachineSetting);
  }
}
