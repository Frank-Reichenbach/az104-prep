# Resource locks

Topic ID: identity.governance.locks  
Objectives: id-10  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

A management lock guards Azure control-plane operations. CanNotDelete allows
authorized modification but blocks deletion; ReadOnly also blocks updates.
Locks inherit from subscriptions and resource groups to children, and the
most restrictive applicable lock governs the operation.
[Lock behavior](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources).

## Configure and test

The operator needs Microsoft.Authorization/locks write/delete permissions,
such as those in Owner or User Access Administrator; ordinary Contributor
does not include lock administration.

1. Open the disposable resource group's **Locks** page.
2. Add a Delete lock with a name and a note explaining ownership/purpose.
3. Verify it appears on a child resource as inherited.
4. Test an intended management update and a delete attempt. With sufficient
   ordinary RBAC permission, the update can work while deletion is blocked.

```sh
az lock create --name protect-exercise --lock-type CanNotDelete \
  --resource-group '<group>'
az lock list --resource-group '<group>'
```

Remove the lock only through an authorized change before deliberate cleanup.
An Owner may be authorized to remove a lock, but the Owner's ordinary delete
request does not silently ignore the still-present lock.
[Configuration and permissions](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources).

## Understand the data-plane boundary

A storage-account lock does not generally protect blob contents from a
data-plane delete. Some resource types expose similar operations through both
ARM and service endpoints; determine which API the client uses.
Use retention, soft deletion, or other service protection for the data itself.
[Control and data planes](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane).

ReadOnly can also block actions that look like reads in a UI but use a
control-plane POST, such as listing storage account keys. It can interfere
with automation and operational workflows. Evaluate the documented effects
for each resource type before applying a broad read-only lock.
[Service-specific lock considerations](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources).

For troubleshooting, inspect locks at every ancestor scope and retain the
operation/error details. Do not grant more RBAC roles to solve a lock denial.
Locks do not stop resource billing: a protected VM or database can continue
incurring charges. Remove the exercise lock and then delete only disposable
resources that you intended to clean up.

[Question data](../../../questions/identity/identity-governance-locks.json).
