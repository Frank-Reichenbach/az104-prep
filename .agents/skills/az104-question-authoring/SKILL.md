---
name: az104-question-authoring
description: Authors and reviews original AZ-104 practice questions in this repository. Use when drafting or revising question stems, answer choices, explanations, or exam-style quality. Excludes administering quizzes and researching general Azure topics without a question-authoring task.
---

# AZ-104 question authoring

Apply the repository's researched style guidance through a repeatable authoring
and review workflow. Produce English, unofficial practice questions for a
learner with some hands-on Azure experience. This project-specific skill uses
the repository documents below; it is not a standalone Azure reference.

## Establish scope and load references

1. Locate the repository root containing `AGENTS.md`, `PLAN.md`, `STATUS.md`,
   and `exam/coverage.md`. Follow those instructions and the user's requested
   topic, quantity, and mode: draft, edit, or review. A review request produces
   findings; it does not itself authorize rewriting the bank.
2. Read [the question-style guide](../../../docs/az-104-question-style.md),
   [the question format](../../../docs/question-format.md), and
   [research conventions](../../../docs/research.md). The style guide owns
   evidence and style rules; this skill owns the sequence for applying them.
3. Load only the relevant topic/objective records, knowledge file, question
   file, and family variants. Avoid reading the entire bank or research corpus.
   All repository paths below are relative to that root.
4. Keep `docs/research/official-question-inventory.md` separate. Consult,
   map, or adapt its entries only when the user explicitly requests that later
   work. Invoking this skill alone does not authorize inventory reuse.

If required repository references are missing, report which files are needed
before producing scored bank entries. A requested change to quiz interaction,
hosting, or skill packaging is outside this authoring workflow.

## Plan the decision, pattern, and difficulty

For each requested question, make a compact working note: topic/objective,
administrative decision, pattern from the guide, difficulty and the reasoning
it requires, decisive facts, answer structure/count, and distractor misconceptions.
These notes support authoring and review; they are not new scored JSON fields.

Choose difficulty by the reasoning, not stem length:

- **Foundation:** recognize a direct distinction or documented behavior.
- **Applied:** interpret requirements or configuration to choose an action,
  setting, or outcome.
- **Troubleshooting:** use observed behavior and relevant configuration/evidence
  to diagnose a cause or select a diagnostic/repair step.

For a batch, plan distinct decisions and suitable patterns before drafting:
constrained tasks, configuration/numeric interpretation, diagnostic choices,
feature comparisons, next steps, or supported completion/mapping/sequence
adaptations. Check repetition and difficulty against the plan after drafting.
Do not make an applied batch mainly recall with added company stories. Respect
a user-requested focused format; do not force every pattern into every topic
or invent official difficulty proportions. For reviews, classify the existing
items and report batch-level repetition or misleading difficulty labels.

## Establish the answer before writing choices

1. Follow the documented exam baseline; a newer service feature is not
   automatically an exam objective. Keep supplementary material labeled.
2. Check current Microsoft primary sources for the answer, limitations, and
   prerequisites. Use the exam outline for scope and service documentation for
   behavior. Distinguish a recommendation from a hard constraint or example.
   Record the date the evidence was actually checked.
3. Fix the facts that could change the answer: service, SKU, region, protocol,
   permission scope, existing configuration, and required outcome. For cost or
   least-privilege decisions, define the permitted operations and requirements
   that make the comparison meaningful.
4. If sources conflict, access prevents verification, or the answer set is not
   unique under the wording, record the issue and leave that claim unscored.
   Resolve it through evidence or a clearer scenario. Continue independent
   questions; do not invent an answer key.

## Draft a self-contained question

1. For applied or troubleshooting questions, state the environment, existing
   state, goal, constraints, and requested decision. Keep only relevant facts
   and keep foundation questions short. Include prior completed work for a
   next-step question.
2. Include necessary case facts, consistent units, resource relationships, and
   time windows so the question makes sense when selected independently.
3. Ask for one answer or an exact selection count. State whether choices are
   individual solutions/assertions or jointly required components.
4. Offer at least four parallel, comparable alternatives in the current bank
   format. Each distractor needs a related misconception and a specific
   scenario requirement or documented behavior that disqualifies it. Being
   merely less fashionable is not a reason to be wrong.
5. Reject clues from option length, grammar, absolute wording, or positions.
   Do not reference visible letters or use all-of-the-above alternatives.
6. Explain every option: conclusion, decisive scenario fact, supporting service
   behavior. Explain why a wrong choice fails here and, where useful, when it
   would be appropriate. In working notes, map every rationale to its supporting
   source, including counterfactual claims. Record Microsoft URLs in `sources`;
   cite claims in accompanying knowledge or drafts.
