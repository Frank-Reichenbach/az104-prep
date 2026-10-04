# Effective access and RBAC troubleshooting review

Topic: `identity.rbac.effective-access`; objective: `id-08`.
Verified: 2026-10-04. Source: questions/identity/identity-rbac-effective-access.json.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| id-effective-additive | Keep, revision 1 | Applied inherited/additive grants | Each option tests a distinct permission-precedence misconception. Key `yes`. |
| id-effective-deny | Revise, revision 2 | Applied paired-outcome interpretation | Replace role conversion and creation-order claims with read/delete outcomes under a deletion-only deny. Key `deny`. |
| id-effective-check-path | Revise, revision 2 | Troubleshooting independent access paths | Replace tag/name grants with sibling-resource and inactive-eligibility paths; clarify that each selected path is sufficient. Keys `parent`, `group`. |

## Evidence and acceptance

[RBAC evaluation](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview)
supports the retained additive item: inherited Contributor remains, specific
Reader does not replace it, assignment order does not decide, and Owner is
unnecessary. [Deny assignments](https://learn.microsoft.com/en-us/azure/role-based-access-control/deny-assignments)
supports operation-specific denied actions. Together they trace all four
paired outcomes; only deletion matches the stated deny. Difficulty is now
applied because two operations must be evaluated under configuration.

[Scope hierarchy](https://learn.microsoft.com/en-us/azure/role-based-access-control/scope-overview)
supports subscription inheritance and absence of sibling-resource coverage.
The RBAC overview supports group grants.
[PIM activation](https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-resource-roles-activate-your-roles)
supports the inactive-eligibility distractor.
[Check access](https://learn.microsoft.com/en-us/azure/role-based-access-control/check-access)
exposes inherited and eligible assignments for inspection. These trace each
access-path rationale. This is an individual-solutions item: subscription
Reader and group Reader each suffice alone, rather than being jointly needed.
Exactly those two offered paths can explain current access.

The title does not reveal an outcome or grant path. One individual answer,
one complete paired-outcome candidate, and two independently sufficient paths
qualify. No variants exist. The batch covers grant combination, deny scope,
and diagnosis. Stable IDs/families remain. Build/check, 13 tests, site links,
hashes, and whitespace checks validate this author-led checkpoint. No Azure
role assignments or denies were executed.
