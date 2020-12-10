using System;

namespace OpenWorkEngine.OpenController.Lib.Observables {
  public interface ITopicStateMessage<TState> : ITopicMessage where TState : struct, Enum {
    public TState State { get; set; }

    public AlertError? Error { get; set; }
  }
}
