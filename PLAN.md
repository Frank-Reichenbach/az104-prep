# AZ-104 knowledge base and practice app

Status: approved on 2026-10-01; updated to include quiz refinements and GitHub
Pages. Initial implementation completed on 2026-10-02; coverage, verification,
and maintenance are tracked in [STATUS.md](STATUS.md).

## Phase status

| Phase | Status | Delivered |
| --- | --- | --- |
| 1. Repository setup | Complete | Local Git, project instructions, conventions, and origin |
| 2. Exam inventory | Complete | Overview, domain weights, 82 objective IDs, and coverage matrix |
| 3. Knowledge base | Complete initial coverage | 99 researched specific guides with sources, implementation, and limitations |
| 4. Question bank | Complete initial bank | Original questions, option explanations, reviewed variants, and generated Markdown |
| 5. Domain expansion | Complete | All five domains and all 82 objectives documented |
| 6. Study app | Complete | Preparation/test, weighted sessions, missed review, topic context, results, and local history transfer |
| 7. GitHub Pages | Complete | Public static app, Actions deployment, repository website link, and browser checks |
| 8. Maintenance/review | Ongoing | Study feedback, source refresh, and revisions before the exam |

The app satisfies the approved first interface choice. A quiz skill is optional;
it is not an unfinished requirement. A formatted Markdown reader is also an
optional enhancement. The user authorized migrating the default/deployment
branch to main on 2026-10-02. Initial publication used feature/github-pages;
the migration preserves that history through a branch rename. Releases and
version tags are not deployment requirements.

## User decisions

- English throughout.
- Continue topic by topic without pausing between batches; report each completed
  topic with a brief "Done: <topic>." update.
- Some hands-on Azure experience; studying for the exam in 2–3 months
  (approximately December 2026–January 2027).
- A local browser app first. Keep the question bank reusable by a later skill.
- Initialize and maintain a local Git repository, including README, AGENTS.md,
  ignore rules, attributes, and basic project configuration.
- This working directory may be structured as needed.
- Preserve the plan and progress so implementation can span multiple sessions.
- Keep one app usable both locally and on GitHub Pages, using GitHub's free
  services for a public repository.
- Link the local repository to
  [Frank-Reichenbach/az104-prep](https://github.com/Frank-Reichenbach/az104-prep)
  as origin. The user subsequently authorized publication and Pages activation
  so they can test the hosted app. Check STATUS.md for deployment results.
- Apply the requested test navigation, topic context, and result display
  refinements before expanding the question bank further.
- Rename the initial publication branch to main, update local tracking,
  workflow triggers, deployment permissions, and repository-wide references,
  and verify Pages publication from main. Use pull requests for future changes.
- Add a repository-local skill for authoring and reviewing question style,
  requested on 2026-10-03. It applies the researched style guide; the separate
  quiz skill remains an optional interface. Preserved research questions stay
  separate until the user requests their review or adaptation.
- Include the authoring skill and all repository references in fresh clones,
  requested on 2026-10-03. Keep its discoverable entrypoint in `.agents/skills`,
  document use without a separate plugin installation, and publish through a
  pull request. Merging still requires explicit approval.
- Review and update every existing live question using the authoring skill,
  authorized on 2026-10-03. Retain sound items, repair identified defects, and
  preserve stable IDs with revision increments for substantive changes. Track
  each topic and question in docs/reviews/question-bank-refresh/progress.json
  and commit checkpoints so later sessions resume the first unfinished topic.
  The separate collected-question inventory remains outside this task.

## Outcome

Provide a Markdown certification overview, a hierarchy of researched topics,
detailed implementation knowledge, and original multiple-choice questions with
explanations for every option. The local app supports repeatable practice from
those files. Completion requires coverage of all published exam objectives,
not just the initial storage sample.

## 1. Establish the repository

Create the local repository, project instructions, source templates, validation
commands, and persistent progress records. Keep the app free of runtime package
dependencies. Connect the user-provided GitHub remote. Prepare publication
through the GitHub Pages phase below; do not deploy Azure resources.

## 2. Inventory the exam

Use the [official AZ-104 study guide](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-104)
as the scope baseline (objectives effective April 17, 2026; checked October 2,
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

## 6. Refine the study app

Initial functions:

- Topic selection and a configurable quiz length.
- Shuffled questions and options; one variant per question family.
- Practice/preparation mode with feedback after each answer and an explicit
  Next question step.
- Test mode advances immediately after a valid answer submission, with no
  recorded-answer confirmation step. The final submission opens the results.
- Show the topic/module above every question, including mixed-topic sessions,
  so the Azure service and task are clear.
- Exact-match multiple-answer scoring. Keep explanations for every option in
  the question bank and preparation feedback.
- Session results expand incorrect responses by default and keep correct
  responses collapsed. Show the selected answers; for an incorrect response,
  also show the correct answers. Exclude unrelated unselected distractors from
  the result detail. Handle partially correct multiple-answer selections
  without duplicating an option that was both selected and correct.
- Review of missed questions and local progress with export/import.
- Links from answers to the relevant knowledge files.

Add mixed quizzes approximating the official domain weights when all domains
have sufficient question coverage. Until then, label limited coverage clearly
and avoid presenting a storage-only quiz as a full practice exam. Practice
percentages are not Microsoft's scaled exam score.

A quiz skill remains an optional later interface, consuming the same question data.
Do not duplicate the bank or add a model API requirement to the app.

## 7. Publish the same app with GitHub Pages

Target repository: [Frank-Reichenbach/az104-prep](https://github.com/Frank-Reichenbach/az104-prep).
Live project URL: <https://frank-reichenbach.github.io/az104-prep/>.
Initial publication and browser verification completed on 2026-10-01. The
steps below describe the deployment design; see STATUS.md for the outcome.

Use static HTML, CSS, JavaScript, question data, and study files. Node remains
a local development/build tool; GitHub Pages does not need to run our server.

Implementation steps:

1. Inspect the remote's visibility, branches, default branch, and Pages settings
   before publication. Preserve existing remote history if present. Do not
   assume that linking origin means the remote is empty or publicly visible.
2. Adapt asset, data, and knowledge links to work at both the local root and
   the /az104-prep/ project path.
3. Add a reproducible static-site output containing only the study app and its
   intended content. Do not include personal progress or local configuration.
4. Add a GitHub Actions workflow that validates content, runs tests, builds
   the static output, and deploys through GitHub Pages. Pull requests should
   validate without deploying; publish from the selected deployment branch.
5. Use the project's Git conventions for publishing changes. A merge still
   requires an explicit request or approval.
6. Enable Pages and verify the published URL, question submission, results,
   source links, and progress import/export. Keep local usage working.

Cost constraint: use GitHub Pages on a public repository, standard GitHub-hosted
Actions runners, and the included github.io address. Do not add paid runners,
a purchased domain, a backend, or a paid service. GitHub documents
[Pages availability on GitHub Free](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
and [free standard Actions runner usage for public repositories](https://docs.github.com/en/billing/concepts/product-billing/github-actions).

Progress stays in each browser. Export/import transfers it between localhost,
the published site, or devices; there is no account or automatic synchronization.
Questions and answer keys are public study material. The preliminary estimate
for adapting and checking deployment is 1–2 hours, subject to the remote setup.

## 8. Maintain and review

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
- Test submission advances directly; every question has visible topic context;
  results open incorrect responses and show only selected/correct options.
- The same app works locally and at the GitHub Pages project path, with a
  documented free deployment workflow and verified published site.
- Coverage, outstanding uncertainties, and source currency remain visible.
