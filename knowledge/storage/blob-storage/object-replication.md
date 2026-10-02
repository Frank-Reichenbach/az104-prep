# Blob object replication

Topic ID: storage.blobs.object-replication  
Objectives: st-08  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Object replication asynchronously copies block blobs between selected
containers in separate accounts. Use it for distribution or another account's
copy, rather than treating it as account-level GRS or an immediately consistent
mirror. Start with a small dataset to measure storage, transaction, change-feed,
and transfer charges.
[Replication behavior and costs](https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-overview).

## Prerequisites and implementation

Use supported general-purpose v2 or premium block blob accounts and existing
source/destination containers. Check feature compatibility before using
hierarchical namespace, NFS, or SFTP.

Enable versioning on **both** accounts and change feed on the **source**.
Change feed records the source changes used by replication.
[Change feed](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-change-feed).

An administrator needs permissions to write object replication policies on the
accounts and blob service configuration permission to enable prerequisites.

1. Open the source account's **Object replication** page and create a rule.
2. Select the destination account and container, then the source container.
3. Set a prefix filter if only part of the namespace should be copied.
4. Explicitly select the copy scope: new objects, all objects, or a custom
   creation-time boundary. Defaults do not backfill all historical blobs.
5. Save and inspect the paired policy/rule configuration. The portal can
   configure both ends when you have access; cross-administrator workflows
   exchange policy JSON between destination and source.
[Configuration procedure](https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-configure).

## Verify and troubleshoot

Upload a small matching block blob after policy creation. Inspect its
replication status for the policy/rule, wait for completion, and compare the
destination content. Repeat with a nonmatching prefix to verify filtering.
An existing blob missing from the destination may be outside the chosen copy
scope, rather than evidence of failed networking.

The destination container cannot accept ordinary writes while the applicable
replication policy is in place. Replication does not provide a two-way
application write path. It also does not promise an identical version ID at
the destination.
[Object replication semantics](https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-overview).

Keep cross-tenant replication disabled unless an approved design needs it.
Check both accounts' tenant restrictions when a cross-tenant policy fails.
[Cross-tenant controls](https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-prevent-cross-tenant).

For cleanup, remove the exercise policies from both accounts, verify the
remaining dependencies, and then remove disposable destination data/versions.
Deleting a policy does not mean accumulated copies and version charges vanished.
See [versioning](versioning.md) and [redundancy](../accounts/redundancy.md)
for the separate protection mechanisms.

[Question data](../../../questions/storage/storage-blobs-object-replication.json).
