
using System.Linq;
using System.Reflection;
using HotChocolate.AspNetCore.Authorization;
using HotChocolate.Types;
using HotChocolate.Types.Descriptors;

namespace OpenWorkEngine.OpenController.Lib.Graphql {
  public class AuthorizeReadControllersAttribute : AuthorizeAttribute {
    protected override void TryConfigure(IDescriptorContext context, IDescriptor descriptor, ICustomAttributeProvider element) {
      Policy = ControllerPolicies.ReadControllers;
      base.TryConfigure(context, descriptor, element);
    }
  }
}
