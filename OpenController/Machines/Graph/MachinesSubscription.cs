using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;

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

    [Subscribe(With = nameof(SubscribeToMachineStatus))]
    public ControlledMachine OnMachineStatus(
      [Service] ControllerManager controllers,
      string portName,
      [EventMessage] ControlledMachine state
    ) => state;

    public ValueTask<IObservable<ControlledMachine>> SubscribeToMachineStatus(
      string portName,
      [Service] ControllerManager controllers,
      CancellationToken cancellationToken
    ) => controllers.SubscribeToTopicId(MachineTopic.Status, portName, cancellationToken);

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
