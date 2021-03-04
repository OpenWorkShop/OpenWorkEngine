using System;
using System.Linq;
using Microsoft.Extensions.Configuration;
using Serilog;

namespace OpenWorkEngine.OpenController.Lib {
  public static class SerilogConfig {
    private const string ProductionEnv = "Production";
    private static readonly string[] Environments = {"Development", ProductionEnv};

    public static ILogger LoadEnvironment() {
      string env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? ProductionEnv;
      env = Environments.Contains(env) ? env : ProductionEnv;
      return LoadSerilog($"appsettings.{env}.json");
    }

    public static ILogger LoadSerilog(string filename) => Log.Logger =
      new LoggerConfiguration()
       .ReadFrom.Configuration(new ConfigurationBuilder().AddJsonFile(filename).Build())
       .CreateLogger().ForContext("App", "MV");
  }
}
