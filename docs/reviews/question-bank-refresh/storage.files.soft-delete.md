# Azure Files share soft deletion review

Topic: `storage.files.soft-delete`; objective: `st-15`.
Verified: 2026-10-03. Source: questions/storage/data-protection.json.
Rendered module context identifies the service; it does not choose a recovery
source, configured service policy, restored contents, or deleted-instance ID.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| st-file-delete-001 | Revise, revision 2 | Troubleshooting recovery source | Add Active status and missing undelete entry as observed evidence. Replace retention reconstruction with a new snapshot taken too late. Key `snapshot`. |
| st-file-delete-002 | Revise, revision 2 | Applied policy scope | Use parallel service/duration configurations; replace a magic tag with a real disabled File policy. Key `file-service`. |
| st-file-delete-003 | Revise, revision 2 | Applied restoration outcome | Replace a subscription-wide restore claim with the plausible files-versus-snapshots contents distinction. Key `contents`. |
| st-file-delete-004 | Revise, revision 2 | Applied next CLI step | Compare share/deletion/snapshot identifiers instead of unrelated SAS expiry. Key `deleted-version`. |

## Rationale evidence

The [dedicated Files soft-delete guide](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion)
supports the recovery boundary, active/deleted status, all File service policy
and duration distinctions, and every restored-content alternative. It also
provides the list-deleted-shares/restore sequence and the deleted share version.
For 001 the [snapshot guide](https://learn.microsoft.com/en-us/azure/storage/files/storage-snapshots-files)
supports earlier versus newly captured file states. The
[Blob versioning overview](https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview)
was checked in the preceding topic and establishes that blob versions belong
to Blob objects rather than Azure Files.

For the other service alternatives in 002, the
[blob soft-delete overview](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview)
and [container overview](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview)
establish their different protection scopes. A disabled File policy does not
provide recovery just because its days value is present.

For 004, the [share-rm command reference](https://learn.microsoft.com/en-us/cli/azure/storage/share-rm?view=azure-cli-latest#az-storage-share-rm-restore)
documents the distinct resource/name context and required deleted-version
parameter. The Files snapshot guide establishes snapshot timestamps as a
different point-in-time identity. All wrong identifiers fail to select the
retained deleted-share instance required by this command.

## Acceptance and verification

Every question has exactly one qualifying answer. Conditions specify classic
shares and active retention where those facts matter. The batch combines
observed scope mismatch, configuration choice, recovery contents, and a CLI
next step. There are no variants; stable IDs and families are preserved.
Soft-delete recovery stays within share scope; the snapshot introduction's
broader wording is not used to claim storage-account recovery.

Build/check, 13 Node tests, static-site links, ledger hashes, and whitespace
checks validate the checkpoint. Source review is author-led; no Azure commands
were executed. Automated checks do not prove technical correctness.
