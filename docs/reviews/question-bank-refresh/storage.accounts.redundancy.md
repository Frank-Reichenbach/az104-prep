# Storage redundancy and failover planning review

Topic: `storage.accounts.redundancy`; objective: `st-07`.
Verified: 2026-10-03. Source: questions/storage/storage-accounts-redundancy.json.
The rendered topic does not disclose a redundancy SKU or diagnostic cause.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| st-redundancy-zones-only | Keep, revision 1 | Applied residency/resilience comparison | Four genuine redundancy choices; only ZRS satisfies both constraints. Key `zrs`. |
| st-redundancy-secondary-read | Keep, revision 1 | Applied combined requirement | RA-GZRS uniquely combines zonal primary resilience and pre-failover secondary reads. Key `ragzrs`. |
| st-redundancy-stale-secondary | Revise, revision 2 | Troubleshooting contrasting endpoint reads | Replace automatic archive fiction and a non-diagnostic synchronous assertion with access/signing diagnoses; add older-blob and valid-SAS evidence. Key `async`. |

## Evidence and complete-choice review

The [redundancy comparison](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy)
supports every retained choice: LRS lacks the required zone isolation, ZRS
stays in-region, GRS/GZRS add a second region, GZRS lacks ordinary secondary
reads before failover, and RA-GRS lacks the requested primary ZRS placement.
Both questions explicitly require supported configurations and the secondary
read item targets Blob, not Azure Files.

The [geo-redundant application guide](https://learn.microsoft.com/en-us/azure/storage/common/geo-redundant-design)
documents lag and secondary 404 responses for recent writes, supporting the
diagnostic key. It also establishes that the secondary is read-only and primary
writes replicate without a second upload. The redundancy comparison establishes
RA-enabled pre-failover reads and common account keys across both endpoints.
Successful older-blob reads with the same SAS disqualify disabled access and a
separate regional signing requirement. The
[disaster-recovery guide](https://learn.microsoft.com/en-us/azure/storage/common/storage-disaster-recovery-guidance)
distinguishes normal replication/read access from a failover operation.

Only one complete choice meets each question's facts. There are no joint sets
or variants. The batch retains two distinct constrained comparisons and repairs
one observed-failure diagnosis. IDs, option IDs, families, and counts remain.
Build/check, 13 tests, site links, review hashes, and whitespace checks validate
the checkpoint. Review is author-led; no failover or Azure lab was performed.
