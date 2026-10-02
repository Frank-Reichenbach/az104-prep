# Resource group lifecycle and moves

Topic ID: identity.governance.resource-groups  
Objectives: id-12  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

A resource group is a management container for related Azure resources.
Microsoft recommends grouping resources with a shared lifecycle. A resource
belongs to one group at a time; groups cannot be nested. Group location stores
management metadata and does not force all contained resources into that region.
[Resource Manager model](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview).

## Create and organize

With resource-group creation permission at the subscription:

1. Open **Resource groups → Create**.
2. Select the subscription, name, and metadata region.
3. Apply ownership/cost tags and appropriate group-level access.
4. Deploy or organize resources based on lifecycle and authorization needs.

```sh
az group create --name '<group>' --location '<region>'
az resource list --resource-group '<group>' --output table
```

Inspect group properties, its resource inventory, and inherited IAM/Policy.
Different groups can hold resources that communicate; sharing a group is not
a network connectivity requirement.
[Portal management](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal).

## Move supported resources

For a management move, first check provider support, dependencies, source/
destination permission, locks, and destination quotas/policies. Use **Move →
Move to another resource group** or **Move to another subscription**, choose
the required related resources, and let validation complete.

A group/subscription move changes resource IDs; it does not relocate the
resource to a different Azure region. Cross-subscription moves normally require
the same Entra tenant, and resource-specific constraints still apply.
[Move requirements](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription).

Afterward, verify the new IDs, dependent references, IAM, policy, monitoring,
and normal operations. Do not assume resource-scoped role assignments or scripts
using old IDs automatically remain correct. For a failed validation, fix the
reported dependency rather than moving arbitrary subsets.

## Delete deliberately

Deleting a group deletes its contained resources; the group is not a harmless
folder that can be removed while preserving everything inside. Inventory data,
backups, locks, and dependencies first. Remove only the disposable study group
after confirming its contents, then verify deletion completion.
[Group lifecycle](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal).

The group itself is organizational metadata, but its resources can incur
charges. A stopped deployment or a moved group is not evidence that those
resource charges stopped.

[Question data](../../../questions/identity/identity-governance-resource-groups.json).
