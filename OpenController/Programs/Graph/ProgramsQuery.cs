using System.Collections.Generic;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Programs.Models;

namespace OpenWorkEngine.OpenController.Programs.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Query)]
  public class ProgramsQuery {
    public List<ProgramFile> GetPrograms([Service] OpenControllerContext context) => new();
  }
}
