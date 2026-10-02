# Validating and deploying ARM and Bicep

Topic ID: compute.templates.deployment  
Objectives: co-04  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Deployment workflow

Choose the subscription, deployment scope, resource locations, and parameter
values before running commands. A resource-group deployment needs an existing
resource group. Subscription deployments use `az deployment sub` and a location
for deployment metadata; that location need not be every resource's location.
[CLI deployment scopes](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-cli).

Example for a reviewed resource-group Bicep file:

```sh
az account set --subscription '<subscription-id>'
az deployment group validate --resource-group rg-study --template-file main.bicep
az deployment group what-if --resource-group rg-study --template-file main.bicep
az deployment group create --name study-network --resource-group rg-study --template-file main.bicep
az deployment operation group list --resource-group rg-study --name study-network
```

Use `--parameters @main.parameters.json` consistently if the template requires
a JSON parameter file. ARM JSON uses the same deployment command with
`--template-file main.json`. PowerShell equivalents include
`Test-AzResourceGroupDeployment` and `New-AzResourceGroupDeployment`;
the latter supports `-WhatIf`.
[PowerShell deployment](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-powershell).

## Permissions and verification

The deploying identity needs writes for the resource types and access to
deployment operations. A deployment creating RBAC assignments also needs role
assignment write permission; ordinary Contributor is insufficient for that task.
What-if previews resource changes without applying them, but needs Azure access.
Unresolved expressions and nested deployment limits can make previews incomplete;
a preview is not an assurance of runtime success.
[What-if](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-what-if).

Verify the overall deployment and individual operations, then inspect the
resource's provisioning state and actual functionality. Successful ARM provisioning
does not prove an application is healthy. Policy denial, missing providers,
name collisions, quotas, and allocation failures need different remedies.
[Troubleshooting](https://learn.microsoft.com/en-us/azure/azure-resource-manager/troubleshooting/common-deployment-errors).

## Updates, costs, and cleanup

Prefer incremental deployment. Understand [property replacement](arm-editing.md)
before updating existing resources. A failed deployment can leave successfully
created resources behind: inspect them before retrying or cleaning up. Deleting
deployment history does not delete the deployed resources. Clean up a dedicated
lab resource group only after confirming nothing shared belongs to it; compute,
networking, and storage may incur costs while retained.
[Deployment history](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-history-deletions).

[Question data](../../../questions/compute/compute-templates-deployment.json).
