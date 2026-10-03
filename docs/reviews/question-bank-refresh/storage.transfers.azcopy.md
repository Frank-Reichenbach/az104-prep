# AzCopy transfers and synchronization review

Topic: `storage.transfers.azcopy`; objective: `st-10`.
Verified: 2026-10-03. Source: questions/storage/storage-transfers-azcopy.json.
The displayed module does not supply direction, deletion behavior, or recovery.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| st-azcopy-one-way | Revise, revision 2 | Applied final-state interpretation | Replace padded yes/no answers with four endpoint states; explicitly fix direction/deletion and label the configuration reasoning applied. Key `no`. |
| st-azcopy-delete-destination | Keep, revision 1 | Applied documented recommendation | Copy with ifSourceNewer meets the recommendation; every other offered action deletes preserved objects or reverses the upload. Key `copy`. |
| st-azcopy-resume | Revise, revision 2 | Troubleshooting complete recovery procedures | State original-plan/no-reenumeration requirements and compare valid resume, missing authorization, new enumeration, and plan cleanup. Key `resume`. |

## Rationale evidence

The [Blob synchronization guide](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-blobs-synchronize)
defines one-way direction, destination deletion flags, and the recommendation
to consider copy with `--overwrite=ifSourceNewer` when deletion is unnecessary.
These support every endpoint-state choice and the retained recommendation.
The latter is explicitly Microsoft's suggestion, not a claim that no other
AzCopy operation can preserve destination data. The local-to-Blob scenario
avoids the guide's conflicting introductory wording about supported endpoint
pairs; no unrelated sync-pair claim is scored.

The [job recovery guide](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-configure)
documents preserved transfer plans, resume by job ID with new SAS values, lack
of SAS persistence, and cleaning plan/log files. Cleaning removes the required
resume input; reusing a plan does not repair missing authorization. A new copy
is disqualified by the explicit requirement to avoid new enumeration, rather
than being called universally invalid.

## Acceptance

Every offered endpoint state or recovery procedure is evaluated as a complete
candidate. Only one qualifies per item. There are no joint sets or variants.
The batch now includes state interpretation, a constrained recommendation, and
observed-failure recovery. IDs, option IDs, families, and question count remain.
Build/check, 13 tests, site links, hashes, and whitespace checks validate this
author-led review. No AzCopy transfer or Azure lab was executed.
