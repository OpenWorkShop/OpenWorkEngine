namespace OpenWorkEngine.OpenController.MachineProfiles.Enums {
  public enum MachineSettingType {
    KV = 0, // Arbitrary key+value pair.
    Grbl,   // e.g., $X=Y
    // -- normalized settings --
    // https://github.com/gnea/grbl/blob/master/doc/markdown/settings.md
    StepPulse,
    StepIdleDelay,
    StepPortInvert,
    DirectionPortInvert,
    StepEnableInvert,
    LimitPinsInvert,
    ProbePinInvert,
    StatusReport,
    JunctionDeviation,
    ArcTolerance,
    ReportInches,
    SoftLimits,
    HardLimits,
    HomingCycle,
    HomingDirectionInvert,
    HomingFeed,
    HomingSeek,
    HomingDebounce,
    HomingPullOff,
    MaxSpindleSpeed,
    MinSpindleSpeed,
    LaserMode,
    StepsX,
    StepsY,
    StepsZ,
    RateMaxX,
    RateMaxY,
    RateMaxZ,
    AccelerationX,
    AccelerationY,
    AccelerationZ,
    TravelMaxX,
    TravelMaxY,
    TravelMaxZ,
  }
}
