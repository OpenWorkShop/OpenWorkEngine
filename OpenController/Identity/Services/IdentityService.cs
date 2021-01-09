using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using HotChocolate.Language;
using HotChocolate.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenWorkEngine.OpenController.Identity.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Identity.Services {
  public class IdentityService {
    private OpenControllerContext Context { get; }

    public ILogger Log { get; }

    // Exchange a token for a standard AspNetCore identity object.
    public async Task<ClaimsPrincipal?> ClaimIdentity(string token) {
      try {
        OpenControllerSession session = await Authenticate(token);
        return GetClaimsPrincipal(session);
      } catch (Exception e) {
        Log.Error(e, "[ID] Session validation failed.");
      }
      return null;
    }

    private ClaimsPrincipal GetClaimsPrincipal(OpenControllerSession session) {
      Log.Debug("[ID] user {username}", session.User.Username);
      ClaimsIdentity identity = new ();
      identity.AddClaim(new Claim(ClaimTypes.Name, session.User.Username));
      return new GenericPrincipal(identity, session.Roles);
    }

    // Given junt a token, return a user with access to this installation.
    public async Task<OpenControllerSession> Authenticate(string token) {
      Log.Information("[TOKEN] handoff token to {host}", Context.OwsHost);

      HttpClient client = Context.LoadOwsClient(token);
      OpenControllerUser? previouslyAuthenticatedUser = Context.EnabledUsers.FirstOrDefault(u => u.Tokens.Contains(token));
      HttpResponseMessage? res = null;

      try {
        res = await client.GetAsync("/api/users/me");
      } catch (HttpRequestException ex) {
        if (previouslyAuthenticatedUser != null) {
          return ValidateAccess(previouslyAuthenticatedUser, token);
        }
        Log.Error(ex, "[TOKEN] Cannot connect.");
      } catch (Exception e) {
        Log.Error(e, "[TOKEN] Unknown exception.");
      }
      if (res == null) {
        throw new UnauthorizedAccessException($"Gatekeeper unreachable");
      }
      string body = await res.Content.ReadAsStringAsync();
      if (res.StatusCode != HttpStatusCode.OK) {
        Log.Error("[TOKEN] Invalid token handoff: {statusCode} {body}}", res.StatusCode, body);
        throw new UnauthorizedAccessException($"Gatekeeper status code: {res.StatusCode}");
      }
      JObject response = JsonConvert.DeserializeObject<JObject>(body);
      if (response.ContainsKey("errors") && response["errors"] is JArray errs && errs.FirstOrDefault() is JObject err) {
        Log.Error("[TOKEN] Error from gatekeeper: {error}", err);
        throw new UnauthorizedAccessException($"Gatekeeper error code.");
      }
      if (!response.ContainsKey("data")) {
        Log.Error("[TOKEN] No data in body: {body}}", res.StatusCode, body);
        throw new UnauthorizedAccessException($"Gatekeeper missing data.");
      }

      string userStr = JsonConvert.SerializeObject(response["data"]);
      OpenControllerUser user = JsonConvert.DeserializeObject<OpenControllerUser>(userStr);
      if (string.IsNullOrWhiteSpace(user.Username)) {
        throw new UnauthorizedAccessException($"User did not have a username: {userStr}");
      }

      Log.Information("[TOKEN] Exchanged token for user: {user}", user.ToString());

      return ValidateAccess(user, token);
    }

    // Given any user object, make sure they can access the current install with the given token.
    private OpenControllerSession ValidateAccess(OpenControllerUser user, string token) {
      bool changed = false;
      if (Context.EnabledUsers.Count < 1) {
        // First user. Automatically add as a user.
        Context.EnabledUsers.Push(user);
        changed = true;
      } else {
        // Already have users. Check that this user is one of them.
        OpenControllerUser? existingUser = Context.EnabledUsers.FirstOrDefault(
          u => u.Username.EqualsInvariantIgnoreCase(user.Username));
        if (existingUser == null) {
          Log.Warning("[ID] User {user} is not in valid users: {users}",
            user.ToString(), Context.EnabledUsers.Select(u => u.ToString()));
          throw new UnauthorizedAccessException(
            $"{user.Username} does not have access to this installation. " +
            $"{Context.EnabledUsers.First().Username} must grant them access.");
        }
        user = existingUser;
      }

      Log.Debug("[ID] User {username} found in users: {usernames}",
        user.Username, Context.EnabledUsers.Select(u => u.Username));
      if (!user.Tokens.Contains(token)) {
        user.Tokens.Push(token);
        changed = true;
      }
      int excess = user.Tokens.Count - 20;
      if (excess > 0) {
        user.Tokens.RemoveRange(0, excess);
        changed = true;
      }

      if (changed) {
        Log.Debug("[ID] saving changes to {user}", user.ToString());
        Context.SaveSettings();
      }

      OpenControllerSession session = Context.Sessions.LoadSession(token, user, OpenControllerRoles.User);
      Log.Debug("[ID] returning session: {session}", session.ToString());
      return session;
    }

    public IdentityService(OpenControllerContext context) {
      Context = context;
      Log = Context.Log.ForContext(typeof(IdentityService));
    }
  }
}