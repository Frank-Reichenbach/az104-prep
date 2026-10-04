# Azure role assignments and scopes review

Topic: `identity.rbac.assignments`; objective: `id-07`.
Verified: 2026-10-04. Source: questions/identity/identity-rbac-assignments.json.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| id-scope-one-group | Keep, revision 1 | Applied scope selection | All four scopes test the requested coverage boundary. Key `rg`. |
| id-scope-inherited-remove | Revise, revision 2 | Troubleshooting inherited removal | Supply the observed disabled removal and exact grant; replace tag deletion with an unrelated child-assignment removal. Key `parent`. |
| id-scope-triplet | Keep, revision 1 | Foundation complete-set selection | Each candidate set is evaluated as a whole; only one contains who, permission definition, and resource scope. Key `set`. |

## Evidence and acceptance

[Scope hierarchy](https://learn.microsoft.com/en-us/azure/role-based-access-control/scope-overview)
supports resource-group coverage, subscription/root breadth, and VM-only scope.
This traces every rationale in the first item.
[Removal guidance](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-remove)
requires removing inherited assignments at their defining scope.
[RBAC overview](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview)
supports additive grants, so adding Reader cannot reduce Contributor, and
removing a different grant cannot revoke the specified assignment. Together
these trace the four removal-choice rationales.

The overview identifies principal, role definition, and scope. Its distinction
between Azure resource authorization and authentication, together with the
scope reference's resource identifiers, disqualifies region, display name,
tags, and authentication/domain substitutes in the retained complete sets.
The [portal procedure](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal)
confirms the administrator needs assignment-write permission; the repair
assumes an authorized administrator rather than implying any user can revoke.

One individual scope, one removal action, and one complete candidate set
qualify. No variants or joint-component sets exist. The title orients without
selecting a scope or removal action. The batch includes applied scope selection,
diagnosis, and a foundation set. IDs/families remain. Build/check, 13 tests,
site links, hashes, and whitespace checks validate the author-led checkpoint.
No role assignments were executed.
