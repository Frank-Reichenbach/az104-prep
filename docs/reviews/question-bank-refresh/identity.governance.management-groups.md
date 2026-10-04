# Management groups and inherited governance review

Topic: `identity.governance.management-groups`; objective: `id-15`.
Verified: 2026-10-04. Source: questions/identity/identity-governance-management-groups.json.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| id-mg-parent-policy | Revise, revision 2 | Applied hierarchy/configuration interpretation | Use nested and sibling branches plus specific deployment locations. Key `child`. |
| id-mg-one-parent | Revise, revision 2 | Foundation complete hierarchy comparison | Replace padded yes/no choices with four hierarchy candidates. Key `no`. |
| id-mg-move-impact | Revise, revision 2 | Applied access outcome after a move | Calculate inherited and direct grants rather than choose unrelated resource relocation effects. Key `inherit`. |

## Evidence and acceptance

[Management-group overview](https://learn.microsoft.com/en-us/azure/governance/management-groups/overview)
documents descendant inheritance, one direct parent for each group/subscription,
and the root hierarchy. These support all hierarchy choices: a chain is valid;
separate Policy/RBAC parents, shared child groups, and cycles violate that model.
The circular candidate is an inference from the documented rooted hierarchy.
Nested descendants receive the Production assignment; sibling TestSub does not.
[Deny effect](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-deny)
supports rejecting the noncompliant VM request. The two West Europe requests
are compliant with the specified location rule; the Sandbox requests are outside
scope. Each deployment rationale follows these two sources and scenario facts.

[RBAC overview](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview)
documents scopes and additive permissions. Together with management-group
inheritance, it establishes the move result: former sibling-ancestor grants no
longer apply, new ancestor grants apply, and direct resource-group assignments
continue within their unchanged scope. All four role-outcome rationales trace
to this model. Built-in roles, completed propagation, an authorized mover,
and absence of other grants/denies eliminate custom-role move restrictions and
timing ambiguity. The item evaluates resulting grants, not move permissions.

Each item has one complete qualifying candidate. No joint sets or variants.
The displayed inherited-governance label does not identify a deployment,
valid hierarchy, or resulting grant combination. Two applied decisions and
one foundation distinction retain the intended difficulty. Stable IDs/families
remain. This author-led review is checked by build/check, 13 tests, generated
site links, hashes, and whitespace checks; no Azure actions were executed.
