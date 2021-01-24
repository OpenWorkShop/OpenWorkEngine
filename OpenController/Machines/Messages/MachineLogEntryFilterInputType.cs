using HotChocolate.Data.Filters;
using OpenWorkEngine.OpenController.Machines.Models;

namespace OpenWorkEngine.OpenController.Machines.Messages {
  public class MachineLogEntryFilterInputType :  FilterInputType<MachineLogEntry> {
    protected override void Configure(IFilterInputTypeDescriptor<MachineLogEntry> descriptor) {
      descriptor.Ignore(t => t.Id);
    }
  }
}
