using System.Reflection;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;

namespace OpenWorkEngine.OpenController.Lib.Graphql {
  public class AuthorizeWriteControllersAttribute : AuthorizeAttribute {
    protected override void TryConfigure(IDescriptorContext context, IDescriptor descriptor, ICustomAttributeProvider element) {
      Policy = ControllerPolicies.WriteControllers;
      base.TryConfigure(context, descriptor, element);
    }
  }
}
