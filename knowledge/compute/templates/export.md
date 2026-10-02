# Exporting templates and decompiling Bicep

Topic ID: compute.templates.export  
Objectives: co-05  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Choose the export source

A resource-group export describes current resource configuration, including
changes made since deployment. Deployment-history export retrieves the template
used for that particular deployment. Neither exports application data or provides
a VM disk backup.
[Export options](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/export-template-cli).

## Implementation

Use an identity allowed to read the resources and perform the relevant export
operation. In the portal, open the resource group and choose **Export template**;
review the generated template and warnings. Current portal documentation supports
Bicep export; for CLI, export ARM JSON then decompile it.
[Portal export](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/export-bicep-portal).

```sh
az group export --name rg-study > current.json
az deployment group export --resource-group rg-study --name study-network > original.json
az bicep decompile --file current.json
az bicep build --file current.bicep
```

Use different filenames to retain the original artifacts. The decompiler offers
a starting point, not a guaranteed final Bicep file. Inspect conversion warnings,
simplify generated names, add parameters, and fix errors before compiling.
[Decompilation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/decompile).

## Review, verify, and troubleshoot

Resource export can omit unsupported resources or properties and may lack secret
parameters. Check the API reference and compare exported configuration with the
live resources. Group export is limited to 200 resources. Remove inappropriate
read-only values, review hard-coded resource IDs, and supply secrets through a
secure mechanism.
[Export limitations](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/export-template-cli).

Compile the edited Bicep, validate it, and run what-if in the intended target
scope. Confirm names, network references, and dependencies before redeploying;
the exported resources might already exist or have globally unique names.
Export and local conversion do not deploy new resources, but a later deployment
can incur charges. Protect exported files if they contain sensitive configuration.
See [deployment workflow](deployment.md) and [Bicep editing](bicep-editing.md).

[Question data](../../../questions/compute/compute-templates-export.json).
