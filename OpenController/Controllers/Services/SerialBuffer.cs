using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Threading.Tasks;
using HotChocolate.Language;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;
using OpenWorkEngine.OpenController.Controllers.Services.Serial;
using OpenWorkEngine.OpenController.ControllerSyntax;
using OpenWorkEngine.OpenController.Machines.Enums;
using OpenWorkEngine.OpenController.Machines.Models;
using OpenWorkEngine.OpenController.Ports.Enums;
using OpenWorkEngine.OpenController.Ports.Models;
using OpenWorkEngine.OpenController.Syntax;
using Serilog;
using Parser = OpenWorkEngine.OpenController.Controllers.Services.Serial.Parser;

namespace OpenWorkEngine.OpenController.Controllers.Services {
  /// <summary>
  ///   Wraps the serial I/O for a ConnectedPort with a thread for doing work.
  /// </summary>
  public class SerialBuffer {
    public SerialBuffer(Controller controller) {
      Log = controller.Log.ForContext(typeof(SerialBuffer));
      Controller = controller;
      Connection = controller.Connection;
    }

    internal ConnectedPort Connection { get; }

    internal Controller Controller { get; }

    internal ILogger Log { get; }

    public int BytesToRead => Connection.Status.BytesToRead;

    public bool HasPendingData => BytesToRead > 0;

    private ControlledMachine Machine => Connection.Machine;

    // If the last try failed, it stores a copy of the failed string to concat with next read.
    private MachineOutputLine? _failedParseLine = null;

    private ConcurrentQueue<MachineInstructionResult> WriteQueue => Machine.Status.Buffer.WriteQueue;

    private ConcurrentQueue<MachineInstructionResult> ResponseQueue => Machine.Status.Buffer.ResponseQueue;

    // For those topics which are batched, store the timestamp of when they should be emitted.
    private readonly Dictionary<MachineTopic, DateTime> _batchedTopicDispatchTime = new();


    // When any parser indicates the line WasParsed...
    private void OnLineParsed(MachineOutputLine line) {
      line = line.Finish();

      Log.Verbose("[READ] [PARSED] {line}", line.ToString());

      // ACK (ok/error) from machine.
      if (line.LogEntry?.IsResponse ?? false) {
        List<MachineLogEntry> entries = OnResponseReceived(line.LogEntry);
        if (entries.Any()) {
          line.Topics?.Add(MachineTopic.Log);
        }
      }

      // Track topic changes....
      if (!(line.Topics?.Any() ?? false)) return;

      Log.Verbose("[MACHINE] add topics: {topics}", line.Topics.Select(ct => ct.ToString()));
      foreach (MachineTopic topic in line.Topics) {
        double batchInterval = topic.GetBatchInterval();
        if (batchInterval <= 0) {
          Emit(topic);
        } else if (!_batchedTopicDispatchTime.ContainsKey(topic)) {
          _batchedTopicDispatchTime.Add(topic, DateTime.Now.AddMilliseconds(batchInterval));
        }
      }
    }

    // try/catch around a core read loop; broadcasts state & returns # of characters read.
    internal async Task<int> TryReadSerial() {
      try {
        if (HasPendingData) {
          string line = Connection.Port.SerialPort.ReadLine();

          int readCharacters = line.Length;
          Connection.Status.CharactersRead += readCharacters > 0 ? readCharacters : 0;
          Connection.Status.LinesRead += readCharacters > 0 ? 1 : 0;

          if (readCharacters > 0 && !string.IsNullOrWhiteSpace(line)) {
            if (Connection.Port.State < PortState.HasData) Connection.Port.State = PortState.HasData;

            Log.Verbose("[READ] '{line}'", line.Trim());
            MachineOutputLine? outputLine = null;

            // If there was a prior failed read, try concating the line.
            if (_failedParseLine != null) {
              outputLine = await ParseLine($"{_failedParseLine.Raw}{line}");
              if (!outputLine.WasParsed) {
                // Handle the failed line as a message.
                _failedParseLine.WithLogEntry(
                  MachineLogEntry.FromReadMessage(_failedParseLine.Raw, MachineLogLevel.Wrn)
                );
                outputLine = await ParseLine(line);
              }
              OnLineParsed(_failedParseLine);
              _failedParseLine = null;
            } else {
              outputLine = await ParseLine(line);
            }

            // Handle success/failure of parsing.
            if (!outputLine.WasParsed) {
              _failedParseLine = outputLine;
            } else {
              OnLineParsed(outputLine);
            }
          } else {
            Log.Warning("[BUFFER] no bytes read (although {count} exist to be read) from {portName}",
              BytesToRead, Connection.Port.PortName);
          }

          // Log.Debug("[READ] {characters}", readCharacters);

          return readCharacters;
        }
      } catch (TimeoutException e) {
        Log.Warning(e, "[BUFFER] caught timeout");
      } catch (ObjectDisposedException) {
        // terminated via the dispose command.
        Log.Verbose("[BUFFER] terminated with disposal: {portName}", Connection.Port.PortName);
      } catch (Exception e) {
        Log.Error(e, "[BUFFER] Unknown IO exception for {portName}", Connection.Port.PortName);
      }
      Log.Verbose("[BUFFER] returning zero data.");
      return 0;
    }

