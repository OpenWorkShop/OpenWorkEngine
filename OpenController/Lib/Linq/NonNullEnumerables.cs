using System;
using System.Collections.Generic;
using System.Linq;

namespace OpenWorkEngine.OpenController.Lib.Linq {
  public static class NonNullEnumerables {
    public static List<T> SelectNonNull<T>(this IEnumerable<T?> items) {
      List<T> nonEmpty = new List<T>();
      foreach (T? t in items) {
        if (t != null) {
          nonEmpty.Add(t);
        }
      }
      return nonEmpty;
    }
  }
}
