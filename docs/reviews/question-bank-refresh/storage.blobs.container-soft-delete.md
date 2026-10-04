# Container soft deletion review

Topic: `storage.blobs.container-soft-delete`; objective: `st-14`.
Verified: 2026-10-03. Source: questions/storage/data-protection.json.
The Container soft deletion label does not resolve the scope, setting, or
restoration outcomes being asked.

| ID | Decision | Pattern / difficulty | Repair and final key |
| --- | --- | --- | --- |
| st-container-delete-001 | Revise, revision 2 | Troubleshooting name collision | Add observed restore failure; replace container archive fiction with a separate blob-soft-delete prerequisite misconception. Key `collision`. |
| st-container-delete-002 | Revise, revision 2 | Applied recovery outcome | Replace padded yes/no wording and retention reconstruction with four scope/time outcomes. No historical protection exists for the individual deletion. Key `no`. |
| st-container-delete-003 | Revise, revision 2 | Applied property interpretation | Replace account tier/public properties with genuine nearby Blob service retention and restore properties. Key `container-policy`. |
| st-container-delete-004 | Revise, revision 2 | Applied protection-boundary review | Replace anonymous-container protection fiction with active-versus-retained data scope confusion. Key `account`. |

## Rationale evidence

The [container overview](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview)
supports all four explanations in 001: restore uses the original name, an
active replacement blocks it, recovery is available during retention, and
blob soft delete is a separate individual-object scope. It also supports the
container-at-deletion snapshot of contents and lack of live-container rollback
in 002. The [blob overview](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview)
supports why later enablement does not retroactively retain a previously
unprotected deletion.

For 003, [container enablement](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-enable)
documents its own policy and verification. The
[Blob service property reference](https://learn.microsoft.com/en-us/azure/templates/microsoft.storage/storageaccounts/blobservices)
defines all offered fields. The
[data-protection scope table](https://learn.microsoft.com/en-us/azure/storage/blobs/data-protection-overview)
distinguishes container recovery from blob versioning and point-in-time
restore, including point-in-time restore's lack of container-operation recovery.

For 004, the container overview and data-protection overview support all
explanations: duration changes and blob versioning do not extend the feature
to deleted accounts; retained and active data both remain within the account.
The lock suggestion is preventative account management, not a claim that
container soft delete can restore a deleted account or that every account
recovery is impossible through other mechanisms.

## Acceptance and verification

Each question has exactly one qualifying answer. Wrong choices are related
protection scopes, property meanings, and restoration timing/destinations.
All IDs, option IDs, families, and objectives remain stable. No variants are
present. The batch combines an observed failure, recovery outcome, property
interpretation, and design-boundary decision rather than feature-name recall.

Build/check, 13 Node tests, static-site links, review hashes, and whitespace
checks validate the checkpoint. This is author-led documentation review;
no Azure commands were executed. Automated checks do not prove service claims.
