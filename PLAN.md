# AZ-104 knowledge base and practice app

Status: approved on 2026-10-01. Implementation is tracked in [STATUS.md](STATUS.md).

## User decisions

- English throughout.
- Some hands-on Azure experience; studying for the exam in 2–3 months
  (approximately December 2026–January 2027).
- A local browser app first. Keep the question bank reusable by a later skill.
- Initialize and maintain a local Git repository, including README, AGENTS.md,
  ignore rules, attributes, and basic project configuration.
- This working directory may be structured as needed.
- Preserve the plan and progress so implementation can span multiple sessions.

## Outcome

Provide a Markdown certification overview, a hierarchy of researched topics,
detailed implementation knowledge, and original multiple-choice questions with
explanations for every option. The local app supports repeatable practice from
those files. Completion requires coverage of all published exam objectives,
not just the initial storage sample.

## 1. Establish the repository

Create the local repository, project instructions, source templates, validation
commands, and persistent progress records. Keep the app free of runtime package
dependencies. Do not publish the repository or deploy Azure resources.

## 2. Inventory the exam

Use the [official AZ-104 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104)
as the scope baseline (objectives effective April 17, 2026; checked October 1,
2026). Record domain weights and prerequisite knowledge in exam/az-104.md.
Map each listed objective to stable local IDs, specific knowledge files,
questions, and completion status. Separate supplementary background.

## 3. Research the knowledge base

Use domain → subtopic → specific concept or administrative task. Domain and
subtopic indexes explain relationships and link to detailed Markdown files.

Each detailed file includes purpose, prerequisites, Microsoft recommendations,
implementation steps, permissions, verification, limitations, troubleshooting,
related misconceptions, source links, and a verification date. Include Portal,
CLI, PowerShell, and Bicep where relevant rather than forcing four equivalent
examples into every topic. State which examples were actually executed.

Prioritize Microsoft Learn, Azure service documentation, command references,
and MicrosoftLearning labs. Cite the specific page supporting a claim. Record
uncertainty instead of presenting inference as documented behavior. Research
service changes when revisiting a topic, especially during final exam review.

## 4. Author the question bank

Start with 3–5 original questions per specific topic, expanding when a topic
contains several independent decisions or failure modes. Include single-answer
and multiple-answer questions, scenario selection, configuration interpretation,
and troubleshooting. Each question contains stable IDs, answer count,
difficulty, correct option IDs, explanations for every option, knowledge links,
sources, and a review date.

Use JSON as the single source. Generate Markdown questionnaires and separate
answer keys from it. Vary answer order and use independently reviewed scenario
variants. Variants share a family ID so a quiz selects at most one of them.
Never change a scenario at runtime in a way that could invalidate its answer.

## 5. Establish a storage sample and expand

Implement containers, access tiers, and lifecycle management first. Use the
sample to check writing depth, question structure, and the study experience.
Then complete storage, followed by identity/governance, compute, networking,
and monitoring/recovery. Coverage is the controlling checklist, not a fixed
question total. The sample is a working increment, not the whole knowledge base.

Use automated checks for identifiers, JSON structure, answer consistency,
references, generated output, and quiz logic. Review scenario ambiguity and
Microsoft evidence separately. Test Azure examples only if that work is later
authorized; documentation verification alone must not be labeled lab testing.

## 6. Build the local study app

Initial functions:

- Topic selection and a configurable quiz length.
- Shuffled questions and options; one variant per question family.
- Practice mode with feedback after each answer.
- Test mode with feedback at the end.
- Exact-match multiple-answer scoring and explanations for every option.
- Review of missed questions and local progress with export/import.
- Links from answers to the relevant knowledge files.

Add mixed quizzes approximating the official domain weights when all domains
have sufficient question coverage. Until then, label limited coverage clearly
and avoid presenting a storage-only quiz as a full practice exam. Practice
percentages are not Microsoft's scaled exam score.

A skill remains an optional later interface, consuming the same question data.
Do not duplicate the bank or add a model API requirement to the app.

## 7. Maintain and review

Track source verification dates and affected questions through stable IDs.
Refresh the exam outline and high-change topics before the exam. Retire or
revise stale questions explicitly. On every session handoff, update STATUS.md
with completed work, checks, limitations, and the next task.

## Suggested study sequence

Use the first 6–8 weeks to cover the domains and do hands-on practice where
available. Reserve the final 2–4 weeks for mixed quizzes, weak areas, and source
refreshes. Adjust this once the exact exam date and study time are known; these
are planning suggestions, not assumed weekly commitments.

## Completion criteria

- Every published objective has researched knowledge and scored questions.
- Every detailed topic has implementation guidance and cited Microsoft sources.
- Each question has an unambiguous answer set and a rationale for every option.
- All generated files can be reproduced; links and question data validate.
- The local app supports both practice and test flows and portable progress.
- Coverage, outstanding uncertainties, and source currency remain visible.
