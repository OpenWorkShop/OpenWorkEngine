using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace OpenWorkEngine.OpenController.Machines.Graph {
  public static class MachinesSchema {
    public static IRequestExecutorBuilder AddMachineSchema(this IRequestExecutorBuilder builder) =>
      builder.AddTypeExtension<MachinesSubscription>()
             .AddTypeExtension<MachinesMutation>();
  }
}
