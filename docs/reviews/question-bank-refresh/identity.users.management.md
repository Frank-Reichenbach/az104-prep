# Entra user provisioning and properties review

Topic: `identity.users.management`; objectives: `id-01`, `id-02`.
Verified: 2026-10-03. Source: questions/identity/identity-users-management.json.
The rendered title supplies context without revealing the role, authority, or ID.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| id-user-role | Keep, revision 1 | Applied constrained role comparison | User Administrator is the listed least-privileged creation role; Global Administrator is broader, Azure Contributor is a different permission system, and Guest Inviter addresses external invitations. Key `user`. |
| id-user-source | Revise, revision 2 | Troubleshooting persistent attribute repair | Replace resource tags, licensing, and duplicate identities with real cloud editing/API/role alternatives; explicitly retain AD authority and unchanged mappings. Key `ad`. |
| id-user-stable-id | Revise, revision 2 | Foundation stable identity reference | Replace department/location with actual identity fields and state that names/addresses can change while the object remains. Key `id`. |

## Rationale evidence

The [user creation guide](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users)
separates ordinary creation, guest invitation, and administrator-role assignment.
Its least-privilege creation role supports the retained key. The
[Entra role reference](https://learn.microsoft.com/en-us/entra/identity/role-based-access-control/permissions-reference)
distinguishes User/Global Administrator and Guest Inviter; the
[Azure Contributor definition](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/privileged#contributor)
addresses resource management, not directory-user creation.

The [profile maintenance guide](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-user-profile-info)
requires ordinary synchronized job-information changes at the authoritative
AD source. A portal/API edit or broader cloud role does not alter the specified
authority and unchanged mapping. Exceptional edits of other named attributes
and explicit authority-transfer designs are not asserted impossible; they are
outside this department scenario.

The [Graph user schema](https://learn.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0)
defines read-only unique `id` and distinguishes displayName, userPrincipalName,
and mail. The profile guide documents editable name/sign-in properties. The
question explicitly permits changing all three offered name/address fields and
excludes deletion/recreation, so none supplies the unchanged object reference.

## Acceptance

Each item has one independently evaluated answer. No joint sets or variants
exist. The batch retains a constrained role comparison, observed synchronization
failure, and a short identity distinction. Stable IDs/families remain.
Build/check, 13 tests, site links, hashes, and whitespace checks validate this
author-led review; no users or directory properties were changed in Azure.
