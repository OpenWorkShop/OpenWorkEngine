using System;
using System.Collections.Generic;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using Serilog;

namespace OpenWorkEngine.OpenController.Machines.Observables {
  public class MachineSubscriptionTopic<T> : IObservable<T> where T : IPatchMachines {
    private readonly List<IObserver<T>> _observers = new();

    public void Emit(T obj) {
      Log.Debug("[EMIT] {type} to {count} observers: {obj}", typeof(T), _observers.Count, obj.ToString());
      foreach (IObserver<T> obs in _observers) {
        Log.Debug("[EMIT] observer {obs}", obs);
        obs.OnNext(obj);
      }
    }

    public IDisposable Subscribe(IObserver<T> observer) => new MachineSubscriber<T>(_observers, observer);
  }
}
