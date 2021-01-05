using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenWorkEngine.OpenController.Identity.Graph;
using OpenWorkEngine.OpenController.Machines.Graph;
using OpenWorkEngine.OpenController.Ports.Graph;
using OpenWorkEngine.OpenController.Programs.Graph;
using OpenWorkEngine.OpenController.Settings.Graph;
using OpenWorkEngine.OpenController.Workspaces.Graph;

namespace OpenWorkEngine.OpenController {
  public static class OpenControllerSchema {
    public const string Query = "Query";
    public const string Subscription = "Subscription";
    public const string Mutation = "Mutation";

    public static IRequestExecutorBuilder AddOpenControllerSchema(this IRequestExecutorBuilder builder) =>
      builder.AddQueryType(d => d.Name(Query))
             .AddSubscriptionType(d => d.Name(Subscription))
             .AddMutationType(d => d.Name(Mutation))
             .AddPortsSchema()
             .AddMachineSchema()
             .AddWorkspaceSchema()
             .AddSettingsSchema()
             .AddProgramsSchema()
             .AddOpenControllerIdentitySchema();
  }
}
