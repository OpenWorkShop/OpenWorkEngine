using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Ports.Services;

namespace OpenWorkEngine.OpenController.Machines.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Subscription)]
  public class MachinesSubscription {
    [Subscribe(With = nameof(SubscribeToMachineConfiguration))]
    public ControlledMachine OnMachineConfiguration(
      [Service] ControllerManager controllers,
      string portName,
      [EventMessage] ControlledMachine config
    ) => config;

    public ValueTask<IObservable<ControlledMachine>> SubscribeToMachineConfiguration(
      string portName,
      [Service] ControllerManager controllers,
      CancellationToken cancellationToken
    ) => controllers.SubscribeToTopicId(MachineTopic.Configuration, portName, cancellationToken);

    [Subscribe(With = nameof(SubscribeToMachineState))]
    public ControlledMachine OnMachineState(
      [Service] ControllerManager controllers,
      string portName,
      [EventMessage] ControlledMachine state
    ) => state;

    public ValueTask<IObservable<ControlledMachine>> SubscribeToMachineState(
      string portName,
      [Service] ControllerManager controllers,
      CancellationToken cancellationToken
    ) => controllers.SubscribeToTopicId(MachineTopic.State, portName, cancellationToken);

    [Subscribe(With = nameof(SubscribeToMachineSetting))]
    public ControlledMachine OnMachineSetting(
      [Service] ControllerManager controllers,
      string portName,
      [EventMessage] ControlledMachine setting
    ) => setting;

    public ValueTask<IObservable<ControlledMachine>> SubscribeToMachineSetting(
      string portName,
      [Service] ControllerManager controllers,
      CancellationToken cancellationToken
    ) => controllers.SubscribeToTopicId(MachineTopic.Setting, portName, cancellationToken);
  }
}
