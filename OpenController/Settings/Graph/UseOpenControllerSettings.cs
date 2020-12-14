using System.Reflection;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;

namespace OpenWorkEngine.OpenController.Settings.Graph {
  public class OpenControllerSettings : ObjectFieldDescriptorAttribute {
    public override void OnConfigure(
      IDescriptorContext context,
      IObjectFieldDescriptor descriptor,
      MemberInfo member)
    {
      descriptor.Use<Settings.Models.OpenControllerSettings>();
    }
  }
}
