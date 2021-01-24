using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Identity.Services;
using OpenWorkEngine.OpenController.Lib.Filesystem;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Programs.Services;
using OpenWorkEngine.OpenController.Workspaces.Services;
using Serilog;

namespace OpenWorkEngine.OpenController {
  public static class OpenControllerStartup {
    public static void AddOpenControllerServices(this IServiceCollection services) {
      services.AddSingleton(Log.Logger);
      services.AddSingleton<ConfigFile>();
      services.AddSingleton<SessionManager>();
      services.AddSingleton<ProgramFileManager>();
      services.AddSingleton<ControllerManager>();
      services.AddSingleton<WorkspaceManager>();
      services.AddTransient<OpenControllerContext>();
      services.AddScoped<IdentityService>();
      services.AddHttpContextAccessor();
    }


    public static IRequestExecutorBuilder AddOpenControllerGraphQLServer(this IServiceCollection services) {
      return services.AddHttpResultSerializer<GraphqlHttpResultSerializer>()
                     .AddInMemorySubscriptions()
                     .AddGraphQLServer()
                     .AddDiagnosticEventListener<GraphqlDiagnosticEventListener>()
                     .AddSocketSessionInterceptor<OpenControllerSocketSessionInterceptor>()
                     .AddHttpRequestInterceptor<OpenControllerHttpRequestInterceptor>()
                     .AddAuthorization()
                     .AddOpenControllerSchema()
                      // .EnableRelaySupport()
                     .AddFiltering()
                     .AddSorting()
                     .AddErrorFilter<GraphqlErrorFilter>();
    }
  }
}
