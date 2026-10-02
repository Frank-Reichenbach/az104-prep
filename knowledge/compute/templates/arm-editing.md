# Editing ARM templates safely

Topic ID: compute.templates.arm-editing  
Objectives: co-02  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Purpose and decisions

Change the declared resource configuration without accidentally resetting settings.
Keep environment differences in parameters. ARM resolves parameters before deploying;
`allowedValues` rejects values outside an approved set, and `secureString` keeps
sensitive inputs out of deployment history. It does not make secrets safe when
copied to ordinary outputs or committed parameter files.
[Parameter definitions](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/parameters).

## Implementation

1. Save the current template and parameters in version control. Identify the
   resource by type, name, and scope; check its API version and supported properties.
2. Replace a hard-coded value with a parameter. This JSON is a fragment:

```json
"parameters": {
  "storageSku": {
    "type": "string",
    "defaultValue": "Standard_LRS",
    "allowedValues": ["Standard_LRS", "Standard_ZRS"]
  }
}
```

In the storage resource, use `"sku": { "name": "[parameters('storageSku')]" }`.
Only select SKUs supported by the account and region. Retain all other required
and non-default properties when updating that resource.
3. Check the full desired configuration, including subnet lists and child
   resources. Incremental deployment preserves resources omitted entirely,
   but it does not act as a partial property patch. Microsoft recommends
   incremental mode and deployment stacks for intentional resource deletion;
   complete mode is being deprecated.
   [Deployment modes](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-modes).
4. Validate and preview the edited template:

```sh
az deployment group validate --resource-group rg-study --template-file main.json
az deployment group what-if --resource-group rg-study --template-file main.json
```

Review changes before using `az deployment group create`. Supply the same
parameter file to all three operations when using one.
[CLI deployment](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-cli).

## Permissions, verification, and recovery

Deployment requires resource write permissions and deployment operations at
the target scope. Contributor can deploy ordinary resources but cannot assign
RBAC roles. Preview is an Azure operation requiring appropriate access, not an
offline guarantee. Read deployment operations for failures; Policy, quota, or
unsupported SKUs can still prevent deployment. Verify the resulting resource
properties against the intended configuration.
[What-if permissions and limitations](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deploy-what-if).

Changing a resource's location in JSON does not move it. Deleting a deployment
history entry does not remove its resources. Keep previous templates for a
reviewed redeployment, but assess data changes separately. Deleting lab resources
requires an explicit cleanup step; deployment itself can create billable services.
See [reading templates](interpretation.md).

[Question data](../../../questions/compute/compute-templates-arm-editing.json).
