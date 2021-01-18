using System;
using System.Collections.Generic;
using System.Linq;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib.Observables {
  /// <summary>
  ///   A single broadcastable event (topic), like a state change.
  /// </summary>
  /// <typeparam name="T"></typeparam>
  public class SubscribableTopic<T> : IObservable<T> where T : ITopicMessage {
    private readonly List<IObserver<T>> _observers = new();

    public IDisposable Subscribe(IObserver<T> observer) => new TopicSubscription<T>(_observers, observer);

    public void Emit(T obj) {
      Log.Verbose("[EMIT] {type} to {count} observers: {obj}",
        typeof(T).ToString().Split('.').Last(), _observers.Count, obj.ToString());
      foreach (IObserver<T> obs in _observers) {
        Log.Verbose("[EMIT] observer {obs}", obs);
        obs.OnNext(obj);
      }
    }
  }
}
