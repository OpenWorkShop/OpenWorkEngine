using Microsoft.AspNetCore.Authorization;
using OpenWorkEngine.OpenController.Lib;

namespace OpenWorkEngine.OpenController.Identity.Services {
  public static class OpenControllerPolicies {
    public static void AddMakerversePolicies(this AuthorizationOptions opts) {
      opts.AddPolicy(ControllerPolicies.ReadControllers,
        p => p.RequireAssertion(r => r.User.IsInRole(OpenControllerRoles.User)));

      opts.AddPolicy(ControllerPolicies.WriteControllers,
        p => p.RequireAssertion(r => r.User.IsInRole(OpenControllerRoles.User)));
    }
  }
}
