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

## Establish the answer before writing choices

1. Identify the learning objective and administrative decision. Follow the
   documented exam baseline; a newer service feature is not automatically an
   exam objective. Keep supplementary material explicitly labeled.
2. Check current Microsoft primary sources for the answer, relevant limitations,
   and prerequisites. Use the exam outline for scope and service documentation
   for behavior. Distinguish a recommendation from a hard constraint or example.
   Record the date the evidence was actually checked.
3. Fix the facts that could change the answer: service, SKU, region, protocol,
   permission scope, existing configuration, and required outcome. For cost or
   least-privilege decisions, define the permitted operations and requirements
   that make the comparison meaningful.
4. If sources conflict, access prevents verification, or more than the declared
   answer set satisfies the scenario, record the issue and leave that claim
   unscored. Resolve it through further evidence or a clearer scenario. Continue
   other independent questions; do not invent an answer key.

## Draft a self-contained question

1. For applied or troubleshooting questions, state the environment, existing
   state, goal, constraints, and requested decision. Keep foundation questions
   short. Include prior completed work when asking for a next step.
2. Make the question understandable when selected independently. Include any
   necessary case facts and consistent units, resource relationships, and time
   windows. Check the visible topic label for context and answer leakage.
3. Ask for one answer or an exact selection count. For multiple answers, make
   clear whether actions are jointly required or independently sufficient.
4. Offer at least four parallel, comparable alternatives in the current bank
   format. For each distractor, identify a related misconception and the exact
   scenario requirement or documented behavior it violates. A merely less
   fashionable alternative is not wrong.
5. Reject clues from option length, grammar, absolute wording, or positions.
   Do not reference visible letters or use all-of-the-above alternatives.
6. Explain every option: conclusion, decisive scenario fact, and supporting
   service behavior. For wrong choices, explain why they fail here and, where
   useful, what different requirement would make them appropriate. Record the
   supporting Microsoft URLs; cite claims in accompanying knowledge or drafts.
7. Write an original scenario and distractor set from the objective and sources.
   Renaming resources in a published question is insufficient. Do not use
   confidential or purported live-exam items or label original work official.

For unsupported formats, use the style guide's multiple-choice adaptations
only when they preserve the decision being tested. Do not pad a binary item
with bogus distractors or introduce new app behavior. If no sound adaptation
exists, report the limitation and leave the item out of the scored bank.

## Review the whole answer set

Evaluate each offered option against every requirement, including permissions
and prerequisites. Exactly `select` options must qualify. If another choice
works under a reasonable reading, flag the ambiguity. For drafts or authorized
edits, revise the constraints or choices and check the full set again. In review
mode, propose that correction without editing files. Check each variant
independently; do not inherit its key.

Then apply the style guide's acceptance checklist: adequate context, supported
claims, consistent terminology, neutral topic labels, original wording, and
explanations that teach the distinction. Distinguish wording defects from
technical uncertainty. Automated schema checks cannot settle Azure behavior.

## Deliver and verify

- **Draft:** provide the scenario, selection count, options, correct answer set,
  explanation for every option, sources, verification date, and unresolved
  issues. Keep the answer key separate from the learner-facing question.
- **Review:** identify the question ID or location, defect, its effect on scoring
  or understanding, supporting evidence, and a proposed correction. Report
  whether each reviewed item meets the guide or requires revision.
- **Authorized bank edits:** edit `questions/**/*.json` using the documented
  schema and stable IDs. Preserve IDs for existing questions/options, use family
  IDs for reviewed variants, and increment `revision` when the answer, meaning,
  or technical explanation changes. Write related knowledge claims in their
  topic file; rebuild generated files rather than editing them by hand.

After bank edits, run `npm run build`, `npm run check`, and `npm test`; update
`STATUS.md` with actual results and remaining issues. Keep scoring by option ID,
one variant per family per quiz, and exact-match practice scoring. Do not claim
these checks prove technical correctness, predict exam readiness, or reproduce
the live exam's scoring, question count, format mix, or navigation rules.
