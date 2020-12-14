using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OpenWorkEngine.OpenController.Settings.Graph;

namespace OpenWorkEngine.OpenController.Workspaces.Graph {
  public static class WorkspaceSchema {
    [OpenControllerSettings]
    public static IRequestExecutorBuilder AddWorkspaceSchema(this IRequestExecutorBuilder builder) =>
      builder
       .AddType<WorkspaceMutation>()
       .AddType<WorkspaceQuery>()
       .AddType<WorkspaceSubscription>();
  }
}
