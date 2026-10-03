# Blob access tiers review

Topic: `storage.blobs.access-tiers`; objective: `st-13`.
Verified: 2026-10-03. Source: questions/storage/blob-storage.json.
The displayed Blob access tiers label supplies context without choosing a tier.

## Decisions and reasoning

| ID | Decision | Pattern / difficulty | Finding and final key |
| --- | --- | --- | --- |
| st-tier-001 | Revise, revision 2 | Applied constrained tier selection | Replace a padded cool/archive binary with four actual tiers. Immediate reads, lower capacity cost than hot, and 45-day deletion distinguish cool. Key `cool`. |
| st-tier-002 | Revise, revision 2 | Applied numeric interpretation | Replace automatic archiving fiction with related billing calculations. Explicit upload time anchors the 30-day minimum; 30 − 12 = 18. Key `billing`. |
| st-tier-003 | Keep, revision 1 | Applied configuration outcome | Four plausible inferred/explicit outcomes; existing blobs versus new uploads is addressed. Key `a`. |
| st-tier-004 | Revise, revision 2 | Troubleshooting failed tier request | Add the observed failure. Offer genuine tier restrictions, with account type, blob type, operation scope, and encryption stated. ZRS is the actual failing configuration. Key `unsupported`. |
| st-tier-005 | Revise, revision 2 | Applied independent cost recommendations | Add a known workload and retention plan. Replace daily cycling with initial/destination write-cost confusion and isolate capacity versus total cost. Keys `access-cost`, `upload`. |

## Rationale evidence

The [tier overview](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview)
supports every option in 001: online hot/cool/cold versus offline archive,
relative capacity costs, and GPv2 duration minima. Its prorated billing section
supports all four calculations in 002. Its account-default section supports
all four inferred versus explicit outcomes in 003. Its block-blob restriction,
premium-account limitation, archive redundancy table, encryption-scope
restriction, and account-default restriction support every diagnostic choice
in 004. These are hard constraints rather than recommendations.

For 005, [tier best practices](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-best-practices)
supports estimating the read pattern and migrating directly into the suitable
tier. The overview's billing section supports both wrong explanations: a met
duration minimum does not remove retrieval/transaction charges, and changing
to cool incurs a destination write. The recommendations are conditional on
the stated workload, not a claim that cool is universally cheapest.

The best-practices page's lifecycle timing shorthand is less precise than the
lifecycle overview's activation/execution distinctions. No scored timing claim
is derived from that shorthand. Smart tier stays supplementary to this batch.

## Acceptance and verification

Each single-answer option was checked against all stated requirements. In
005 the choices are independent recommendations: both keyed choices apply
individually; the two other claims omit or misstate real cost components.
There are no variants in this topic. The batch combines constrained selection,
calculation, configuration interpretation, diagnosis, and cost planning.
Stable IDs, option IDs, families, and objectives are preserved.

Build/check, 13 Node tests, static-site links, ledger hashes, and whitespace
checks validate the checkpoint. Source review is author-led; no Azure commands
were executed. Automated checks do not establish technical correctness.