    /// <summary>
    /// Batch-emit changes which were made during recent loops.
    /// </summary>
    /// <returns></returns>
    internal Task TryEmitChanges() {
      MachineTopic[] topics = _batchedTopicDispatchTime.Keys.ToArray();
      foreach (MachineTopic topic in topics) {
        TimeSpan remainingTime = _batchedTopicDispatchTime[topic] - DateTime.Now;
        if (remainingTime.TotalMilliseconds <= 0) {
          Emit(topic);
          _batchedTopicDispatchTime.Remove(topic);
        }
      }

      return Task.CompletedTask;
    }

    private void Emit(params MachineTopic[] topics) {
      //
      // bool logOnly = topics.Length == 1 && topics.Contains(MachineTopic.Log);
      // if (!logOnly)
      Log.Information("[MACHINE] EMIT [{state}] {topics}", Machine.Status.ActivityState, topics);
      foreach (MachineTopic topic in topics) {
        Controller.Manager.GetSubscriptionTopic(topic).Emit(Machine);
      }
    }

    /// <summary>
    /// Parser informs Buffer that a response was received.
    /// </summary>
    /// <param name="responseEntry"></param>
    internal List<MachineLogEntry> OnResponseReceived(MachineLogEntry responseEntry) {
      List<MachineLogEntry> modifiedLogs = new List<MachineLogEntry>();
      if (!ResponseQueue.TryDequeue(out MachineInstructionResult? res)) {
        Log.Warning("[WRITE] [ACK] no responses => {ack} via {buffer}", responseEntry.ToString(), ToString());
        return modifiedLogs;
      }
      Log.Debug("[WRITE] [ACK] {instruction} => {ack} via {buffer}",
        res.Instruction.ToString(), responseEntry.ToString(), ToString());

      if (responseEntry.Error != null) {
        res.WriteLogEntry.WriteState = SerialWriteState.Error;
      } else {
        res.WriteLogEntry.WriteState = SerialWriteState.Ok;
      }
      res.WriteLogEntry.WriteState = responseEntry.Error != null ? SerialWriteState.Error : SerialWriteState.Ok;
      res.ResponseLogEntry = responseEntry;
      modifiedLogs.Add(res.WriteLogEntry);

      if (WriteQueue.Any() && WriteQueue.TryDequeue(out MachineInstructionResult? next)) {
        WriteInstruction(next);
        modifiedLogs.Add(next.WriteLogEntry);
      }

      return modifiedLogs;
    }

    internal async Task TryWriteSerial() {
      try {
        if (Controller.IsActive) {
          // Internal system polls.
          foreach (SerialPoll poll in Controller.Translator.Polls) await poll.Write(Controller);
        }
      } catch (Exception e) {
        Log.Error(e, "[BUFFER] Unknown IO exception for {portName}", Connection.Port.PortName);
      }
    }

    /// <summary>
    /// Once a line is actually read, parse it.
    /// </summary>
    /// <param name="strLine">The line read from the serial port.</param>
    /// <returns>The topics which have changed.</returns>
    private async Task<MachineOutputLine> ParseLine(string strLine) {
      strLine = strLine.Trim();

      Log.Verbose("[PARSE] {line}", strLine);
      MachineOutputLine line = new(strLine, Connection.Machine, Controller.Translator);

      // 1. Check for responses.
      line = await Controller.Translator.Response.UpdateMachine(line);

      // 2. Check for polling updates.
      foreach (SerialPoll poll in Controller.Translator.Polls) {
        line = await poll.UpdateController(line);
      }

      // 3. Use other parsers.
      foreach (Parser parser in Controller.Translator.OptionalParsers) {
        line = await parser.UpdateMachine(line);
      }

      // 4. Use the fallback parser.
      if (!line.WasParsed) {
        line = await Controller.Translator.Fallback.UpdateMachine(line);
      }

      return line;
    }

