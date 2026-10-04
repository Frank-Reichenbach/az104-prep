# External users and B2B collaboration review

Topic: `identity.users.external`; objective: `id-04`.
Verified: 2026-10-04. Source: questions/identity/identity-users-external.json.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| id-guest-resource-role | Revise, revision 2 | Applied role/scope selection | Replace shared passwords and name changes with four comparable role assignments. State operations and scope; key `rbac`. |
| id-guest-inbound | Revise, revision 2 | Applied partner-policy selection | State home/resource tenants and partner-specific boundary; compare direction, collaboration mode, and default scope. Key `inbound`. |
| id-guest-invite-vs-block | Revise, revision 2 | Troubleshooting policy repair | Replace padded yes/no choices with four policy changes and observed failure evidence. Key `no`. |

## Evidence and acceptance

[General Azure roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/general)
supports Reader; [privileged roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/privileged)
supports Contributor and Owner permissions. The
[external-user assignment procedure](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-external-users)
supports the guest's role assignment and resource-group versus subscription
scope. These disqualify Reader's operations, Owner's extra access permissions,
and subscription Contributor's broader scope. The repaired role item requires
applied comparison rather than diagnosing an unspecified permission.

[Cross-tenant overview](https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-overview)
supports partner-specific versus default settings, the two directions, and
the distinction between collaboration and direct connect. This traces every
policy-selection rationale. The
[B2B configuration procedure](https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-settings-b2b-collaboration)
separates invitation restrictions from access policy and describes user and
application scoping. Together these support the four repair rationales;
the invitation allowlist cannot repair the stated inbound collaboration block.

The first item is relabeled applied to match its new decision. Each item has
one sufficient individual answer; no joint sets or variants exist. Displayed
topic context does not select a role/scope or policy configuration. Stable
question/option IDs and families remain. Build/check, 13 tests, site links,
hashes, and whitespace checks validate this author-led checkpoint. No
invitations were sent and no tenant settings were changed.
