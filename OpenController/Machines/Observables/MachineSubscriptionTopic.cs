using System;
using System.Collections.Generic;
using OpenWorkEngine.OpenController.Machines.Interfaces;

namespace OpenWorkEngine.OpenController.Machines.Observables {
  public class MachineSubscriptionTopic<T> : IObservable<T> where T : IPatchMachines {
    private readonly List<IObserver<T>> _observers = new();

    public IDisposable Subscribe(IObserver<T> observer) => new MachineSubscriber<T>(_observers, observer);
  }
}
