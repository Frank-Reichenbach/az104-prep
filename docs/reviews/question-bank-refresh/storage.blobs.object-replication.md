# Blob object replication review

Topic: `storage.blobs.object-replication`; objective: `st-08`.
Verified: 2026-10-03. Source: questions/storage/storage-blobs-object-replication.json.
The displayed label gives service context without disclosing configurations.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| st-or-prerequisites | Revise, revision 2 | Applied joint prerequisites | State eligible accounts/blobs and missing prerequisites; replace impossible Archive defaults and per-blob policies with snapshot/change-feed alternatives. Keys `versions`, `feed`. |
| st-or-existing-scope | Revise, revision 2 | Troubleshooting new/old contrast | Replace matching keys, disabled LRS, and account-name-in-blob fiction with real prefix, prerequisite, and policy-ID checks; state decisive facts. Key `scope`. |
| st-or-destination-writes | Revise, revision 2 | Foundation documented write behavior | Test container-wide restriction against reverse replication, permission override, and prefix-scope confusion. Key `readonly`. |

## Rationale evidence

The [configuration guide](https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-configure)
supports versioning on both accounts, source change feed, default copy scope,
prefix filters, and paired policy setup. The
[change-feed guide](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-change-feed)
supports source change tracking; enabling it only on the destination does not
supply that input. The
[replication overview](https://learn.microsoft.com/en-us/azure/storage/blobs/object-replication-overview)
excludes snapshots, requires matching policy IDs, and blocks ordinary writes
to the destination container. Its source prefix selects copies, not permission
to write other destination names. Data authorization does not eliminate the
restriction, and a one-way rule supplies no reverse replication path.

The scenario fixes eligible accounts, online block blobs, and container
existence rather than treating those as unmentioned assumptions. For older
blobs, matching prefixes and enabled versioning eliminate alternate causes;
successful new copies disqualify a mismatched policy. Newly documented priority
replication and preview tag copying are supplementary and not added to scoring.

## Answer-set review

For prerequisites, removing `versions` leaves required versioning missing;
removing `feed` leaves source change tracking missing. Snapshots cannot replace
either, and destination-only change feed cannot replace the source feed. Of
the six possible pairs, only the keyed pair supplies both configurations. The
existing containers and eligible account/blob facts are already satisfied.

The other two items each have exactly one qualifying choice. Their alternatives
are reviewed against the observed copy results and the destination write rule,
respectively. No variants exist; IDs and families remain. The batch includes
joint configuration, observed-failure diagnosis, and a direct behavior
distinction. Build/check, 13 tests, site links, hashes, and whitespace checks
validate the checkpoint. Review is author-led; no Azure labs were executed.
