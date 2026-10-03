# Blob lifecycle management review

Topic: `storage.blobs.lifecycle`; objective: `st-16`.
Technical review: 2026-10-03. Source: questions/storage/blob-storage.json.
Displayed context: Storage → Blob lifecycle management. It identifies the
service/task without revealing a particular prefix, timestamp, or operation.

## Decisions and defects

| Question | Result | Pattern / reasoning | Repair or acceptance |
| --- | --- | --- | --- |
| st-life-001 | Keep revision 1 | Applied configuration completion: build an exact container/path prefix | Four comparable prefix values; missing container, wildcard, and overly broad scope are relevant misconceptions. Unique full-prefix key. |
| st-life-001b | Revise to 2 | Troubleshooting: interpret a nonmatching filter | Removed anonymous-access distractor and long correct-option clue. All choices now describe plausible prefix interpretation mistakes. |
| st-life-002 | Revise to 2 | Foundation: recognize a supported archive recovery operation | Replaced padded yes/no framing with four nearby tier/access actions. Preserved the archive-versus-lifecycle limitation; direct Set Blob Tier is the offered supported operation. |
| st-life-003 | Revise to 2 | Applied numeric interpretation: distinguish timestamps and compare 60 > 45 | Replaced container creation and policy-disable fictions with last-access, last-tier-change, and threshold-comparison errors. Explicitly separates eligibility from execution. |
| st-life-004 | Revise to 2 | Applied configuration selection: preserve three required enabled rules | Removed container-metadata and second-policy distractors. Compare full/partial rule collections and enabled states under the same API workflow. |
| st-life-005 | Revise to 2 | Troubleshooting: interpret ten minutes without a transition | Clarified selection of two independent true assertions. Replaced anonymous access with synchronous-read confusion and distinguished start from completion. |

The batch covers prefix construction, filter diagnosis, archive recovery,
timestamp eligibility, whole-policy updates, and asynchronous execution.
The shared prefix family has a construction item and a faulty-filter variant;
their decisive inputs differ, and each key was reviewed independently. Existing
question, option, family, and objective IDs are preserved. Changed content has
a revision increment; all six verification dates are October 3.

## Microsoft evidence and rationale mapping

Read the following primary pages on the verification date. Links map the
correct and incorrect rationale claims; they are not an answer-bank import.

- [Policy structure](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure),
  Prefix match filter: every option in st-life-001 and st-life-001b. Prefixes
  start at the container, match the beginning, and treat wildcard characters
  literally. The too-broad choice fails the requested reports path.
- [Policy structure](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure),
  Actions and Action run conditions: st-life-002/access and every option in
  st-life-003. Cool-to-hot access promotion is distinct from archive recovery;
  modification, access, tier-change timestamps and greater-than comparisons
  must not be substituted for the configured condition.
- [Archive recovery](https://learn.microsoft.com/en-us/azure/storage/blobs/archive-rehydrate-overview),
  Change a blob's access tier: st-life-002/separate and filter. Set Blob Tier
  initiates an online transition; archived content is unavailable until
  recovery completes. No completion-time guarantee is scored.
- [Access tiers](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview),
  Setting or changing a blob's access tier: st-life-002/age. An account-default
  change does not replace an explicit blob tier.
- [Configuration guide](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-configure),
  full-policy update note: all st-life-004 alternatives. The selected rule
  collection includes every required enabled rule. Other offered collections
  remove or disable required behavior; there is no implicit partial merge.
- [Lifecycle overview](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview),
  Policy execution: st-life-003/no and st-life-005/delay, inspect, guarantee.
  The 24-hour statement concerns activation/start; workload affects completion.
  Policy structure supplies the matching conditions for inspect, and contrasts
  the access-promotion behavior used in st-life-005/public's explanation.

## Acceptance and verification

Five single-answer items have one offered qualifying answer. st-life-005 is
two independent assertions, not two jointly required implementation steps:
delay and inspect qualify; completion guarantee and synchronous-read claims
do not. No alternative offered pair qualifies. No unresolved documentation
conflict is used in a scored answer. These are author-led reviews, not Azure
labs or an independent model evaluation.

Repository build/check, all 13 Node tests, static-site link validation, and
the hash-based review-ledger check validate this checkpoint. A deliberate
stale-hash fixture also confirms that changed completed reviews are rejected.
Those checks establish consistency and app behavior, not service correctness.
