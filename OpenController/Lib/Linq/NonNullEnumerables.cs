using System.Collections.Generic;

namespace OpenWorkEngine.OpenController.Lib.Linq {
  public static class NonNullEnumerables {
    public static List<T> SelectNonNull<T>(this IEnumerable<T?> items) {
      List<T> nonEmpty = new();
      foreach (T? t in items)
        if (t != null)
          nonEmpty.Add(t);
      return nonEmpty;
    }
  }
}
