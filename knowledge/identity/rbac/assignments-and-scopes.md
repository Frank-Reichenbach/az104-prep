# Azure role assignments and scopes

Topic ID: identity.rbac.assignments  
Objectives: id-07  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

An Azure role assignment combines a principal, role definition, and scope.
The hierarchy is management group → subscription → resource group → resource.
Permissions assigned at a parent can apply to descendants; a child assignment
does not grant access to its parent or sibling resources.
[Scope hierarchy](https://learn.microsoft.com/en-us/azure/role-based-access-control/scope-overview).

## Apply least privilege

Start with the required operation, choose a suitable
[built-in role](built-in-roles.md), and identify the narrowest practical scope.
Prefer maintained groups for people and managed identities for workloads.

To grant a group Reader on one resource group, an administrator needs
`Microsoft.Authorization/roleAssignments/write` at that scope, such as through
Role Based Access Control Administrator or Owner. Contributor alone cannot
create the assignment.
[Assignment prerequisites](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal).

1. Open the target group's **Access control (IAM)**.
2. Choose **Add role assignment**, select Reader, and choose the Entra group.
3. Review the exact scope and principal object ID; similarly named groups are
   not interchangeable.
4. Save and inspect **Role assignments**, including inherited entries.

CLI equivalent, with placeholders:

```sh
az role assignment create \
  --assignee-object-id '<group-object-id>' --assignee-principal-type Group \
  --role 'acdd72a7-3385-48ef-bd42-f606fba81ae7' \
  --scope '/subscriptions/<subscription-id>/resourceGroups/<group>'
```

The role ID here is Reader. Supplying the principal object ID/type avoids
depending on display-name resolution.
[CLI assignment guidance](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-cli).

## Verify and revoke

Use IAM **Check access** for a member, then test a read and a disallowed write
with that identity. Verify another resource group is outside the grant.
Allow for role propagation and token refresh before interpreting a newly
changed assignment as ineffective.
[Access troubleshooting](https://learn.microsoft.com/en-us/azure/role-based-access-control/troubleshooting).

Remove the exact test assignment at its defining scope. An inherited
subscription role cannot be revoked only from a child group's assignment list;
change the parent grant or redesign group membership/scope. Adding Reader at
a child does not narrow an inherited Contributor grant.

Record assignment IDs for cleanup rather than deleting all assignments for a
principal. These examples grant no access until deliberately executed, and
resource-management access may permit billable operations.

[Question data](../../../questions/identity/identity-rbac-assignments.json).
