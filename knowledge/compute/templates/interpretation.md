# Reading ARM templates and Bicep

Topic ID: compute.templates.interpretation  
Objectives: co-01  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

ARM JSON templates and Bicep describe desired Azure infrastructure.
Bicep compiles to ARM JSON; neither is a sequence of shell commands.
Microsoft recommends considering Bicep for easier infrastructure authoring.
[Template structure](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/syntax).

## Read a definition in order

1. Identify deployment scope and the resource types/API versions.
2. Resolve input parameters, defaults, allowed values, and derived variables.
3. Inspect names, locations, properties, loops, and conditions.
4. Follow dependencies rather than assuming textual order.
5. Inspect outputs and ensure credentials are not exposed.

Parameters are deployment inputs; variables are derived values; resources
declare what ARM manages; outputs return selected results. A template's
contentVersion is its author's version marker, not the resource provider's
API version.
[ARM inputs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/parameters).

Illustrative Bicep fragment:

```bicep
param location string = resourceGroup().location
param vnetName string
resource network 'Microsoft.Network/virtualNetworks@2023-11-01' = {
  name: vnetName
  location: location
  properties: {
    addressSpace: { addressPrefixes: [ '10.24.0.0/16' ] }
  }
}
output networkId string = network.id
```

Here `network` is the symbolic name inside the file; `vnetName` supplies the
deployed name. `networkId` returns the resource ID. Changing a symbolic name
alone is not the same as changing a deployed resource's name.
[Bicep syntax](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/file).

## Follow dependencies

A Bicep reference to another resource's properties can create an implicit
dependency. Use explicit dependsOn only for ordering not already expressed
through references. Independent resources can deploy in parallel; their
position in the file is not an ordering guarantee.
[Dependency guidance](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/resource-dependencies).

An `existing` declaration references a resource rather than deploying a new
one. Confirm its scope/name before using its properties; a missing referenced
resource is not automatically created by that declaration.
[Existing resources](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/existing-resource).

## Verify your interpretation

Compile/lint Bicep locally, inspect the generated JSON, and compare expected
resources with a deployment what-if in an authorized environment. Reading and
compiling needs no Azure resource permissions; cloud validation needs suitable
deployment/resource access. Compilation does not prove SKU availability,
policy compliance, or runtime connectivity.

No deployment was run for this example. Delete only local generated artifacts
after study; executing the template later can provision billable resources.

[Question data](../../../questions/compute/compute-templates-interpretation.json).
