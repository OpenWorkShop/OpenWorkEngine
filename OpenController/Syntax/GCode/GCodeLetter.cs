using System.Linq;

namespace OpenWorkEngine.OpenController.Syntax.GCode {
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

  public static class GCodeLetterExtensions {
    private static readonly GCodeLetter[] AxisLetters = new[] {
      GCodeLetter.A, GCodeLetter.B, GCodeLetter.C,
      GCodeLetter.U, GCodeLetter.V, GCodeLetter.W,
      GCodeLetter.X, GCodeLetter.Y, GCodeLetter.Z,
    };

    private static readonly GCodeLetter[] MovementLetters =
      AxisLetters.Concat(new[] {GCodeLetter.I, GCodeLetter.J, GCodeLetter.K, GCodeLetter.P}).ToArray();

    public static bool IsAxisLetter(this GCodeLetter letter) => AxisLetters.Contains(letter);

    public static bool IsMovementLetter(this GCodeLetter letter) => MovementLetters.Contains(letter);
  }
}
