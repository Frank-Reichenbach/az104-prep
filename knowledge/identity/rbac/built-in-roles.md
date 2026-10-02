# Azure built-in roles and permission definitions

Topic ID: identity.rbac.roles  
Objectives: id-06  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Azure role-based access control (RBAC) authorizes actions on Azure resources.
It is distinct from Entra directory administration. Select the role for the
required operations, then assign it at a suitable scope.

| Role | Core purpose |
| --- | --- |
| Reader | View resource configuration |
| Contributor | Manage resources, excluding access assignment administration |
| Owner | Manage resources and access |
| Role Based Access Control Administrator | Manage Azure RBAC access |
| Storage Blob Data Reader | Read Blob data through supported authorization |

Prefer a specialized role when a broad role would grant unrelated actions.
[RBAC overview](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview).

## Read the role definition

An administrator designing access should inspect **Access control (IAM) →
Roles → View** before assigning a role. Compare the requested task with:

- Actions/NotActions: management operations included and subtracted.
- DataActions/NotDataActions: supported data operations included and subtracted.
- AssignableScopes: where a role definition may be assigned, not where a
  particular user already has a role assignment.

NotActions subtracts from that role; it is **not** a deny assignment that
cancels permissions granted by another role.
[Role definition semantics](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-definitions).

## Implement and verify a choice

For an analyst who only inspects VM configuration, select Reader at the
required resource group. For an operator who manages VMs, inspect Virtual
Machine Contributor and its related-resource requirements rather than
defaulting to Owner. Guest OS sign-in remains a separate access concern.
[Compute role definitions](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/compute).

An authorized access administrator assigns the chosen role through IAM,
selects the principal, and reviews scope before saving. Use **Check access**
and a test of the actual intended operation to verify the result.
[Portal assignment](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal).

For direct Entra Blob reads, a management Reader grant is insufficient; use
the Blob data role. Conversely, some powerful management roles can retrieve
account keys, giving indirect data access: “management role” does not always
mean harmless data isolation.
[Storage roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage).

Remove the exact temporary assignment after testing. Do not delete the user or
resource to undo an access grant. RBAC itself does not deploy resources, but
actions permitted by a role can create billable infrastructure.

[Question data](../../../questions/identity/identity-rbac-roles.json).
