using System;
using System.Collections.Generic;
using OpenWorkEngine.OpenController.Machines.Interfaces;

namespace OpenWorkEngine.OpenController.Machines.Observables {
  public class MachineSubscriber<T> : IDisposable where T : ITopic {
    private readonly List<IObserver<T>> _observers;
    private readonly IObserver<T> _observer;

    public MachineSubscriber(List<IObserver<T>> observers, IObserver<T> observer) {
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
