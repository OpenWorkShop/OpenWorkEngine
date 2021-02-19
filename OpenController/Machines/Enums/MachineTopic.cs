namespace OpenWorkEngine.OpenController.Machines.Enums {
  public enum MachineTopic {
    Status,
    Configuration,
    Setting,
    Log,
    Program,
  }

  public static class MachineTopicExtensions {
    public static double GetBatchInterval(this MachineTopic topic) {
      if (topic == MachineTopic.Status) return 0;
      if (topic == MachineTopic.Log) return 1000;
      return 100;
    }
  }
}
