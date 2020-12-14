using HotChocolate.Execution.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace OpenWorkEngine.OpenController.Settings.Graph {
  public static class SettingsSchema {
    [OpenControllerSettings]
    public static IRequestExecutorBuilder AddSettingsSchema(this IRequestExecutorBuilder builder) =>
      builder
       .AddType<SettingsQuery>();
  }
}
