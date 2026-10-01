# Blob versioning

- Topic ID: `storage.blobs.versioning`
- Objective: `st-17`
- Verified: 2026-10-01
- Status: documented; Azure steps not executed

## Purpose and supported scope

Versioning preserves earlier blob states after supported writes. Versions have
stable identifiers, and the current version is distinct from previous versions.
This topic uses block blobs in a general-purpose v2 account with hierarchical
namespace disabled. Accounts with hierarchical namespace do not currently
support blob versioning.
[Versioning behavior and support](https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview)

## Microsoft recommendations

Manage version growth with lifecycle policies. Microsoft recommends keeping
fewer than 1,000 versions per blob because large version counts can increase
listing latency. This is guidance, not a rule that the service automatically
enforces by deleting the oldest version.
[Version-management guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview)

Use [blob soft delete](blob-soft-delete.md) to recover deleted versions and
[container soft delete](container-soft-delete.md) for a deleted container. The
features address different failure scopes.
[Data-protection guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/data-protection-overview)

## Configure and inspect

Use management authorization for updating account Blob service properties and
data authorization for inspecting/restoring blob contents. In the Portal, open
**Data management → Data protection**, enable blob versioning under Tracking,
and save. If you choose automatic deletion of older versions there, inspect the
lifecycle rule the Portal adds.
[Versioning configuration](https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-enable)

CLI example:

```sh
az storage account blob-service-properties update \
  --resource-group <existing-resource-group> \
  --account-name <existing-account> \
  --enable-versioning true

az storage blob list \
  --account-name <existing-account> \
  --container-name <existing-container> \
  --include v \
  --auth-mode login
```

Replace placeholders. After a controlled overwrite of a disposable block blob,
inspect its versions in the Portal's **Versions** tab or in the CLI list. Confirm
that both the prior content and the new current content can be identified.
Enabling the feature cannot reconstruct content overwritten before protection
existed. [Configure and list versions](https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-enable)

## Recovery sequence

Deleting a versioned blob without specifying a version ID makes the current
version a previous version; it does not leave a current version. To recover the
current blob, copy the desired previous version to become a new current blob.
Do not try to edit a previous version in place.
[Version deletion and recovery](https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview)

If that previous version was itself soft-deleted, first undelete the retained
versions, then promote the desired version. Undelete alone does not select a
new current version.
[Version-aware recovery](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-manage)

## Costs, cleanup, and troubleshooting

Repeated writes can retain substantial historical data. Design cleanup for
previous versions, not only for the current blob. Review
[lifecycle conditions](lifecycle-management.md) before applying deletion rules.
Check for container deletion, expired soft-delete retention, and unsupported
hierarchical namespace when a planned recovery is unavailable.

For a study exercise, record existing protection settings before changing them.
Disabling versioning does not remove existing versions; inspect them and apply
an intentional cleanup policy for disposable data.
[Disabling versioning](https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview#enable-or-disable-blob-versioning)

Practice: [data-protection questions](../../../questions/storage/data-protection.json).
