# Azure Files share soft deletion

- Topic ID: `storage.files.soft-delete`
- Objective: `st-15` (soft deletion)
- Verified: 2026-10-01
- Status: documented; Azure steps not executed

## Purpose and supported scope

This feature recovers deleted classic file shares created through
Microsoft.Storage. The current documentation excludes file shares created
through Microsoft.FileShares. Configure the account's File service properties;
the policy applies across classic shares in that account.
[Supported scope](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion)

It restores the share and retained contents, including snapshots. It does not
recover a single deleted file from an otherwise existing share. Use a suitable
[snapshot](snapshots.md) or backup for that failure.
[Recovery boundary](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion#how-soft-delete-works)

## Protection approach and permissions

Microsoft's Azure Files planning guidance treats snapshots, soft deletion, and
backup as different protection mechanisms. Select them from the recovery scope
and recovery-point requirements, rather than assuming one switch covers every
kind of deletion. This topic does not establish coverage of the separate Azure
Backup exam objectives.
[Azure Files planning](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-planning)

The following commands use the management plane. The operator needs permission
to update File service properties and restore shares at the account scope.
Reading restored files through SMB additionally requires the appropriate data
access. Record the original retention setting before changing it.

## Configure and verify

In the Portal, open the storage account's classic file shares page, open the
soft-delete setting, enable it, and save a retention period. CLI equivalent
for an exercise using 14 days:

```sh
az storage account file-service-properties update \
  --resource-group <existing-resource-group> \
  --account-name <existing-account> \
  --enable-delete-retention true \
  --delete-retention-days 14

az storage account file-service-properties show \
  --resource-group <existing-resource-group> \
  --account-name <existing-account>
```

Replace placeholders and inspect `shareDeleteRetentionPolicy`. Updating Blob
service properties would configure a different service.
[Microsoft's enablement examples](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion#enable-soft-delete)

## Recover and troubleshoot

After deleting only a disposable exercise share, enable **Show deleted shares**
in the Portal, select its deleted entry, and choose Undelete. Confirm its status
becomes Active and inspect its files and snapshots. In CLI, use
`az storage share-rm list --include-deleted` to obtain the deleted version and
`az storage share-rm restore` with that version and the share name. The version
identifies the particular deleted share to restore.
[Restore procedure](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion#restore-soft-deleted-file-share)

If a file was deleted while the share remained active, changing share retention
will not create a historical file copy. If the share was deleted, check the
original retention window and whether the correct deleted share version is
being restored. Changes to the period apply to later deletions; disabling the
feature does not immediately remove already retained shares.
[Retention semantics](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion)

## Cost and cleanup

Billing depends on the share's billing model; do not apply a single price rule
to every Azure Files offering. Soft-deleted provisioned shares can continue
to count against account quota until expiry. Use small exercise shares and
verify retained capacity after cleanup.
[Billing and quota considerations](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-prevent-file-share-deletion#billing)

Practice: [data-protection questions](../../../questions/storage/data-protection.json).
