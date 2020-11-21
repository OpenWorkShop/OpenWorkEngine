namespace OpenWorkEngine.OpenController.MachineProfiles.Enums {
  public enum MachineCategory {
    CNC,
    TDP, // "3DP" can't start with a number
  }

  public static class MachineCategoryExtensions {
    public static string ToShortString(this MachineCategory cat) {
      if (cat == MachineCategory.TDP) return "3DP";
      return cat.ToString();
    }
  }
}
