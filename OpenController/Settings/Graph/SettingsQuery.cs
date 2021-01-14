using HotChocolate;
using HotChocolate.Types;

namespace OpenWorkEngine.OpenController.Settings.Graph {
  [ExtendObjectType(Name = OpenControllerSchema.Query)]
  public class SettingsQuery {
    [GraphQLName("getSettings")]
    public Models.OpenControllerSettings GetSettings([Service] OpenControllerContext context) => context.Settings;
  }
}
