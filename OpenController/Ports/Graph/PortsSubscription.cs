using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Subscriptions;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Lib;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Ports.Services;

namespace OpenWorkEngine.OpenController.Ports.Graph {
  [ExtendObjectType(Name = "Subscription")]
  public class PortsSubscription {
    [Subscribe(With = nameof(SubscribeToAllPortState))]
    [AuthorizeReadControllers]
    public SystemPort OnPortChange([EventMessage] SystemPort port) => port;

    public ValueTask<IObservable<SystemPort>> SubscribeToAllPortState(
      [Service] ControllerManager controllerManager,
      CancellationToken ct
    ) => controllerManager.Ports.SubscribeToAll(PortTopic.State, ct);

    // [Subscribe]
    // [AuthorizeReadControllers]
    // public Task<List<SystemPort>> OnPortList([EventMessage] List<SystemPort> portList, [Service] PortManager ports) {
    //   ports.Log.Information("[PORT] [LIST] {count}", ports.Map.Count);
    //   return Task.FromResult(portList);
    // }
    //
    // [Subscribe(With = nameof(SubscribeToPortState))]
    // public SystemPort OnPortState(
    //   [Service] PortManager ports,
    //   string portName,
    //   [EventMessage] SystemPort config,
    //   CancellationToken cancellationToken)
    // {
    //   ports.Log.Information("[MACHINE-CONFIG] {config}", config.ToString());
    //   return config;
    // }
    //
    // public ValueTask<IObservable<SystemPort>> SubscribeToPortState(
    //   string portName,
    //   [Service] PortManager ports,
    //   CancellationToken cancellationToken
    // ) {
    //   // SubscriptionTopic<SystemPort> portState = ports[portName].Topics.PortState;
    //   ports.Log.Information("[SUBSCRIBE] [PORT STATE] {portName}", portName);
    //   return ValueTask.FromResult<IObservable<SystemPort>>(portState);
    // }
  }
}
