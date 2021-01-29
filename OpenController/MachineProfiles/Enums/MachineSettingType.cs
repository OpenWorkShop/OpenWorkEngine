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
    Steps,        // X/Y/Z
    RateMax,      // X/Y/Z
    Acceleration, // X/Y/Z
    TravelMax,    // X/Y/Z
    // Maslow...
    TravelMin,    // X/Y/Z
    PidKp,        // X/Y/Z
    PidKi,        // X/Y/Z
    PidKd,        // X/Y/Z
    Imax,
    ChainOverSprocket,
    MachineSize,  // X/Y (e.g., workspace)
    DistBetweenMotors,
    MotorOffsetY,
    AxisScale, // X/Y/Z
    ChainSagCorrection,
    ChainToleranceLeft,
    ChainToleranceRight,
    RotationDiskRadius,
    ChainLength,
    SimpleKinematics,
    ApplicatorWeight,
    ChainElongationFactor,
  }
}
