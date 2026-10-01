# Blob soft deletion

- Topic ID: `storage.blobs.soft-delete`
- Objective: `st-14` (individual blobs)
- Verified: 2026-10-01
- Status: documented; Azure steps not executed

## Purpose and scope

Blob soft delete retains deleted blob data for a recovery interval. This guide's
example uses block blobs in a standard general-purpose v2 account with a flat
namespace and versioning disabled. Versioning changes the recovery sequence;
see [blob versioning](versioning.md). Container deletion is a separate scope:
use [container soft delete](container-soft-delete.md).
[Microsoft's behavior reference](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview)

## Microsoft recommendations

Microsoft recommends at least seven days of retention and layered protection
for blobs and containers. Select a longer period if deletion might take longer
to detect. Soft delete is an in-account recovery feature; account deletion and
broader recovery requirements need additional controls, such as a resource
lock and an appropriate backup design.
[Enablement guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-enable),
[protection options](https://learn.microsoft.com/en-us/azure/storage/blobs/data-protection-overview)

## Configure and verify

Use an identity authorized to update the storage account's Blob service
properties. Data recovery additionally requires authorization to the blob;
being able to inspect account settings does not by itself grant data access.
[Management and data access](https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access)

In the Portal, open **Storage account → Data management → Data protection**.
Enable soft delete for blobs, set the retention days, and save. Verify the
saved value rather than assuming the account's creation method enabled it.
[Configuration instructions](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-enable)

CLI example with a chosen 14-day recovery window:

```sh
az storage account blob-service-properties update \
  --account-name <existing-account> \
  --resource-group <existing-resource-group> \
  --enable-delete-retention true \
  --delete-retention-days 14

az storage account blob-service-properties show \
  --account-name <existing-account> \
  --resource-group <existing-resource-group>
```

Replace the placeholders before running these commands. Inspect
`deleteRetentionPolicy.enabled` and `deleteRetentionPolicy.days`. Fourteen days
is an exercise choice, not a required service setting.
[CLI configuration reference](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-enable)

## Recover and troubleshoot

For a disposable blob deleted after protection was enabled, open its container,
show deleted blobs, select the deleted blob, and choose Undelete while its
retention window remains active. For an overwritten block blob without
versioning, undelete recovers the soft-deleted snapshot; restoring its contents
as the current blob requires copying the desired snapshot back. Check that the
restored contents are the intended revision.
[Recovery procedure](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-manage)

If recovery is unavailable, check when protection was enabled, the original
retention setting, and whether the deletion affected a blob or its container.
Increasing retention does not extend the lifetime of blobs deleted under an
earlier setting. Disabling protection does not immediately purge objects
already retained under it.
[Retention behavior](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview)

## Cost and cleanup

Retained data consumes billable storage. Record the pre-exercise configuration
before changing it. Deleting test data after the exercise may leave retained
copies until expiry; disabling the feature does not make those copies vanish.
[Billing and retention](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview)

## Exam distinctions

State whether versioning and hierarchical namespace are enabled before choosing
a recovery procedure. Do not assume flat-namespace overwrite behavior applies
to every storage protocol. Practice questions in this batch explicitly identify
the account assumptions they need.

Practice: [data-protection questions](../../../questions/storage/data-protection.json).
