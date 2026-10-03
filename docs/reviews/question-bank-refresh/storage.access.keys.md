# Storage account access keys review

Topic: `storage.access.keys`; objective: `st-04`.
Verified: 2026-10-03. Source: questions/storage/storage-access-keys.json.
The module does not choose the rotation step, permitted Blob credential,
or role assignment.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| st-key-rotation-order | Revise, revision 2 | Applied next rotation step | Replace account deletion with a real reminder that does not migrate consumers; explain validation and old-key SAS invalidation. Key `switch`. |
| st-key-blob-disable | Keep, revision 1 | Foundation authorization distinction | Four real credentials, scoped specifically to Blob reads; exactly delegation SAS remains permitted by the stated setting. Key `user`. |
| st-key-admin-role | Revise, revision 2 | Applied constrained role assignment | Replace an unrelated Queue role with capable but overbroad Storage Account Contributor. Add account scope and configuration-write boundary. Key `operator`. |

## Rationale evidence

[Account key management](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage)
supports every rotation alternative: migrate to the other key before rotation,
regeneration invalidates old-key consumers and signed service/account SAS,
and a key expiration policy is a reminder rather than consumer migration.
These changes are examples/recommendations for continuity, not a claim that
every application credential is centrally updated by Azure.

[Shared Key prevention](https://learn.microsoft.com/en-us/azure/storage/common/shared-key-authorization-prevent)
supports all four blob-disable explanations: delegation SAS is Entra-backed;
service/account SAS and key-bearing connection strings use Shared Key. Its
older Blob-only delegation wording is narrower than the current SAS overview;
this question makes only the supported Blob-specific claim.

[Storage role definitions](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage)
support every admin-role rationale: Key Operator has listkeys/regeneratekey;
Data Reader lacks those operations despite including delegation generation;
Account Contributor has the account wildcard; Delegator has only delegation
generation. Scope and allowed management operations yield exactly one option.
Possession of an account key can authorize data through Shared Key; the stem
restricts management configuration writes, not the inherent power of a key.

## Acceptance and verification

All three single-answer sets are unique under their stated requirements.
There are no variants. The batch includes next-step sequencing, credential
recognition, and constrained role selection. Stable IDs, option IDs, families,
and objectives are preserved. Build/check, 13 Node tests, static-site links,
ledger hashes, and whitespace checks validate the checkpoint. Source review
is author-led; no keys were read or rotated and no Azure operations executed.
