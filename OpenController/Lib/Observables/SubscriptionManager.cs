using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Observables {
  public abstract class SubscriptionManager<TType, TMsg> where TType : Enum where TMsg : ITopicMessage {
    public abstract ILogger Log { get; }

    private readonly ConcurrentDictionary<string, SubscriptionTopic<TMsg>> _topics = new();

    public SubscriptionTopic<TMsg> GetSubscriptionTopic(TType msgType) =>
      _topics.GetOrAdd(msgType.ToString(), new SubscriptionTopic<TMsg>());

    public ValueTask<IObservable<TMsg>> SubscribeToAll(TType msgType, CancellationToken ct) {
      Log.Debug("[SUBSCRIPTION] create for ALL: {msgType}", msgType);
      return ValueTask.FromResult<IObservable<TMsg>>(
        GetSubscriptionTopic(msgType).AllMessages
      );
    }

    public ValueTask<IObservable<TMsg>> SubscribeToTopicId(TType msgType, string topicId, CancellationToken ct) {
      Log.Debug("[SUBSCRIPTION] create for: {msgType}#{topicId}", msgType, topicId);
      return ValueTask.FromResult<IObservable<TMsg>>(
        GetSubscriptionTopic(msgType).WithTopicId(topicId)
      );
    }
  }
}
