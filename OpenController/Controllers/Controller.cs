using System;
using System.Collections.Generic;
using OpenWorkEngine.OpenController.Controllers.Implementations.Grbl;
using OpenWorkEngine.OpenController.MachineProfiles.Enums;
using OpenWorkEngine.OpenController.Machines.Interfaces;
using OpenWorkEngine.OpenController.Machines.Messages;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Machines.Observables;
using OpenWorkEngine.OpenController.Ports.Models;
using Serilog;

namespace OpenWorkEngine.OpenController.Controllers {
  public abstract class Controller :
    IObservable<MachineState>, IObservable<MachineConfiguration>, IObservable<MachineSetting>
  {
    public ConnectedPort ConnectedPort { get; }

    public ILogger Log => _logger ??= ConnectedPort.Log.ForContext("Controller", ControllerType.ToString());
    private ILogger? _logger;

    public abstract MachineControllerType ControllerType { get; }

    public abstract IParseMachinePatches? FirmwarePatcher { get; }

    protected readonly IParseMachinePatches[] patchers;

    protected virtual void ApplyPatch(MachinePatch patch) {
      Log.Debug("[PATCH] {@patch}", patch);
      if (patch.Configuration != null) {

      }
    }

    protected virtual void ParseLine(string line) {
      Log.Debug("[PARSE] {line}", line);
      foreach (IParseMachinePatches patcher in patchers) {
        try {
          MachinePatch? patch = patcher.ParsePortConnectionPatch(line);
          if (patch != null) ApplyPatch(patch);
        } catch (Exception e) {
          Log.Error(e, "Failed to parse line: {line}\n\nCould not apply patcher {patcher}", line, patcher);
        }
      }
    }

    public void ApplyPatchLine(string line) {
      line = line.Trim();
      if (string.IsNullOrWhiteSpace(line)) {
        Log.Verbose("Received empty line.");
        return;
      }
      ParseLine(line);
    }

    public Controller(ConnectedPort connectedPort, params IParseMachinePatches[] parsers) {
      ConnectedPort = connectedPort;
      patchers = parsers;
    }

    public static Controller Factory(MachineControllerType type, ConnectedPort connectedPort) {
      if (type == MachineControllerType.Grbl) {
        return new GrblController(connectedPort);
      }
      throw new ArgumentException($"{type} is not a supported controller.");
    }

    private readonly List<IObserver<MachineState>> _machineObservers = new();

    public IDisposable Subscribe(IObserver<MachineState> observer) =>
      Subscribe(_machineObservers, observer);

    private readonly List<IObserver<MachineConfiguration>> _controllerConfigurationObservers = new();

    public IDisposable Subscribe(IObserver<MachineConfiguration> observer) =>
      Subscribe(_controllerConfigurationObservers, observer);

    private readonly List<IObserver<MachineSetting>> _machineSettingsObservers = new();

    public IDisposable Subscribe(IObserver<MachineSetting> observer) =>
      Subscribe(_machineSettingsObservers, observer);

    private IDisposable Subscribe<T>(List<IObserver<T>> observers, IObserver<T> observer) where T : IPatchMachines =>
      new MachineSubscriber<T>(observers, observer);
    //
    // private void Emit<T>(T message) where T : IPatchControllers {
    //
    // }
  }
}
