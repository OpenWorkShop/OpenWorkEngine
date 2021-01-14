using System;
using System.Collections.Concurrent;
using OpenWorkEngine.OpenController.Identity.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Identity.Services {
  // Global singleton DI class for in-memory session management.
  public class SessionManager {
    public SessionManager(ILogger logger) => Log = logger.ForContext(typeof(SessionManager));

    public ILogger Log { get; }

    public ConcurrentDictionary<string, OpenControllerSession> Sessions { get; } = new();

    public OpenControllerSession LoadSession(string token, OpenControllerUser user, params string[] roles) {
      OpenControllerSession session = Sessions.AddOrUpdate(token, s => {
        OpenControllerSession newSession = new() {Token = s, User = user, Roles = roles};
        Log.Debug("[SESSION] create: {session}", newSession.ToString());
        return newSession;
      }, (s, existingSession) => {
        existingSession.Roles = roles;
        Log.Debug("[SESSION] update: {session}", existingSession.ToString());
        return existingSession;
      });
      // Sanity checks before return.
      if (!session.User.Username.Equals(user.Username)) {
        Log.Error("[SESSION] Token {token} is for {foundUser}, not {user}",
          token, session.User.ToString(), user.ToString());
        throw new ArgumentException("Token mismatch: invalid user.");
      }
      return session;
    }
  }
}
