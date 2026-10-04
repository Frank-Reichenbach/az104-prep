# Azure Files share snapshots review

Topic: `storage.files.snapshots`; objective: `st-15`.
Verified: 2026-10-03. Source: questions/storage/data-protection.json.
The displayed share-snapshot module does not identify the source, time,
deletion outcome, or required readiness actions.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| st-file-snapshot-001 | Revise, revision 2 | Applied recovery action | Replace timestamp renaming with a real snapshot taken too late. Retain the read-only and whole-share protection alternatives. Key `copy`. |
| st-file-snapshot-002 | Revise, revision 2 | Applied timeline interpretation | Replace a padded binary and blob-tier distractor with explicit S1/S2 file changes and four recovery outcomes. Key `independent`. |
| st-file-snapshot-003 | Revise, revision 2 | Applied deletion-boundary assessment | Replace automatic backup conversion and unconditional seven days with expiry/lifetime and read-only/deletion misconceptions. Key `lifetime`. |
| st-file-snapshot-004 | Revise, revision 2 | Applied joint readiness steps | Require both a captured earlier state and confirmed source/destination permissions, making both keyed actions necessary. Keys `before`, `verify`. |

## Rationale evidence

[Snapshot guidance](https://learn.microsoft.com/en-us/azure/storage/files/storage-snapshots-files)
supports the copy and read-only explanations in 001 and the wrong new-snapshot
timing: snapshots capture the state at creation. The
[share soft-delete guide](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion)
supports why enabling whole-share deletion protection cannot undo an existing
individual overwrite.

The snapshot guide's space-usage section supports every rationale in 002:
only unique data is removed when a snapshot is deleted; retained snapshots
remain complete recovery points for their own captured states, including
files subsequently deleted from the live share. Deleting S1 does not change
S2's capture time.

Its capabilities and deletion sections support all four options in 003:
snapshots belong to the share, persist only until explicitly deleted or share
deletion, and can be deleted despite being read-only. A recreated name cannot
reconstruct the removed contents.

For 004 the snapshot guide recommends taking a snapshot before deployment and
documents browsing and copying captured files. The
[Azure Files planning guide](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-planning)
establishes authentication/access planning; source reads and destination writes
are required for the documented copy workflow. The dedicated soft-delete
guide supports the wrong protection-scope alternative. Readiness verification
is an explicit scenario requirement, not a claim of an additional Azure
service prerequisite for snapshot creation.

## Acceptance and verification

For 004 remove `before` and there is no pre-deployment capture; remove `verify`
and the required operator access is unconfirmed. Substituting either other
choice fails a capture or verification requirement. Only the keyed pair
satisfies both requirements. Each other item has one qualifying answer.

There are no variants. All IDs, option IDs, families, and objectives are
preserved. The batch tests copy behavior, a timeline, resource lifetime,
and joint readiness. The snapshot introduction loosely associates soft delete
with account protection; the dedicated guide explicitly limits it to share
scope. No scored claim relies on that introductory shorthand.

Build/check, 13 Node tests, static-site links, review hashes, and whitespace
checks validate the checkpoint. Review is author-led; no Azure labs were run.
