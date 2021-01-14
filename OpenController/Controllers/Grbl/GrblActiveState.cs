using OpenWorkEngine.OpenController.Machines.Enums;

namespace OpenWorkEngine.OpenController.Controllers.Grbl {
  public enum GrblActiveState {
    Idle = 0,
    Run,
    Hold,
    Door,
    Home,
    Sleep,
    Alarm,
    Check
  }

  public static class GrblActiveStateExtensions {
    public static ActiveState ToActiveState(this GrblActiveState state) {
      if (state == GrblActiveState.Idle) return ActiveState.IdleReady;
      if (state == GrblActiveState.Alarm) return ActiveState.Alarm;
      if (state == GrblActiveState.Check) return ActiveState.Check;
      if (state == GrblActiveState.Door) return ActiveState.Door;
      if (state == GrblActiveState.Hold) return ActiveState.Hold;
      if (state == GrblActiveState.Home) return ActiveState.Home;
      if (state == GrblActiveState.Run) return ActiveState.Run;
      if (state == GrblActiveState.Sleep) return ActiveState.Sleep;
      return ActiveState.Initializing;
    }
  }
}
