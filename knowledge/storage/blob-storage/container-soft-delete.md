# Container soft deletion

- Topic ID: `storage.blobs.container-soft-delete`
- Objective: `st-14` (containers)
- Verified: 2026-10-01
- Status: documented; Azure steps not executed

## Purpose and prerequisites

Container soft delete recovers a deleted container and the contents retained
with it. It does not roll an existing container back after someone deletes one
blob inside it. That requires [blob soft deletion](blob-soft-delete.md) or
[versioning](versioning.md).
[Scope and restoration behavior](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview)

Use a disposable container in an existing storage account. The administrator
must be authorized to change Blob service properties and perform the restore
operation. Use the account's approved management role and verify permissions
before deletion; a read-only role cannot configure protection.
[Configuration workflow](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-enable)

## Microsoft recommendations

Enable container protection alongside blob-level recovery. Microsoft recommends
at least seven days and adjusting retention for detection and response time.
For account-level deletion risks, use a resource lock and consider the broader
backup requirements; retained containers are still inside that account.
[Protection guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/data-protection-overview),
[container retention guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview)

## Configure and verify

In **Storage account → Data management → Data protection**, enable container
soft delete and save the retention interval. The setting is separate from blob
soft delete. A CLI equivalent for a 14-day exercise window is:

```sh
az storage account blob-service-properties update \
  --account-name <existing-account> \
  --resource-group <existing-resource-group> \
  --enable-container-delete-retention true \
  --container-delete-retention-days 14

az storage account blob-service-properties show \
  --account-name <existing-account> \
  --resource-group <existing-resource-group>
```

Replace the placeholders. Verify `containerDeleteRetentionPolicy` in the
returned properties; inspecting only `deleteRetentionPolicy` checks blob
protection instead.
[Enablement and verification](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-enable)

## Recover and troubleshoot

After deleting only the disposable exercise container, open the account's
container list and enable **Show deleted containers**. Choose **Undelete** from
the deleted container's menu. Verify that the container and expected blobs are
available again before declaring the recovery successful.
[Portal recovery steps](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-enable#restore-a-soft-deleted-container)

Restoration uses the original container name. If another active container now
uses that name, the recovery is blocked. Investigate the replacement's data
before deciding how to resolve the collision; do not delete it merely to make
an exercise command work. Also check that the original retention window has
not expired.
[Name collision and retention limits](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview)

## Costs and cleanup

Retained container data is billed like active data. A retention change applies
to later deletions. Turning the feature off does not purge existing retained
containers. Use only a small exercise dataset, and account for retention when
checking cleanup and ongoing capacity charges.
[Billing and retention behavior](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview)

## Exam distinctions

The container is the recovery unit. A preserved blob version cannot by itself
replace container-level protection after the whole container is deleted.
Account deletion remains a different failure scope.

Practice: [data-protection questions](../../../questions/storage/data-protection.json).
