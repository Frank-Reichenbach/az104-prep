# Functional review: AZ-104 question-authoring skill

Reviewed: 2026-10-03. Skill revision: commit `1dd081c`.
Scope: functionality and fit for writing questions in the researched style.
The skill entrypoint is `.agents/skills/az104-question-authoring/SKILL.md`.
Line references below describe that revision.

## Assessment

Keep the skill. Its purpose is a repeatable authoring/review workflow, while
the [style guide](../az-104-question-style.md) maintains the researched advice.
That separation fits this project. The skill already supports self-contained
administrative decisions, related distractors, option explanations, source
verification, and the repository's question format.

One important logical ambiguity and three workflow gaps need attention before
relying on it for consistent batches. These are instruction-level findings,
not measured model failure rates. The original skill and bank were left intact
so the reviewed revision remains available for comparison.

## Method and limits

- Compared the entire skill with the style guide, question format, research
  conventions, project instructions, and original requirement for reviewed
  question variants.
- Inspected the validator and the actual question/topic rendering in the app.
- Walked through 12 authoring/review cases, including ambiguous keys, jointly
  required actions, unsupported formats, label clues, and variants.
- Wrote one original prefix-filter draft in memory and checked it with the
  real schema validator. A deliberately incorrect key also passed, confirming
  that schema validation cannot establish the answer's technical correctness.
- Enumerated all six two-option combinations in a small logical model of the
  joint-action example below. This checks the stated scenario's logic, not Azure.

Microsoft service sources used for the examples were checked on October 3,
2026. No Azure lab or independent model-driven evaluation was run. Two public
training assessment links returned retrieval errors during this review; their
style patterns were assessed through the existing researched guide. The
preserved research inventory was not opened, mapped, adapted, or imported.

