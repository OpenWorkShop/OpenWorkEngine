using System;
using System.Linq;

namespace OpenWorkEngine.OpenController.Lib.Observables {
  public abstract class SubscriptionStateManager<TType, TMsg, TState> : SubscriptionManager<TType, TMsg>
    where TType : Enum where TMsg : ITopicStateMessage<TState> where TState : struct, Enum {
    public abstract TType StateTopic { get; }

    protected abstract TState ErrorState { get; }

    public TMsg EmitState(TMsg msg, TState? state = null) {
      if (state.HasValue) {
        if (!state.Value.Equals(msg.State))
          Log.Debug("[STATE] [{type}] {state}: {port}",
            typeof(TMsg).Name.Split('.').Last(), state.Value, msg.ToString());
        msg.State = state.Value;
        if (msg.State.Equals(ErrorState))
          msg.Error ??= new AlertError("Unknown", "Unknown error.");
        else
          msg.Error = null;
      }
      GetSubscriptionTopic(StateTopic).Emit(msg);
      return msg;
    }
  }
}
