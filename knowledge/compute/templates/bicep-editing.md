# Editing Bicep parameters, resources, and modules

Topic ID: compute.templates.bicep-editing  
Objectives: co-03  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Purpose and implementation

Use typed parameters for deployment choices and modules for reusable resource
groups of code. Editing a local Bicep file has no Azure effect until deployment.
Microsoft recommends Bicep for its simpler syntax compared with ARM JSON.
[Parameters](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/parameters).

For the [network example](interpretation.md), replace its fixed address space with
a parameter and reference that parameter inside `addressPrefixes`:

```bicep
@description('Private IPv4 range for this virtual network')
param addressPrefix string = '10.24.0.0/16'
```

Use `addressPrefixes: [addressPrefix]` in the existing resource body. Review
overlapping ranges before deploying; a valid string is not proof of a valid network.
A symbolic resource reference such as `network.id` creates a dependency when
used by another deployed resource. Do not add redundant explicit dependencies.
[Dependencies](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/resource-dependencies).

A module declares another Bicep file and passes its inputs; it is not a second
resource type. For example, if the network example is saved as `network.bicep`:

```bicep
module networkModule './network.bicep' = {
  name: 'network-deployment'
  params: {
    vnetName: 'vnet-study'
  }
}
```

Match parameter names to the module contract. Read its declared output through
`networkModule.outputs.<outputName>`. A module can use a scope different from
the parent where supported; that scope also requires deployment permissions.
[Modules](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/modules).

## Verify and troubleshoot

Run `az bicep build --file main.bicep` to compile and report diagnostics.
Resolve type errors and review linter warnings, then run deployment validation
and what-if against the actual target scope. Compilation needs no Azure resource
write permission and does not confirm quota, Policy, runtime permissions, or
available capacity.
[Linter](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/linter);
[deployment workflow](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-cli).

Use `@secure()` for sensitive string/object parameters; keep secret literals
out of source and ordinary outputs. An `existing` resource is referenced, not
created or updated by that declaration. If a lookup fails, check its name,
scope, and access rather than removing `existing` without reviewing the effect.
[Existing resources](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/existing-resource).

Keep resource names stable when refactoring symbolic names; changing the actual
Azure resource name can create a different resource and leave the old one in
incremental mode. Review the preview before deployment and clean up intentionally.
See [ARM update semantics](arm-editing.md).

[Question data](../../../questions/compute/compute-templates-bicep-editing.json).
