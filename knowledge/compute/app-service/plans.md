# App Service plan creation and compute sharing

Topic ID: compute.app-service.plans  
Objectives: co-17  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Choose the hosting boundary

An App Service plan defines the region, operating system, compute SKU, and
instance capacity used by its apps. Apps and active deployment slots in a
dedicated plan share its workers. Separate plans provide separate compute
capacity and scaling boundaries.
[Plan model](https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans).

Select a tier from required features and measured resource demand. Free/Shared
use shared compute and CPU quotas; dedicated tiers start at Basic. Deployment
slots and Azure Monitor autoscale require a supported higher tier. Verify the
current feature matrix for the OS and region rather than assuming every tier
has the same features.
[Service limits](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/azure-subscription-service-limits#app-service-limits).

## Implementation

1. Select subscription, resource group, region, and Windows/Linux hosting.
2. Check the required SKU is available. Create the plan in the portal, or use
   this Linux Standard example:

```sh
az appservice plan create --resource-group rg-study --name plan-study \
  --location westeurope --sku S1 --is-linux
az appservice plan show --resource-group rg-study --name plan-study
```

3. Create an app on that plan with a compatible runtime or container.
4. Check CPU/memory and leave capacity for deployment slots, WebJobs, and
   operational tasks. Share plans only where resource contention and shared
   scaling are acceptable.
[Plan administration](https://learn.microsoft.com/en-us/azure/app-service/app-service-plan-manage);
[CLI reference](https://learn.microsoft.com/en-us/cli/azure/appservice/plan).

The operator needs `Microsoft.Web/serverfarms` write permission. App creation
also needs site write permission. Website Contributor and Web Plan Contributor
have different scopes of responsibility; ordinary Contributor at the resource
group can manage both, subject to Policy and locks.
[Web roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/web-and-mobile).

## Verify, troubleshoot, and cleanup

Confirm OS, region, SKU, worker count, and which apps reference the plan.
Investigate unavailable SKUs, quota/capacity errors, and incompatible OS settings
before retrying. Moving an app between plans has placement restrictions and
does not automatically relocate it to another region.

A paid dedicated plan can continue charging with stopped apps or no apps.
Deleting only a web app does not reliably remove its plan. Check other apps
and slots before deleting an unused plan. External databases, logs, and
certificates have their own costs.
[Costs](https://learn.microsoft.com/en-us/azure/app-service/overview-manage-costs).

[Question data](../../../questions/compute/compute-app-service-plans.json).
