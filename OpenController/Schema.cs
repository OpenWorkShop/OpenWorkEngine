using HotChocolate.Execution.Configuration;
using OpenWorkEngine.OpenController.Machines.Graph;
using OpenWorkEngine.OpenController.Ports.Graph;

namespace OpenWorkEngine.OpenController {
  public static class Schema {
    public static IRequestExecutorBuilder AddOpenControllerSchema(this IRequestExecutorBuilder builder) =>
      builder.AddPortsSchema()
             .AddMachineSchema();
  }
}
