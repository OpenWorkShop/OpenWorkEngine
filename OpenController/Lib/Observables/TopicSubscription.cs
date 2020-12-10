using System;
using System.Collections.Generic;

namespace OpenWorkEngine.OpenController.Lib.Observables {
  public class TopicSubscription<T> : IDisposable where T : ITopicMessage {
    private readonly List<IObserver<T>> _observers;
    private readonly IObserver<T> _observer;

    public TopicSubscription(List<IObserver<T>> observers, IObserver<T> observer) {
      _observer = observer;
      _observers = observers;
      if (!_observers.Contains(_observer)) {
        _observers.Add(_observer);
      }
    }

    public void Dispose() {
      if (_observers.Contains(_observer)) {
        _observers.Remove(_observer);
      }
    }
  }
}
