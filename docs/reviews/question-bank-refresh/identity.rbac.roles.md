# Azure built-in roles and permission definitions review

Topic: `identity.rbac.roles`; objective: `id-06`.
Verified: 2026-10-04. Source: questions/identity/identity-rbac-roles.json.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| id-role-contributor-access | Revise, revision 2 | Foundation permission boundary | Adapt the padded binary question to compare four management actions. Key `no`. |
| id-role-notactions | Revise, revision 2 | Applied effective-permission interpretation | Use VM deletion and replace alphabetical precedence with an unnecessary definition change. Key `grant`. |
| id-role-data-reader | Keep, revision 1 | Applied management/data authorization | Entra Blob reads and excluded account management uniquely identify the offered data role. Key `data`. |

## Evidence and acceptance

[Contributor definition](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/privileged)
allows resource creation, updates, and deletion while excluding role-assignment
writes. This supports every permission-choice rationale.
[Role-definition semantics](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-definitions)
explains that NotActions subtracts within a role and does not deny another
role's grant. This supports all four effective-deletion rationales.

For the retained data-role item, the
[storage definitions](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage)
support Blob Data Reader's data read; role-definition semantics separates
management Reader and Owner from Entra data access.
[VM Contributor](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/compute)
grants VM management rather than Blob reads. These trace all retained rationales.
Owner also fails the explicit account-management constraint even if indirect
access through keys were considered. No substantive retained content changed.

The title does not reveal a permission outcome or selected role. Each item has
one valid individual answer; no joint sets or variants exist. The batch includes
a foundation boundary and two applied permission decisions. IDs/families remain.
Build/check, 13 tests, site links, hashes, and whitespace checks validate the
checkpoint. This is author-led review; no Azure assignments were changed.
