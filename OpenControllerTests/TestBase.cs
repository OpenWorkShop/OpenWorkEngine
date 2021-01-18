using System;
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.InMemory;
using Xunit.Abstractions;

namespace OpenWorkEngine.OpenControllerTests {
  public abstract class TestBase : IDisposable {
    public TestBase(ITestOutputHelper output) =>
      Log.Logger = new LoggerConfiguration()
                  .MinimumLevel.Debug()
                  .WriteTo.TestOutput(output)
                  .WriteTo.InMemory()
                  .CreateLogger();

    public List<LogEvent> FatalLogs => GetLogsOfLevel(LogEventLevel.Fatal);
    public List<LogEvent> ErrorLogs => GetLogsOfLevel(LogEventLevel.Error);
    public List<LogEvent> WarningLogs => GetLogsOfLevel(LogEventLevel.Warning);

    public void Dispose() {
      AssertHealthyLogs();
    }

    protected void AssertHealthyLogs() {
      List<LogEvent> badLogs = FatalLogs.Concat(ErrorLogs).Concat(WarningLogs).ToList();
      badLogs.Should().BeEmpty(string.Join('\n', badLogs.Select(l => l.MessageTemplate.Text)));
    }

    public List<LogEvent> GetLogsOfLevel(LogEventLevel level) =>
      InMemorySink.Instance.LogEvents.Where(e => e.Level == level).ToList();
  }
}
