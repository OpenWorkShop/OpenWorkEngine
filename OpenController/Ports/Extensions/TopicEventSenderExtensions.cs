using System.Threading.Tasks;
using HotChocolate.Subscriptions;
using OpenWorkEngine.OpenController.Ports.Graph;

namespace OpenWorkEngine.OpenController.Ports.Extensions {
  public static class TopicEventSenderExtensions {
    public static ValueTask OnPortStatus(this ITopicEventSender sender, string portName) {
      return sender.SendAsync(nameof(PortsSubscription.OnPortStatus), portName);
    }
  }
}
