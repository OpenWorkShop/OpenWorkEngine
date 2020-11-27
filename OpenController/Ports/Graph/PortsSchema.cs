using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace OpenWorkEngine.OpenController.Ports.Graph {
  public static class PortsSchema {
    public static IRequestExecutorBuilder AddPortsSchema(this IRequestExecutorBuilder builder) =>
      builder.AddTypeExtension<PortsQuery>()
             .AddTypeExtension<PortsMutation>()
             .AddTypeExtension<PortsSubscription>();
  }
}