7. Author an original scenario and distractor set from the objective and sources.
   Renaming resources in a published question is insufficient. Do not use
   confidential or purported live-exam items or label original work official.

For unsupported formats, use the guide's multiple-choice adaptations only when
they preserve the tested decision. Do not pad a binary item with bogus choices
or introduce app behavior. If no sound adaptation exists, report the limitation
and leave the item out of the scored bank.

## Resolve topic-label clues

Read the actual title for the question's `topic` in `exam/topics.json` and
consider it alongside the stem and options. The current app's `topicContext()`
in `app/main.mjs` displays that shared title; it has no per-question context
override. Recheck the renderer if this behavior changes.

If the title supplies the feature being selected, rewrite the decision within
the named service: a configuration, outcome, diagnosis, or next step. Keep the
requested learning objective and difficulty; then review the rewritten item
afresh. If that changes the requested decision, report that the item needs
separate context/metadata work rather than silently replacing it. Do not invent
an ignored JSON display field or rename a shared topic as a local question edit.
In review mode, propose the remedy without editing. Accept the item only when
its real displayed context orients the learner without supplying the answer.

## Construct reviewed variants when requested

1. Record the family's invariant assessed principle and administrative decision,
   and the variable facts that could change its answer.
2. Change a decisive requirement or configuration fact rather than only names.
   Derive the new conclusion and key from the sources before updating choices.
3. Recheck every option, rationale, source, and visible context for each variant.
   Do not inherit the original key or merely toggle `correct`. A changed fact
   may make a former distractor correct or require replacing a choice.
4. Keep the same topic/family when the assessed principle and decision remain
   the same. Use a new family when they change; shared topic alone is insufficient.
   Preserve existing IDs and revision rules when editing; give new variants
   unique question IDs and stable option IDs.
5. Confirm that the requested variation was achieved and explain which fact
   caused any answer change. Do not force different keys where the facts do
   not warrant them, or treat shuffled visible letters as substantive variants.

## Review individual choices and complete answer sets

Use the answer structure from the question, not just `select`:

- **Individual solutions or assertions:** each keyed solution must meet the
  complete goal by itself; each keyed assertion must be true under the scenario.
  Check all offered options. Exactly `select` must qualify.
- **Jointly required components:** the keyed set must meet the goal together.
  Explain each component's contribution and check its necessity under the
  wording, including removal/substitution. No other offered set of the declared
  size may meet the requirements. Do not require each component to solve the
  whole problem alone. A redundant component or another sufficient set requires
  revising the scenario, choices, or selection count.
- **Complete configurations, mappings, or sequences:** evaluate each complete
  candidate against all requirements, including dependency order where relevant.
  Do not grade its individual steps as independently sufficient solutions.

Check permissions and prerequisites in the appropriate branch. Flag any
reasonable reading that yields an additional answer or answer set. For drafts
or authorized edits, correct the item and repeat the full review; in review mode,
propose the correction. Review each variant independently.

Apply the guide's acceptance checklist to the real label, stem, options, and
explanations. Also check the working plan's reasoning level and batch variety.
Distinguish wording defects from technical uncertainty. Automated schema checks
cannot settle Azure behavior.

## Deliver and verify

- **Draft:** provide the scenario, selection count, options, correct answer set,
  explanation for every option, sources, verification date, and unresolved
  issues. Keep the key separate from the learner-facing question. Include brief
  pattern/difficulty and variant reasoning where needed to review the request.
- **Review:** identify the question ID/location, defect, effect, evidence, and
  proposed correction. Report item acceptance plus relevant batch/variant gaps.
- **Authorized bank edits:** edit `questions/**/*.json` using the documented
  schema. Preserve existing question and option IDs; assign stable IDs to new
  entries. Increment `revision` when the answer, meaning, or technical explanation
  changes. Put related knowledge claims in the topic file and rebuild generated
  files rather than editing them by hand.

After bank edits, run `npm run build`, `npm run check`, and `npm test`; update
`STATUS.md` with actual results and remaining issues. Keep scoring by option ID,
one variant per family per quiz, and exact-match practice scoring. Do not claim
these checks prove correctness, predict exam readiness, or reproduce the live
exam's scoring, question count, format mix, or navigation rules.

When evaluating or revising this skill, use the relevant
[acceptance cases](references/acceptance-cases.md). Compare actual drafts or
review findings with their expected behavior; report manual walkthroughs
separately from model-driven evaluations and schema checks.
