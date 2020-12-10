using System.Threading;
using System.Threading.Tasks;
using HotChocolate.Execution;
using HotChocolate.Subscriptions;
using OpenWorkEngine.OpenController.Lib.Observables;
using OpenWorkEngine.OpenController.Machines.Interfaces;

namespace OpenWorkEngine.OpenController.Lib.Graphql {
  public static class TopicEventExtensions {
    // Send the model to two different possible listeners:
    // 1) The name of the topic, aka, everybody who cares about the type
    // 2) A specific listener on this type based upon some string ID
    public static async Task BroadcastTopic(this ITopicEventSender sender, ITopicMessage topicMessage, string? idBroadcast) {
      string typeName = topicMessage.GetType().Name;
      await sender.SendAsync(typeName, topicMessage);
      if (idBroadcast != null) {
        await sender.SendAsync($"{typeName}_{idBroadcast}", topicMessage);
      }
    }

    public static ValueTask<ISourceStream<T>> SubscribeTopicAll<T>(
      this ITopicEventReceiver receiver, CancellationToken ct
    ) where T : ITopicMessage {
      string typeName = typeof(T).Name;
      return receiver.SubscribeAsync<string, T>(typeName, ct);
    }

    public static ValueTask<ISourceStream<T>> SubscribeTopicId<T>(
      this ITopicEventReceiver receiver, string idBroadcast, CancellationToken ct
    ) where T : ITopicMessage {
      string typeName = typeof(T).Name;
      return receiver.SubscribeAsync<string, T>($"{typeName}_{idBroadcast}", ct);
    }
  }

}
