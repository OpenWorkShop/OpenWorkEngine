using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OpenWorkEngine.OpenController.Lib {
  public interface ICurrentUser<TProfile> {
    string? UserId { get; }

    public bool IsAuthenticated { get; }

    public List<string> Claims { get; }

    public Task<TProfile?> LoadProfile();
  }

  public static class CurrentUserExtensions {
    public static async Task<TProfile> GetProfile<TProfile>(this ICurrentUser<TProfile> user) {
      return (await user.LoadProfile()) ??
        throw new UnauthorizedAccessException($"User '{user.UserId}' could not be found.");
    }
  }
}
