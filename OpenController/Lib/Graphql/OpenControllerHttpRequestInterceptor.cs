using System.Globalization;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using HotChocolate.AspNetCore;
using HotChocolate.Execution;
using Microsoft.AspNetCore.Http;
using OpenWorkEngine.OpenController.Identity.Services;

namespace OpenWorkEngine.OpenController.Lib.Graphql {
  public class OpenControllerHttpRequestInterceptor : DefaultHttpRequestInterceptor {
    public override async ValueTask OnCreateAsync(
      HttpContext context, IRequestExecutor executor, IQueryRequestBuilder builder, CancellationToken cancellationToken
    ) {
      // Override default ClaimsPrincipal behavior with Makerverse auth.
      string auth = context.Request.Headers["Authorization"].ToString();
      if (auth.StartsWith("bearer ", true, CultureInfo.InvariantCulture)) {
        ClaimsPrincipal? principal = await context.ClaimOpenControllerIdentity(auth.Substring("bearer ".Length).Trim());
        if (principal != null) builder.TryAddProperty(nameof(ClaimsPrincipal), principal);
      }
      await base.OnCreateAsync(context, executor, builder, cancellationToken);
    }
  }
}

