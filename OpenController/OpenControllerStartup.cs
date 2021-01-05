using Microsoft.Extensions.DependencyInjection;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Identity.Services;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Programs.Services;
using OpenWorkEngine.OpenController.Workspaces.Services;

namespace OpenWorkEngine.OpenController {
  public static class OpenControllerStartup {
    public static void AddOpenController(this IServiceCollection services) {
      services.AddSingleton(Serilog.Log.Logger);
      services.AddSingleton<ConfigFile>();
      services.AddSingleton<SessionManager>();
      services.AddSingleton<ProgramFileManager>();
      services.AddSingleton<ControllerManager>();
      services.AddSingleton<WorkspaceManager>();
      services.AddTransient<OpenControllerContext>();
      services.AddScoped<IdentityService>();
      services.AddHttpContextAccessor();

      services.AddAuthentication();
      services.AddAuthorization(opts => {
        opts.AddControllerPolicies();
      });

      services.AddHttpResultSerializer<GraphqlHttpResultSerializer>()
              .AddInMemorySubscriptions()
              .AddGraphQLServer()
              .AddDiagnosticEventListener<GraphqlDiagnosticEventListener>()
              .AddSocketSessionInterceptor<MakerverseSocketSessionInterceptor>()
              .AddHttpRequestInterceptor<MakerverseHttpRequestInterceptor>()
              .AddAuthorization()
              .AddOpenControllerSchema()
              .AddErrorFilter<GraphqlErrorFilter>();
    }
  }
}