Microsoft describes its Practice Assessments as examples of wording, style,
and difficulty, with limits on how they represent the full exam. Consequently,
the acceptance target is original practice matching the documented public
patterns, not a claimed reconstruction of the live exam.
[Microsoft Practice Assessments](https://learn.microsoft.com/en-us/credentials/certifications/practice-assessments-for-microsoft-certifications).

## Findings

### F1 — High: the answer review conflates components with complete solutions

Location: `SKILL.md:83–88`, read alongside `SKILL.md:60–61`.

The drafting step correctly distinguishes jointly required actions from
independently sufficient choices. The review step then says to evaluate each
option against every requirement and requires exactly `select` qualifying
options. It does not carry that distinction into its acceptance procedure.

For a question asking for two actions that together meet the goal, neither
action necessarily meets all requirements alone. An agent following the
per-option wording literally could reject a valid answer set, rewrite it into
two complete solutions, or attach misleading explanations to its components.
The selection count does not resolve this ambiguity.

**Concrete walkthrough.** A web VM already has subnet and NIC NSGs. Each has
a matching inbound TCP 443 deny rule at priority 200. No other controls block
the connection; no earlier matching rules exist. Retain both NSGs and the deny
rules. Which two additions together permit new matching connections?

| Option ID | Addition |
| --- | --- |
| subnet-100 | Matching allow rule at priority 100 in the subnet NSG |
| nic-100 | Matching allow rule at priority 100 in the NIC NSG |
| subnet-300 | Matching allow rule at priority 300 in the subnet NSG |
| nic-300 | Matching allow rule at priority 300 in the NIC NSG |

The intended set is `subnet-100` plus `nic-100`. Neither member alone suffices;
the priority-300 choices cannot override the priority-200 denies. Both NSGs
must permit the traffic, and smaller priority numbers are processed first.
[NSG traffic processing](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-group-how-it-works),
[NSG rule priorities](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview).

The logical enumeration confirmed zero sufficient individual choices and
exactly one sufficient pair among the six possible pairs. This is a valid
joint-action structure that the current review instruction handles ambiguously.

**Recommended change.** Branch explicitly during review:

- For independent solutions, verify each selected option meets the complete
  goal by itself and each distractor fails it.
- For jointly required actions, verify the selected set meets the goal, each
  selected component is required under the question's wording, and no other
  offered set of the declared size also satisfies the requirements. Explain
  what each component contributes; do not call it independently sufficient.

Use the same distinction for complete configurations, ordered sequences, and
mapping choices: each option there is a complete candidate solution.

### F2 — Medium: style and difficulty are not planned or checked across a batch

Location: `SKILL.md:36–38`, `SKILL.md:54–56`, `SKILL.md:90–102`.

The skill selects an objective and an administrative decision, then provides a
general stem sequence. It does not require choosing an observed question
pattern, defining the reasoning expected at the selected difficulty, or
checking repetition across a requested batch.

The guide contains short distinctions, constrained administrative tasks,
numeric/configuration interpretation, diagnostic choices, feature comparisons,
and code completion. Those patterns are referenced, but they do not become
explicit planning or review outputs. The guide also cautions against letting
definitions dominate applied practice. This is an operational gap, not a
contradiction of that guidance.

An agent could produce a series of very similar “Which action should you take?”
items or label simple recall as applied merely by adding a business story.
An individual-item checklist would not make the repetition or weak difficulty
classification visible in a review report.

**Recommended change.** Before drafting a batch, create a short working plan:
objective, administrative decision, style pattern, difficulty, decisive fact,
answer structure, and distractor misconceptions. Check that the batch explores
distinct decisions and uses suitable patterns where the topic supports them.
Define foundation as direct distinction, applied as interpreting requirements
to choose a configuration/action, and troubleshooting as diagnosing observed
behavior from relevant evidence. Do not invent official difficulty proportions
or force every pattern into every topic. The plan is review metadata, not a
new field in scored JSON.

### F3 — Medium: detecting a topic-label clue has no completion path

Location: `SKILL.md:57–59`, with `app/main.mjs:27–30` and `:51–52`.

The skill says to check the visible topic label for answer leakage. The app
derives that label from the shared topic title; it does not consume a
per-question context override. Changing the prompt alone cannot change the
displayed label.

For example, a feature-selection question whose intended answer is Private
Endpoint would be compromised under the existing title “Private endpoints,
approval, and DNS.” The current bank's first question in that topic instead
asks about behavior after an endpoint already exists, which avoids this
particular clue. The example is a prospective authoring failure, not a finding
that all existing questions in the topic are defective.

The skill gives no rule for resolving this during an authoring task. An agent
could leave the clue in place, invent a JSON field the app ignores, or propose
a shared-topic rename without accounting for its other questions.

**Recommended change.** When the label reveals the feature being selected,
prefer a decision within the named service: configuration, outcome, diagnosis,
or next step. Otherwise flag that the desired service-selection item needs
separate context/metadata work. Do not invent an unsupported display field or
rename a shared topic as a local question edit. Review the actual rendered
label and stem together.

### F4 — Medium: variants are reviewed, but their construction is underspecified

Location: `SKILL.md:23–24`, `SKILL.md:87–88`, `SKILL.md:103–107`.

The skill requires independent review and stable family IDs, which protects
correctness. It does not explain how to create useful variants that satisfy
the user's request for answers that can vary. Reading existing variants helps,
but is not a repeatable construction procedure.

Cosmetic resource renaming can preserve an identical decision and answer.
Changing too much can instead produce a different concept incorrectly grouped
into the same family. Simply changing the correct ID without updating the
scenario and all explanations creates a defective key. The skill does not
give a specific variation plan to distinguish these cases.

**Recommended change.** When variants are requested, record the invariant
learning principle and the permitted variable facts. Change a fact that matters
to the decision, derive the new key from the sources, and recheck every option
and rationale. For example, a lifecycle-age interpretation can use ages on
opposite sides of the same condition; the eligibility conclusion then changes
while the principle remains the same. This uses the documented time-condition
semantics, not a guarantee of immediate policy execution.
[Lifecycle conditions](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure).

Keep one family when the underlying assessed principle remains the same. Use
a new family for a different principle, as the question-format guide requires.
Do not force every variant to have a different key; require answer changes
when requested or when the changed facts warrant them. Do not confuse shuffled
visible letters with substantive variation.

## What the skill already handles well

| Requirement | Evidence in the skill | Assessment |
| --- | --- | --- |
| Standalone scenario context | Lines 54–59 | Explicit environment/state/goal/constraints and no dependency on another item |
| Short foundation items | Lines 55–56 | Preserves direct questions instead of requiring a long scenario everywhere |
| Recommendation versus requirement | Lines 39–46 | Prevents “recommended” from substituting for a service constraint |
| Plausible distractors | Lines 62–67 | Requires a related misconception and scenario-specific disqualification |
| Explanation of every choice | Lines 68–71 | Includes why a wrong option fails and when it could be appropriate |
| Ambiguous or unsupported claims | Lines 47–50, 83–93 | Requires resolving uncertainty before scoring it |
| Format adaptations | Lines 76–79 and the referenced guide | Preserves the decision; rejects bogus padding of binary items |
| Bank/schema integration | Lines 103–113 and question-format reference | Stable IDs, revisions, generated output, and practice scoring remain compatible |
| Limits of official-style claims | Lines 111–113 and the referenced guide | Does not promise exact live-exam format, navigation, or scores |

The explanations step could be made easier to audit by recording which source
supports each option's rationale in working notes, especially counterfactual
claims about when a wrong choice would work. This is an improvement to evidence
traceability, not a separate demonstrated failure of the current workflow.

## Original authoring smoke exercise

This draft was created only for the review and validated in memory. It is not
a bank entry, inventory adaptation, or additional coverage claim.

**Context:** Blob lifecycle management. **Select:** one answer.

A Blob lifecycle rule must target only block blobs whose names start with
`Exports/` in the `audit-data` container. Which `prefixMatch` value scopes the
rule correctly?

| Option ID | Choice | Explanation |
| --- | --- | --- |
| exact | audit-data/Exports/ | Correct: includes the container and exact blob prefix |
| missing-container | Exports/ | Wrong: omits the container |
| wrong-case | audit-data/exports/ | Wrong: changes the case of the requested prefix |
| broad | audit-data/ | Wrong: also targets other paths in the container |

Key: `exact`. Prefixes include the container, are case-sensitive, and constrain
the matched blob names. Evidence checked 2026-10-03.
[Lifecycle prefix filters](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure).

The draft passed `validateQuestion` with the existing lifecycle topic,
objective, knowledge path, sources, and date fields. Changing its key to
`missing-container` also passed. The skill's semantic source review therefore
remains essential; a green build is not an answer-key review. The draft
demonstrates a workable constrained-configuration pattern, not that the skill
has been proven across all question patterns or domains.

## Twelve-case instruction walkthrough

“Covered” means there is explicit or directly referenced guidance. “Gap” means
the expected behavior is not sufficiently operationalized. These are manual
walkthroughs, not twelve executed model evaluations.

| Case | Expected behavior | Current coverage |
| --- | --- | --- |
| Short foundation distinction | Keep only facts needed for the distinction | Covered: lines 55–56 and guide |
| Applied prefix-filter decision | Scope choices to the exact container/path and explain all options | Covered; original draft also schema-checked |
| Troubleshooting rule priorities | Include configuration and observed/new-flow state needed to derive the outcome | Covered by context requirements and guide's numeric rules |
| Two independent valid solutions | Each keyed option must satisfy the goal by itself | Covered by whole-answer review |
| Two jointly required actions | Review the complete set and necessity of its components | Gap: F1; logical example enumerated |
| Least-cost item with missing access requirements | Specify decisive requirements or leave the item unscored | Covered: lines 43–50 |
| Two offered choices both satisfy a single-answer goal | Flag ambiguity and clarify the scenario or choices | Covered: lines 83–88 |
| Binary proposal with only one genuine distractor | Do not pad it into four bogus options | Covered: lines 76–79 |
| Feature-selection item under an answer-bearing label | Resolve the clue using supported authoring/context behavior | Gap: F3 |
| Batch dominated by near-identical recall items | Review variety and reasoning level across the batch | Gap: F2; guide advice exists but no batch procedure |
| Variants with changed decisive facts | Preserve the assessed principle and derive each key afresh | Partial: independent review exists; construction gap F4 |
| Plausible question with a deliberately wrong key | Reject based on sources, even when schema validation passes | Covered by lines 83–93; schema acceptance demonstrated |

## Proposed revision and acceptance criteria

Make four focused changes to the workflow: branch the answer-set review,
introduce a small batch plan, define label-clue handling, and add a variant
construction step. Keep the research/style evidence in the existing guide.

Then assess generated drafts against reusable fixtures rather than repeating
only metadata checks. At minimum, include the joint-action case, a
label-compromised feature choice, variants whose decisive fact changes the key,
a short foundation item, and a numeric/configuration interpretation item.
For each output, review context, reasoning level, uniqueness of the answer set,
misconception behind every distractor, source support, and explanation quality.

A later behavioral evaluation should retain input, generated draft, reviewed
key, source/date evidence, and observed outcome. An independent review would
improve confidence, but this report does not claim one was performed. Do not
infer official exam frequencies from the public training corpus or introduce
new native question interactions to fix an authoring workflow.
