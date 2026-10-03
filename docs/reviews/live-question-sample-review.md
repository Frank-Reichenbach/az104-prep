# Review of three live practice questions

Reviewed: 2026-10-03, using the revised `az104-question-authoring` skill.
Live data: [deployed question bank](https://frank-reichenbach.github.io/az104-prep/data.json).

The live bank was downloaded and contained 322 questions. The three selected
records matched their local source records exactly, including options, keys,
explanations, revision, and verification metadata. The deployed renderer uses
the shared topic title. Each selected family has only this one member.

Selection was deliberate: one storage, one identity, and one networking item
with different administrative decisions. This is a small convenience sample,
not a random or representative audit of the whole bank. No questions were
edited, imported, or published during this review.

## Recommendation

Review the whole bank and make targeted edits. This sample supports retaining
sound questions and repairing weak alternatives and explanations. It does not
justify rewriting every question, and it does not establish that all remaining
questions can be left untouched.

All three intended keys are supported by the Microsoft sources checked below.
One sampled item is usable as written; two need distractor improvements before
they meet the revised style standard. The existing question structure and
learning objectives remain useful. The observed two-of-three result must not
be extrapolated into a rewrite percentage for the other 319 questions.

## 1. Storage: st-life-003

Source: [blob-storage.json](../../questions/storage/blob-storage.json).
Topic label: Storage → Blob lifecycle management.
Objective: `st-16`. Family: `st-life-write-versus-read`. Difficulty: applied.

**Current question:** An enabled rule tiers a current block blob to cool when
`daysAfterModificationGreaterThan` is 45. The blob was last modified 60 days ago
and read yesterday; every filter matches and tiering is supported. Does the
read make the blob ineligible under this condition?

**Key:** `no` — eligibility uses last modification rather than last read.
The configured condition uses the current blob's modification age; access-time
conditions are separate. The key also correctly avoids guaranteeing that
eligible data has already changed tier.
[Lifecycle conditions](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure).
Evidence checked 2026-10-03; the live record's verification date remains 2026-10-01.

| Option ID | Current choice, abbreviated | Skill review |
| --- | --- | --- |
| no | No; use modification rather than read time | Correct, matches the exact configured condition; rationale teaches the clock distinction |
| yes | Yes; every read resets last-modified | Related misconception: confuse reading/access with modification; useful distractor |
| creation | Yes; the condition always uses container creation | Related to time/object scope, but “always” and the explicit modification field make it too easy; prefer a credible alternative clock/condition confusion |
| disabled | Yes; reading disables the container's lifecycle rules | Implausible side effect rather than a useful adjacent mechanism; replace |

The question is self-contained and the label does not reveal which timestamp
wins. The numeric/configuration interpretation fits applied reasoning. Its
weakness is the yes/no wrapper padded with increasingly implausible reasons.

**Disposition: targeted revision.** Retain the objective, meaningful dates,
configured condition, and supported key. Ask for an eligibility interpretation
and use comparable outcome-and-reason alternatives built around actual
lifecycle concepts. Recheck uniqueness after replacing choices. A changed
technical explanation/meaning requires the normal revision increment.

## 2. Identity: id-effective-additive

Source: [identity-rbac-effective-access.json](../../questions/identity/identity-rbac-effective-access.json).
Topic label: Identity → Effective access and RBAC troubleshooting.
Objective: `id-08`. Family: `id-effective-additive`. Difficulty: applied.

**Current question:** A user has Contributor at subscription scope and Reader
on a resource group inside that subscription. No deny, condition, policy, or
lock blocks the operation. Can the user manage resources in that group?

**Key:** `yes` — the inherited Contributor grant remains effective.
Azure RBAC combines grants; a narrower Reader grant does not subtract the
inherited permissions. Microsoft's overview uses this same role/scope
relationship to explain additive permissions.
[RBAC evaluation](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview).
Evidence checked 2026-10-03; the live record's verification date remains 2026-10-02.

| Option ID | Current choice, abbreviated | Skill review |
| --- | --- | --- |
| yes | Yes, through inherited Contributor | Correct; concise rationale identifies why child Reader does not reduce access |
| reader | No; the most specific Reader grant replaces Contributor | Plausible scope-precedence misconception; related and wrong under this scenario |
| recent | Only if Contributor was assigned more recently | Related assignment-order misconception; not the documented rule for combining active grants |
| owner | Only if Owner is assigned on every resource | Related role/scope misconception; confuses management permissions and inherited scope |

The context, alternatives, and rationales test one coherent access decision.
The label identifies the area without revealing the additive answer. Interpreting
two role/scope assignments is appropriate applied practice.

**Disposition: keep.** Optional precision: name a concrete resource-management
operation, such as resizing a VM, instead of the broad “manage resources.” This
would emphasize that Contributor does not permit every administrative action,
including granting Azure RBAC roles.
[Contributor permissions](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/privileged#contributor).
That optional clarification does not require reconstructing an otherwise useful
question or replacing all its distractors.

## 3. Networking: nw-nsg-state

Source: [networking-security-nsg-asg.json](../../questions/networking/networking-security-nsg-asg.json).
Topic label: Networking → Network and application security groups.
Objective: `nw-06`. Family: `nw-nsg-state`. Difficulty: troubleshooting.

**Current question:** An SSH session survives removal of its NSG allow rule,
but a new SSH connection is denied. What explains the difference?

**Key:** `c` — existing flows retain state; new connections use the changed
rules. Microsoft explicitly documents this established-versus-new SSH
behavior after rule removal.
[NSG connection state](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview).
Evidence checked 2026-10-03; the live record's verification date remains 2026-10-02.

| Option ID | Current choice, abbreviated | Skill review |
| --- | --- | --- |
| a | NSGs filter only UDP | Too broad and easily eliminated; does not credibly explain the two observed outcomes |
| b | Removing a rule requires deleting the NIC | Implausible operational requirement; not a useful explanation of preserved versus denied connections |
| c | Existing flows retain state; new flows use changed rules | Correct, but disproportionately detailed compared with the other choices |
| d | SSH bypasses NSGs after one login | Application-login/firewall confusion is adjacent, but the claimed automatic bypass is too fanciful and does not fit the failed new connection |

The symptom-based stem is a sound troubleshooting scenario. It is short,
self-contained, and its topic label does not reveal connection-state behavior.
However, the correct explanation adds only “This explains the different
outcomes,” which repeats the conclusion without teaching the mechanism.

**Disposition: targeted revision.** Keep the scenario and key. Replace the
three weak alternatives with comparable, believable explanations of existing
and new connection handling. Draw misconceptions from actual rule evaluation,
scope, state, or change behavior, and make every proposed explanation wrong
under this exact scenario. Expand the correct rationale to connect the tracked
existing flow with evaluation of a new flow. Review all choices again; merely
making incorrect statements more technical would not establish their quality.

## Scope of the conclusion

This review supports a practical maintenance strategy: keep accepted items,
improve weak distractors/rationales, clarify underspecified actions where
needed, and reserve full rewrites for items whose objective, scenario, key,
or answer set cannot be repaired cleanly. It is not a full-bank acceptance.

All sampled items are single-answer and have no family variants. This sample
therefore says nothing conclusive about the bank's multiple-answer logic,
variant quality, all-domain difficulty balance, or complete pattern coverage.
Further review should examine those separately. The skill's batch guidance is
not a reason to inflate every concise question into a long case study.
