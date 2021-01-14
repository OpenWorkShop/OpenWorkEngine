namespace OpenWorkEngine.OpenController.Programs.Enums {
  // http://linuxcnc.org/docs/html/gcode/overview.html#cap:word
  public enum GCodeLetter {
    A,
    B,
    C,
    D, // Tool radius compensation
    F, // Feed rate
    G, // General
    H, // Tool length offset index
    I, // X offset for arcs & G87 canned cycles
    J, // Y " " "
    K, // Z " " "
    L, // Generic for G10, m66, etc.
    M, // Misc.
    N, // Line number
    P, // Dwell time in canned cycles with G4 / key used with G10
    Q, // Feed increment in G71, G83 canned cycles
    R, // Arc radius or canned cycle plane
    S, // Spindle speed
    T, // Tool selection
    U,
    V,
    W,
    X,
    Y,
    Z
  }
}
