# Effective access and RBAC troubleshooting

Topic ID: identity.rbac.effective-access  
Objectives: id-08  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Effective Azure RBAC access combines applicable direct, group, and inherited
role grants. A narrower Reader assignment does not downgrade a broader
Contributor assignment. Applicable deny assignments and assignment conditions
can still block an operation.
[Evaluation model](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview).

## Inspect actual access

Use an account permitted to read assignments at the target scope; this review
does not require granting the affected user more privilege.

1. Identify the failing principal object ID, tenant, target resource ID, and
   operation. Separate management operations from data requests.
2. Open the resource's **IAM → Check access**, select the principal, and inspect
   assignment paths and inherited scopes.
3. Include group membership and any eligible role that must first be activated.
4. Inspect **Deny assignments** and relevant role-assignment conditions.
5. Test the exact operation with the affected identity after propagation/token
   refresh, preserving its error code and request time.
[Check access procedure](https://learn.microsoft.com/en-us/azure/role-based-access-control/check-access).

A CLI assignment listing can supplement the portal:

```sh
az role assignment list --assignee '<principal-object-id>' \
  --scope '<resource-id>' --include-inherited --include-groups --all
```

Do not interpret an incomplete list, wrong tenant, or unresolved group membership
as proof of no access.
[Listing assignments](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-list-cli).

## Distinguish denies from other controls

NotActions is only a subtraction inside a role definition. A deny assignment
is a separate object enforced despite a matching grant. Azure creates/manages
deny assignments for supported features; users cannot arbitrarily author them
like ordinary role grants.
[Deny assignments](https://learn.microsoft.com/en-us/azure/role-based-access-control/deny-assignments).

A successful RBAC evaluation also does not guarantee an operation succeeds.
Azure Policy, resource locks, service ACLs, and network restrictions can impose
separate constraints. For example, storage firewall denial is not repaired by
adding another Blob data role.
[RBAC troubleshooting](https://learn.microsoft.com/en-us/azure/role-based-access-control/troubleshooting).

## Verify a minimal correction

Correct the smallest identified problem: wrong scope, wrong principal, missing
action, inactive eligibility, condition, or another service control. Re-test
one intended action and one action that must remain disallowed. Avoid using
Owner as a diagnostic shortcut.

After an exercise, remove only new diagnostic assignments and restore any
temporary group membership. Keep a record of the original error and actual
grant path; no Azure resources are changed by reading these notes.

[Question data](../../../questions/identity/identity-rbac-effective-access.json).
