using HotChocolate.Execution;
using HotChocolate.Execution.Configuration;
using HotChocolate.Types;
using Microsoft.Extensions.DependencyInjection;
using OpenWorkEngine.OpenController.Controllers.Services;
using OpenWorkEngine.OpenController.Controllers.Services.Values;
using OpenWorkEngine.OpenController.Identity;
using OpenWorkEngine.OpenController.Identity.Models;
using OpenWorkEngine.OpenController.Identity.Services;
using OpenWorkEngine.OpenController.Lib;
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
      services.AddScoped<ICurrentUser<OpenControllerUser>, CurrentOpenControllerUser>();
      services.AddHttpContextAccessor();
    }


    public static IRequestExecutorBuilder AddOpenControllerGraphQLServer(this IServiceCollection services) {
      // var executor = services
      //               .AddGraphQLServer()
      //               .AddOpenControllerSchema()
      //               .AddFiltering()
      //               .AddSorting()
      //               .ConfigureSchema(s => {
      //
      //                  s.AddType(
      //                    new InputObjectType<FirmwareSetting>(
      //                      x => x.BindFieldsExplicitly()
      //                            .Name("FindMe")
      //                            .Field("Id").Type<StringType>()));
      //                  s.AddType(
      //                    new InputObjectType<IParsedValue>(
      //                      x => x.BindFieldsExplicitly()
      //                            .Name("FindMe2")
      //                            .Field("ValueString").Type<StringType>()));
      //                  s.AddType(
      //                    new InputObjectType<ControlledMachine>(
      //                      x => x.BindFieldsExplicitly()
      //                            .Name("FindMe3")
      //                            .Field("Id").Type<StringType>()));
      //                })
      //               .BuildRequestExecutorAsync().Result;
      // string str = executor.Schema.ToString();
      // Log.Logger.Information(str);

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
