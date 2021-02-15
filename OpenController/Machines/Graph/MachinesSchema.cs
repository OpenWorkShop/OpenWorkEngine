using HotChocolate.Execution.Configuration;
using HotChocolate.Types;
using Microsoft.Extensions.DependencyInjection;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Machines.Graph {
  public static class MachinesSchema {
    public static IRequestExecutorBuilder AddMachineSchema(this IRequestExecutorBuilder builder) =>
      builder.AddType<FirmwareSettingType>()
             .AddTypeExtension<MachinesSubscription>();
  }
}
