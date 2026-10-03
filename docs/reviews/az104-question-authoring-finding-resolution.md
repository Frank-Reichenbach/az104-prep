# Question-authoring skill: finding resolution

Updated: 2026-10-03. Work branch: `docs/az104-question-authoring-skill`.
The user requested fixes for all findings in the
[functional review](az104-question-authoring-functional-review.md).
The historical review describes skill revision `1dd081c`; this document records
the subsequent corrections and their verification.

## Changes

| Finding | Revised workflow | Acceptance evidence |
| --- | --- | --- |
| F1: joint-action review | Separate individual solutions/assertions, jointly required components, and complete configurations/mappings/sequences. Check set sufficiency, component necessity, and alternative sets for joint actions. | C1 joint-action draft and logical enumeration; C2 individual assertions; C7 complete candidate answers |
| F2: batch style/difficulty | Plan the objective, decision, observed pattern, reasoning level, decisive facts, answer structure, and misconceptions. Review variety across the batch and honor requested focused formats. | C3 six-item plan below; C7 short foundation draft |
| F3: topic-label clues | Inspect the real shared topic title and renderer. Rewrite within the named service when the requested decision is preserved, otherwise identify separate context work. Never invent an ignored field or rename a shared topic locally. | C4 manual context review using the existing title and renderer |
| F4: variant construction | Record the invariant principle/decision and variable facts. Change a decisive fact, derive the new key, and review all choices and rationales independently. | C5 two age-condition drafts with different keys and stable family/option IDs |

The workflow also maps each option rationale to supporting sources in working
notes, including claims about when a distractor could work. These notes and
the batch plan are authoring/review aids, not new fields in scored JSON.

The revised skill is `.agents/skills/az104-question-authoring/SKILL.md`.
Seven reusable cases are in its `references/acceptance-cases.md` file and are
linked directly from the skill. The style guide remains the evidence reference.

## Batch-planning exercise (C3)

All six planned items use objective `st-16` and topic
`storage.blobs.lifecycle`. Counts are the fixture's requested one foundation,
three applied, and two troubleshooting items; they are not exam proportions.
Each row has one distinct administrative decision.

| Item | Pattern and difficulty | Decision and decisive facts | Answer structure and misconceptions |
| --- | --- | --- | --- |
| 1 | Direct distinction; foundation | Identify the timestamp used by a named modification-age condition | One complete timestamp choice; confuse blob modification with read/container/account times |
| 2 | Constrained configuration; applied | Scope a prefix to a given container/path with exact case | One complete prefix; omit container, change case, or broaden scope |
| 3 | Numeric interpretation; applied | Determine age-condition eligibility from a threshold and modification age | One outcome-and-reason choice; confuse clocks, thresholds, or eligibility with execution |
| 4 | Administrative next step; applied | Add a rule while retaining existing required rules in an API-backed policy update | One complete workflow; assume implicit partial merging or replace required rules |
| 5 | Configuration diagnosis; troubleshooting | Explain mismatch between a case-sensitive configured prefix and actual blob names | One supported cause; confuse case, wildcard matching, or container scope |
| 6 | Diagnostic judgment; troubleshooting | Investigate absent tier changes shortly after an update using time and eligibility evidence | Individual select-two assertions; assume immediate completion or ignore filters |

Items 1 and 3 assess different decisions despite related time concepts. A pair
of variants for item 3 keeps its eligibility decision and principle invariant;
it does not turn every lifecycle question into one family.

API-backed policy updates require a full policy, so item 4 can use retained
rules as a meaningful constraint.
[Policy configuration](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-configure).
Policy-change activation and execution are asynchronous, so item 6 must
distinguish investigation evidence from a completion guarantee.
[Policy execution](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview).
These two sources were checked on 2026-10-03; the prefix and time-condition
sources were checked during the earlier same-day review. This is a plan,
not six finalized or scored bank questions.

## Acceptance-case results

The authoring agent manually applied the revised workflow. Six original drafts
were saved temporarily in `/private/tmp/az104-skill-revision-trial-drafts.json`:
a joint-action item, independent assertions, two age variants, a short timestamp
item, and a prefix item. The trial script is temporary as well; the case prompts
and expected behavior remain in the repository for future evaluations.

| Case | Observed result |
| --- | --- |
| C1: joint actions | Draft explains each required component's contribution without calling it sufficient alone. A logical model found zero sufficient individual options and exactly one sufficient pair among six pairs. |
| C2: individual assertions | Draft keys two independently true prefix-filter assertions rather than treating them as a jointly sufficient deployment procedure. |
| C3: batch planning | The six-item plan includes the requested reasoning levels, configuration/numeric interpretation, diagnosis, next-step choice, answer structures, and distinct misconception sets. |
| C4: topic clue | The existing title supplies the proposed feature answer. A review should flag context work when preserving explicit feature selection; a within-service rewrite is appropriate only when it preserves the requested decision. No display field or topic rename was introduced. |
| C5: variants | Modification ages of 60 and 20 days against a 45-day condition produce different keys in the same family. Unique question IDs and stable option IDs were verified; every explanation was reviewed for the changed fact. |
| C6: wrong key | The exact prefix remains the source-supported answer. A deliberately wrong container-less key also passes schema validation, demonstrating why the semantic review must reject it separately. |
| C7: short foundation | The timestamp draft remains short and foundation-level, with one keyed complete candidate and an explanation for every option. |

All six temporary drafts passed the real `validateQuestion` schema validator.
The pair enumeration and variant-ID/key checks passed. These are author-led
drafting/review exercises, schema checks, and a stated-scenario logical model;
they are not independent model-driven evaluations or an Azure lab. They show
that the corrected procedures can be applied to the targeted cases, not a
measured guarantee of quality across all future questions or domains.

The skill-creator validator passed. Metadata and every local reference path
were checked separately. Repository build/check, all 13 Node tests, static-site
link validation, and diff whitespace checks passed. A Git audit confirmed the
existing bank, generated content, app, knowledge files, exam metadata, style
guide, and preserved research inventory were unchanged. The fixes and records
are local on the work branch; no push, merge, or deployment was performed.
