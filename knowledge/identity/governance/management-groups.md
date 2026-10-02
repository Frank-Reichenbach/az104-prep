# Management groups and inherited governance

Topic ID: identity.governance.management-groups  
Objectives: id-15  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Management groups organize subscriptions within one Entra tenant so governance
can be applied above subscription scope. A management group or subscription
has one parent in the hierarchy. Parent Azure Policy and RBAC assignments can
affect descendants.
[Management group model](https://learn.microsoft.com/en-us/azure/governance/management-groups/overview).

## Design and implement

Use a shallow hierarchy reflecting durable governance boundaries, such as
corporate-connected, internet-facing, and sandbox workloads, rather than
mirroring every reporting line or development stage. Keep root-scope grants
and policies limited because their reach is broad.
[Hierarchy design guidance](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-area/resource-org-management-groups).

1. Open **Management groups**, inspect the existing tree and tenant root.
2. With the required creation/parent permissions, create a group with a stable
   ID and a readable display name.
3. Add or move the intended subscription after checking access at the child,
   current parent, and target parent. Root-related cases have specific rules;
   inspect Microsoft's permission table.
4. Review inherited policy and RBAC before moving a production subscription.
5. Verify the new parent, effective assignments, and a representative permitted
   deployment.
[Management operations](https://learn.microsoft.com/en-us/azure/governance/management-groups/manage).

The group ID and display name are different; changing the display name does
not create a new group. A subscription move in this hierarchy does not change
its directory or physically relocate its resources. It can nevertheless alter
effective governance and access.
[Hierarchy behavior](https://learn.microsoft.com/en-us/azure/governance/management-groups/overview).

## Test inheritance and troubleshoot

In a disposable subscription, inspect a parent policy assignment from a child
scope and test the intended behavior. If a move fails, check required write
permissions on the affected objects/parents and policy or hierarchy constraints;
subscription Contributor alone is not a universal right to reorganize the tree.

A management group cannot contain subscriptions from different Entra tenants.
Do not confuse multi-subscription governance with a cross-tenant directory
transfer. The root is a governance boundary, not an automatically inherited
license or invoice arrangement.
[Managing subscriptions](https://learn.microsoft.com/en-us/azure/governance/management-groups/manage).

For cleanup, move the disposable child back only after reviewing resulting
inheritance, then remove an empty exercise group. Preserve the root and any
production assignments. Management groups do not stop or start billable
resources; their policies can affect subsequent provisioning.

[Question data](../../../questions/identity/identity-governance-management-groups.json).
