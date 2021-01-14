namespace OpenWorkEngine.OpenController.MachineProfiles.Enums {
  public enum MachineSpecType {
    MaxTravelSpeed, // max speed of endmill/hotend (mm/min)
    Watts,          // e.g., laser might be 5.5W "rated" but the draw could be more.
    MaxWatts,
    MaxAmps,
    MaxVolts,

    // LimitSwitches,
    WaveLength, // (nm, for lasers)
    TipSize,    // mm, e.g., nozzle size, endmill size.

    // --- cnc only ---
    MaxRpm,

    // --- 3dp only ---
    MinLayerHeight,   // (mm)
    MaxLayerHeight,   // (mm)
    MaxTemp,          // (c)
    NumberOfMaterials // int >= 1
  }
}