    private void WriteInstruction(MachineInstructionResult res) {
      if (res.Instruction.InstructionDefinition.ResponseExpected) {
        ResponseQueue.Enqueue(res);
        Connection.Machine.Status.Buffer.LastInstructionResult = res;
        Log.Debug("[WRITE] {code} via {buffer}", res.WriteLogEntry.Code, ToString());
      } else {
        Log.Verbose("[WRITE] {code} via {buffer}", res.WriteLogEntry.Code, ToString());
      }
      res.WriteLogEntry.WriteState = SerialWriteState.Sent;
      string code = res.Instruction.Code;

      if (res.Instruction.InstructionDefinition.Inline) {
        Connection.Port.SerialPort.Write(code);
        Connection.Status.CharactersWritten += code.Length;
      } else {
        Connection.Port.SerialPort.WriteLine(code);
        Connection.Status.CharactersWritten += code.Length + 1;
        Connection.Status.LinesWritten++;
      }
    }

    internal async Task<MachineInstructionResult> Instruct(
      IControllerInstruction instruction, ControllerExecutionOptions? opts = null
    ) {
      opts ??= new ControllerExecutionOptions();
      CompiledInstruction compiled = instruction.Compile(opts);
      MachineLogEntry logEntry = MachineLogEntry.FromWrittenInstruction(compiled, opts.LogLevel);
      Machine.AddLogEntry(logEntry);

      MachineInstructionResult res = new(compiled, logEntry);
      if (!instruction.Immediate && ResponseQueue.Any()) {
        // When waiting on a response, queue the send rather than sending immediately.
        Log.Debug("[WRITE] [QUEUE] {source} {code} {buffer}", compiled.Source, compiled.Code, ToString());
        WriteQueue.Enqueue(res);
      } else {
        // If we're not waiting on any responses, we can write immediately.
        WriteInstruction(res);
      }

      if (opts.AwaitResponse) {
        if (!instruction.ResponseExpected) throw new ArgumentException($"Cannot await a response on {instruction}");
        await logEntry.TryWaitForResponse();
      } else {
        // Ensures spacing between commands / logs.
        await Task.Delay(1);
      }

      return res;
    }

    internal async Task<MachineExecutionResult> Execute(
      ControllerScript script, ControllerExecutionOptions? opts = null
    ) {
      // Execute each instruction in the script.
      List<MachineInstructionResult> instructionResults = new ();
      foreach (IControllerInstruction instruction in script.Instructions) {
        MachineInstructionResult res = await Instruct(instruction, opts);
        instructionResults.Push(res);
      }
      return new MachineExecutionResult(Machine, instructionResults);
    }

    public override string ToString() => $"<I:{BytesToRead}> <WQ:{WriteQueue.Count}> <RQ:{ResponseQueue.Count}>";

    //
    // internal async Task Write(string text) {
    //   // Invariant: the write function should only write raw text which does NOT contain a line break.
    //   string[] lines = text.Split(new char[] {'\n', '\r'});
    //   for (int i = 0; i < (lines.Length - 1); i++) {
    //     await WriteLine(lines[i]);
    //   }
    //
    //   string rawText = lines.Last();
    //   Log.Verbose("[WRITE] {connection} > {text}", Connection.ToString(), rawText.ToCharArray()[0]);
    //   Connection.Port.SerialPort.Write(rawText);
    //   Connection.Status.CharactersWritten += rawText.Length;
    // }
    //
    // internal Task WriteLine(string line) {
    //   line = line.Trim();
    //   if (line.Length <= 0) return Task.CompletedTask;
    //   Log.Verbose("[WRITE] {connection} >> {line}", Connection.ToString(), line);
    //   Connection.Port.SerialPort.WriteLine(line);
    //   Connection.Status.CharactersWritten += line.Length + 1; // Account for newline.
    //   Connection.Status.LinesWritten++;
    //   return Task.CompletedTask;
    // }
  }
}
