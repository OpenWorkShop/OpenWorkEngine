using System;
using System.Collections.Concurrent;

namespace OpenWorkEngine.OpenController.Lib.Observables {
  /// <summary>
  /// Group of SubscriptionTopics of the same kind.
  /// Can subscribe to a specific object ID, or all objects.
  /// </summary>
  public class SubscriptionTopic<T> : ConcurrentDictionary<string, SubscribableTopic<T>> where T : ITopicMessage {
    private readonly ConcurrentDictionary<string, SubscribableTopic<T>> _topics = new();

    internal SubscribableTopic<T> EnsureTopic(string? idOrAll) =>
      _topics.GetOrAdd(idOrAll ?? "", new SubscribableTopic<T>());

    public SubscribableTopic<T> AllMessages => EnsureTopic(null);

    public SubscribableTopic<T> WithTopicId(string msgId) => EnsureTopic(msgId);

    public IDisposable SubscribeAll(IObserver<T> observer) => AllMessages.Subscribe(observer);

    public IDisposable SubscribeToTopicId(string msgId, IObserver<T> observer) => EnsureTopic(msgId).Subscribe(observer);

    public void Emit(T msg) {
      if (_topics.TryGetValue("", out SubscribableTopic<T>? allTopic)) {
        allTopic.Emit(msg);
      }
      if (_topics.TryGetValue(msg.TopicId, out SubscribableTopic<T>? idTopic)) {
        idTopic.Emit(msg);
      }
    }
  }
}
