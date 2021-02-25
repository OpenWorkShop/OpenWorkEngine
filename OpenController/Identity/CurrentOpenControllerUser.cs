using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using OpenWorkEngine.OpenController.Identity.Models;
using OpenWorkEngine.OpenController.Lib;
using Serilog;

namespace OpenWorkEngine.OpenController.Identity {
  public class CurrentOpenControllerUser : ICurrentUser<OpenControllerUser> {
    private readonly GenericPrincipal? _principal;

    private readonly GenericIdentity? _identity;

    private OpenControllerUser? _userProfile;

    private OpenControllerContext _context;

    private ILogger Log { get; }

    public CurrentOpenControllerUser(
      IHttpContextAccessor httpContextAccessor, OpenControllerContext context, ILogger log
    ) {
      Log = log.ForContext(GetType());
      _principal = httpContextAccessor.HttpContext?.User as GenericPrincipal;
      _identity = _principal?.Identity as GenericIdentity;
      _context = context;
    }

    public string? UserId => _identity?.Name;

    public bool IsAuthenticated => !string.IsNullOrEmpty(UserId);

    public List<string> Claims => _principal?.Claims.Select(c => c.Value).ToList() ?? new List<string>();

    public Task<OpenControllerUser?> LoadProfile() {
      if (_userProfile != null || UserId == null) return Task.FromResult(_userProfile);
      _userProfile = _context.TryGetUser(UserId);
      return Task.FromResult(_userProfile);
    }
  }
}
