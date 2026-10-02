# Subscription administration and provider registration

Topic ID: identity.governance.subscriptions  
Objectives: id-13  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

A subscription is an Azure resource-management and billing boundary associated
with an Entra directory. Billing roles, Azure RBAC roles, and directory roles
are separate. Use IAM to delegate subscription resource access; changing the
invoice owner is a different administration task.
[Subscription administrators](https://learn.microsoft.com/en-us/azure/cost-management-billing/manage/add-change-subscription-administrator).

## Select and inspect the right subscription

Before running Azure CLI deployment commands:

```sh
az account list --output table
az account set --subscription '<subscription-id>'
az account show --query '{id:id,tenant:tenantId,name:name,state:state}'
```

Changing the active CLI subscription changes subsequent command context; it
does not move resources or grant access. A renamed subscription retains its ID.
Use the ID in automation to avoid ambiguous names.
[CLI subscription management](https://learn.microsoft.com/en-us/cli/azure/manage-azure-subscriptions-azure-cli).

## Register required providers

A deployment can need a resource provider registered in the target
subscription. Register only providers the workload requires. Use the
provider's /register/action permission, included in relevant broad management
roles.

```sh
az provider show --namespace Microsoft.Storage --query registrationState
az provider register --namespace Microsoft.Storage
```

Inspect registration and regional resource-type support before retrying a
failed deployment. Provider registration does not grant quota, enable every
SKU in every region, or authorize the operator to create resources.
[Provider registration](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-providers-and-types).

For quota failures, open **Quotas**, select the correct subscription,
provider, and region, review current usage, and request an increase if the
workload needs it. An approved quota does not guarantee immediate physical
capacity for every requested VM size.
[Quota requests](https://learn.microsoft.com/en-us/azure/quotas/quickstart-increase-quota-portal).

## Directory transfers are a separate project

Changing a subscription's associated directory can invalidate Azure role
assignments and managed identity dependencies. Inventory and re-create
required access and service relationships under the destination tenant using
Microsoft's service-specific checklist. It is not a harmless method of
renaming or selecting a subscription.
[Directory transfer implications](https://learn.microsoft.com/en-us/azure/role-based-access-control/transfer-subscription).

Verify subscription/tenant IDs, effective access, provider state, and quota
before making a minimal deployment. After a study exercise, restore the
intended CLI context and remove only temporary role grants; do not cancel a
real subscription as cleanup. Resource costs continue until the relevant
resources or billing commitments are addressed.

[Question data](../../../questions/identity/identity-governance-subscriptions.json).
