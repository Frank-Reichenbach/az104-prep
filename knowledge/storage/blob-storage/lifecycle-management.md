# Blob lifecycle management

- Topic ID: `storage.blobs.lifecycle`
- Objective: `st-16`
- Verified: 2026-10-01
- Status: documented; commands not executed in Azure

## Purpose and prerequisites

Use lifecycle management to apply time-based tiering or expiration rules to
blobs. The policy is attached to a storage account. Restrict it with filters
when only selected containers or paths should be affected.
[Lifecycle overview](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview)

The exercise below assumes standard general-purpose v2 storage, a
`study-records` container, and disposable block blobs. You need management-plane
permission to write the storage account's management policy, plus separate
data permissions if you inspect or upload blobs. Policy configuration and blob
data access use different resource operations.
[Configuration guide](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-configure)

## Policy example

[policy.json](../../../examples/storage/lifecycle/policy.json) transitions current
block blobs under `study-records/reports/` to cool after more than 45 days since
modification. It intentionally does not delete data.

Its parts are:

- `baseBlob`: the current blob, rather than snapshots or old versions.
- `daysAfterModificationGreaterThan`: time since a write, not time since a read.
- `prefixMatch`: container name followed by the blob-name prefix.
- `blobTypes`: restricts the rule to block blobs.

Prefixes are case-sensitive. They do not accept wildcard syntax. Combining a
prefix filter with blob index tag conditions restricts the result to objects
meeting both filter types. [Policy structure](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure)

## Implementation

In the Portal, open the storage account's **Data management → Lifecycle
management** page. Add a filtered rule for current block blobs, choose a
last-modified condition, and set the prefix and cool-tier action.
[Portal configuration](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-configure)

From the repository root, after replacing the placeholders:

```sh
az storage account management-policy show \
  --account-name <existing-account> \
  --resource-group <existing-resource-group>

az storage account management-policy create \
  --account-name <existing-account> \
  --resource-group <existing-resource-group> \
  --policy @examples/storage/lifecycle/policy.json
```

Review any existing policy before applying the example. The service writes the
whole policy, not a partial update: preserve existing rules when editing an
account that already has a policy. Re-run the show command to inspect the
saved definition. [CLI and update semantics](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-configure)

## Verify and troubleshoot

Saving a rule is not evidence that every matching blob has already changed.
Policy changes can take up to 24 hours to take effect and start a run; completing
the work depends on the number of blobs and account workload. Inspect both the
saved rule and resulting blob tiers. [Execution behavior](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview#policy-execution)

If nothing changes, check the prefix including its container, the exact case,
the blob type, the time condition, and whether the rule is enabled. A read does
not reset the last-modified age. For access-based rules, enable access-time
tracking and choose the corresponding condition.
[Conditions and access tracking](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure)

## Constraints and cost considerations

A lifecycle rule cannot rehydrate archive data. Do not confuse cool-to-hot
automation with archive rehydration. Deleting through lifecycle also does not
bypass immutability or eliminate a soft-delete retention period.
[Lifecycle limitations](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview#known-issues-and-limitations)

For current-version deletion, old versions and snapshots require corresponding
cleanup rules. Without accounting for them, deletion of the current version
can be blocked. [Version and snapshot interaction](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure#delete-action-on-blobs-that-have-versions-and-snapshots)

Microsoft recommends choosing tiers based on measured access patterns and
total cost. The example's 45-day threshold is an exercise choice, not a universal
Microsoft retention recommendation.
[Tier recommendations](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-best-practices)

## Cleanup and exam distinctions

Disable the exercise rule when finished. Before removing an entire policy,
Microsoft recommends disabling it and waiting 24 hours; deleting an active
policy does not cancel an already running execution.
[Policy execution guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview#policy-execution)

Know the differences between a container filter and policy scope, reads and
modifications, scheduled evaluation and immediate change, and lifecycle
expiration versus retention protection.

Related: [containers](containers.md), [access tiers](access-tiers.md), and
[source questions](../../../questions/storage/blob-storage.json).
