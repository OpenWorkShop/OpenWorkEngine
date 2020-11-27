using System;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Ports.Services;

namespace OpenWorkEngine.OpenController.Machines.Graph {
  [ExtendObjectType(Name = "Subscription")]
  public class MachinesSubscription {
    private Exception GetPortException(string portName) {
      return new SystemException($"Port not found: {portName}");
    }

    [Subscribe(With = nameof(SubscribeToMachineConfiguration))]
    public ConnectedPort OnMachineConfiguration(
      [Service] PortManager ports,
      string portName,
      [EventMessage] string name,
      CancellationToken cancellationToken)
    {
      ports.Log.Information("[UPDATE] {name}", name);
      return ports[name].Connection ?? throw GetPortException(name);
    }

    public ValueTask<IObservable<MachineConfiguration>> SubscribeToMachineConfiguration(
      string portName,
      [Service] PortManager ports,
      [Service] ITopicEventReceiver eventReceiver,
      CancellationToken cancellationToken
    ) => Subscribe<MachineConfiguration>(portName, ports);

    [Subscribe(With = nameof(SubscribeToMachineState))]
    public ConnectedPort OnMachineState(
      [Service] PortManager ports,
      string portName,
      [EventMessage] string name,
      CancellationToken cancellationToken)
    {
      ports.Log.Information("[UPDATE] {name}", name);
      return ports[name].Connection ?? throw GetPortException(name);
    }

    public ValueTask<IObservable<MachineState>> SubscribeToMachineState(
      string portName,
      [Service] PortManager ports,
      [Service] ITopicEventReceiver eventReceiver,
      CancellationToken cancellationToken
    ) => Subscribe<MachineState>(portName, ports);

    private ValueTask<IObservable<T>> Subscribe<T>(string portName, PortManager ports) {
      ports.Log.Debug("[SUBSCRIBE] {portName} {type}", portName, typeof(T));
      return ValueTask.FromResult((IObservable<T>) ports.GetConnection(portName).Controller);
    }
  }
}
