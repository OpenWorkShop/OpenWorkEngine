using System.Collections.Generic;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.Types;
using OpenWorkEngine.OpenController.Lib.Graphql;
using OpenWorkEngine.OpenController.Programs.Models;
using OpenWorkEngine.OpenController.Programs.Services;

namespace OpenWorkEngine.OpenController.Programs.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Query)]
  public class ProgramsQuery {
    [AuthorizeOpenControllerUser]
    [GraphQLDescription("List all of the programs which exist in the program directory.")]
    public ProgramFileDirectory ProgramDirectory([Service] OpenControllerContext context) =>
      context.Programs.ProgramDirectory;

    [AuthorizeOpenControllerUser]
    [GraphQLDescription("Open a program file by its name, parsing the contents.")]
    public Task<ProgramFile> LoadProgram([Service] OpenControllerContext context, string name) =>
      context.Programs.Load(name);
  }
}
