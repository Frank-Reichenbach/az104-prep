# Azure Files share snapshots

- Topic ID: `storage.files.snapshots`
- Objective: `st-15` (snapshots)
- Verified: 2026-10-01
- Status: documented; Azure steps not executed

## Purpose and prerequisites

A share snapshot records the share at a point in time and is read-only. It can
provide an earlier copy of an individual file after an overwrite or deletion.
The recovery exercise below uses an existing classic SMB share, a disposable
file, and a snapshot created before the unwanted change.
[Snapshot capabilities](https://learn.microsoft.com/en-us/azure/storage/files/storage-snapshots-files)

Snapshot management and file access have different authorization needs. Confirm
the operator can create/list snapshots and read the source file; copying back
also needs permission to write the destination. For SMB access, share-level
permissions and filesystem permissions both matter. A management role does
not automatically grant access through the SMB filesystem.
[Azure Files access planning](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-planning)

## Microsoft recommendations

Microsoft suggests taking a snapshot before an application deployment that
could corrupt data, and using Azure Backup to take and manage snapshots when
scheduled protection is required. Select the recovery point and retention
schedule from the workload's needs.
[Snapshot usage guidance](https://learn.microsoft.com/en-us/azure/storage/files/storage-snapshots-files#when-to-use-share-snapshots)

## Create, verify, and recover

Portal procedure for the SMB exercise:

1. Open the storage account and its classic file share.
2. Open **Operations → Snapshots**, create a snapshot, and record its timestamp.
3. Change the contents of the disposable file in the live share.
4. Open the earlier snapshot and browse to that file.
5. Restore/copy the file from the snapshot to a separate recovery destination
   first. Compare the recovered content with the expected original.
6. Replace the live file only when the recovered content has been verified.

The separate recovery destination is this exercise's verification choice.
Microsoft documents browsing snapshots and restoring individual files through
the Portal; Windows SMB clients can also use Previous Versions when available.
[Snapshot creation and recovery](https://learn.microsoft.com/en-us/azure/storage/files/storage-snapshots-files)

## Distinguish recovery scopes

Snapshots address older file contents, while [share soft deletion](soft-delete.md)
addresses deletion of the whole share. A snapshot belongs to its source share;
do not delete the share expecting its snapshots to remain independently
available. Plan protection for the share and account as separate layers.
[Snapshot lifetime](https://learn.microsoft.com/en-us/azure/storage/files/storage-snapshots-files#share-snapshot-capabilities)

## Cost, limits, and cleanup

Snapshots store changed content incrementally, but each retained snapshot is
usable as its own recovery point. Deleting an older snapshot does not require
deleting newer snapshots. Record timestamps and remove only exercise snapshots
that are no longer required. Frequently changing data can increase retained
capacity costs.
[Space usage](https://learn.microsoft.com/en-us/azure/storage/files/storage-snapshots-files#share-snapshot-space-usage)

Do not apply SMB-specific recovery steps unchanged to NFS. The current snapshot
guide covers both protocols and two resource providers; read the section for
the actual share before selecting its API or restore workflow. The initial
questions explicitly state classic SMB scope where it matters.

## Documentation note

The snapshot overview's introductory warning refers to soft delete alongside
account protection. The [dedicated soft-delete guide](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion)
limits that feature to the file-share level. This material follows that explicit
scope and does not claim that share soft delete restores a deleted account.

Practice: [data-protection questions](../../../questions/storage/data-protection.json).
