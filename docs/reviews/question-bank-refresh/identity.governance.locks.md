# Resource locks review

Topic: `identity.governance.locks`; objective: `id-10`.
Verified: 2026-10-04. Sources: questions/identity/identity-governance-locks.json
and questions/identity/reviewed-variants.json.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| id-lock-delete-only | Revise, revision 2 | Applied type/scope configuration | Compare four complete lock configurations, with sibling boundary explicit. Key `delete`. |
| id-lock-freeze-variant | Revise, revision 2 | Applied type/scope configuration | Blocking updates changes the required type; independently check all four configurations. Key `readonly`. |
| id-lock-blob-data | Revise, revision 2 | Applied paired operation outcomes | Replace padded binary choices with control/data outcomes. Key `no`. |
| id-lock-data-write-variant | Revise, revision 2 | Applied paired operation outcomes | ReadOnly and overwrite replace delete lock and deletion; review both operations. Key `no`. |
| id-lock-owner | Revise, revision 2 | Troubleshooting complete sequence | State a removable user-created local lock; compare lock and role sequences. Key `remove`. |

## Evidence and acceptance

[Lock behavior](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/lock-resources)
supports types, inherited scope, Owner restrictions, administration permissions,
and control-plane enforcement. These trace all configuration and sequence
rationales: the group scope meets the sibling boundary, subscription scopes
fail it, CanNotDelete permits updates, and ReadOnly blocks them. A retained
lock blocks deliberate deletion regardless of the resource role. A system-owned
managed-application lock would need a different procedure; the stem excludes it.

[Operation planes](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/control-plane-and-data-plane)
supports account management versus Blob-service data operations. Together with
the lock guide this traces every paired-outcome rationale: the two control
operations are blocked and the two authorized data operations are permitted.
Those items are relabeled applied because they evaluate two configured paths.

The first family assesses type/scope selection. Its decisive update requirement
changes the key from CanNotDelete to ReadOnly. The second family assesses the
operation-plane boundary; changing type and data operation leaves that boundary
and key unchanged. Different keys are not forced where behavior is invariant.
Every variant was reviewed independently. One complete configuration/outcome/
sequence qualifies for each item; no joint-component sets exist. The displayed
topic label does not reveal the configuration or outcome. IDs/families remain.
Build/check, 13 tests, site links, hashes, and whitespace checks validate this
author-led checkpoint. No locks or resources were changed in Azure.
