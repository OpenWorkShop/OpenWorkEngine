using System.Collections.Generic;
using System.Threading.Tasks;
using HotChocolate.Subscriptions;
using OpenWorkEngine.OpenController.Ports.Graph;
using OpenWorkEngine.OpenController.Ports.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Ports.Extensions {
  public static class TopicEventSenderExtensions {
    public static ValueTask OnPortStatus(this ITopicEventSender sender, SystemPort port) {
      return sender.SendAsync(nameof(PortsSubscription.OnPortChange), port);
    }
    //
    // public static ValueTask OnPortList(this ITopicEventSender sender, List<SystemPort> portList) {
    //   return sender.SendAsync(nameof(PortsSubscription.OnPortList), portList);
    // }
  }
}
