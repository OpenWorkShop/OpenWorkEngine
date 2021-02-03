using System;
using System.Collections.Concurrent;
using OpenWorkEngine.OpenController.Controllers.Interfaces;
using OpenWorkEngine.OpenController.Controllers.Messages;
using OpenWorkEngine.OpenController.Controllers.Models;

namespace OpenWorkEngine.OpenController.Machines.Models {
  /// <summary>
  ///   Tracks the board's memory capacity and
  /// </summary>
  public class MachineBuffer {
    // Current execution point in the program
    public int LineNumber { get; internal set; } = 0;

    public int AvailableSend { get; set; } = 0;

    public int AvailableReceive { get; set; } = 0;

    // Internal tracking from SerialBuffer (how many lines pending?)
    public int WriteQueueLength => WriteQueue.Count;

    public int ResponseQueueLength => ResponseQueue.Count;

    internal ConcurrentQueue<MachineInstructionResult> WriteQueue { get; } = new ();

    internal ConcurrentQueue<MachineInstructionResult> ResponseQueue { get; } = new ();

    public override string ToString() =>
      $"<I:{AvailableReceive}/{ResponseQueueLength}> <O:{AvailableSend}/{WriteQueueLength}>";
  }
}
