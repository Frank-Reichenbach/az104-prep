# Session handoff

Updated: 2026-10-04. Approved scope: [PLAN.md](PLAN.md).

## Current increment

The full existing live-bank style review/update is authorized on 2026-10-03.
Work branch: `fix/question-bank-style-refresh`. Read the
[resume guide](docs/reviews/question-bank-refresh/README.md) and
[ledger](docs/reviews/question-bank-refresh/progress.json); run
`npm run review:status` before resuming. Completed reviews have final hashes;
unchanged completed questions must not be reviewed again.

Checkpoint: 178/322 questions reviewed, 139 revised and 39 kept; 53/99 topics complete.
Latest: [Container resource sizing and replica scaling](docs/reviews/question-bank-refresh/compute.containers.scaling.md). Each completed topic has item decisions,
repair reasons, variants where present, and primary sources checked October 3–4.
Build/check, all 13 Node tests, site links, review hashes, and whitespace checks
validate checkpoints. The initial stale-hash fixture was rejected as expected.
These are author-led reviews; no Azure labs were run.
Next: `compute.app-service.plans` (App Service plan creation and compute sharing).
The work branch is pushed and [draft PR #3](https://github.com/Frank-Reichenbach/az104-prep/pull/3)
tracks the ongoing refresh. The live main bank still has the baseline
questions. The preserved research inventory remains separate. Merging this
refresh PR needs explicit approval; do not reuse the earlier skill PR approval.

## Previous skill publication

The user requested that fresh clones include the question-authoring skill.
Its three files are already tracked under
`.agents/skills/az104-question-authoring/`, with repository-relative references
and no dependency on a personal plugin installation. README.md now documents
clone/open/invoke steps and lists the skill directory in the project map.
The unpublished work branch was renamed to
`feature/az104-question-authoring-skill`; the earlier `docs/` prefix named a
Git branch, not the skill's directory. It retains the preceding research,
skill fixes, and review reports required by this increment.

The user explicitly approved merging [PR #1](https://github.com/Frank-Reichenbach/az104-prep/pull/1)
into main on October 3, 2026. That PR records publication and the merge
revision; [main Actions runs](https://github.com/Frank-Reichenbach/az104-prep/actions?query=branch%3Amain)
record the corresponding Pages deployment. The skill remains in
`.agents/skills`, with clone/open/invoke instructions in README.md.

A clean GitHub feature-branch clone at `c809199` contained all three tracked
skill files, resolved all four local Markdown reference links, included the
shared repository documents, and passed `npm run check`. Checks found no
personal filesystem paths, plugin dependencies, or symlinked skill files.
This verifies packaging and references, not discovery in a separate running
Codex client. Official OpenAI documentation confirms `.agents/skills` discovery;
README.md links that source and provides invocation instructions.

Local build/check, all 13 Node tests, static-site link validation, skill
frontmatter validation, and diff whitespace checks passed. PR validation also
covered browser behavior. The merge publishes the skill, its required guide,
preserved research, and review records; it changes no scored questions or app
behavior. The merge procedure checks a fresh default-branch clone and waits
for the main Pages deployment. No separate skill or plugin installation is
required by the documented repository-local workflow.

## Three-question sample increment

The requested review of three live questions is complete. The
[sample report](docs/reviews/live-question-sample-review.md) records the
deployed/local equality check and source-backed judgments for `st-life-003`,
`id-effective-additive`, and `nw-nsg-state`. The downloaded live bank contained
322 questions. All three intended keys were supported by Microsoft sources
checked on October 3, 2026. The RBAC question can be kept; the lifecycle and NSG
questions need targeted distractor improvements, with a stronger correct
rationale also needed for the NSG item. No scored content was edited.

Recommendation: review the full bank and retain sound items while making
targeted repairs. Three deliberately selected questions do not establish a
bank-wide rewrite rate or approve every other item. The preserved research
inventory remains separate. Build/check, all 13 Node tests, static-site link
validation, and diff whitespace checks passed. A Git audit confirmed the skill,
question bank, knowledge, exam metadata, generated files, app, style guide, and
inventory were unchanged. The report remains local on the work branch.

## Skill finding-fix increment

All four question-authoring skill findings have been addressed at the user's
request. The [resolution record](docs/reviews/az104-question-authoring-finding-resolution.md)
maps each finding to the corrected workflow and acceptance evidence. The skill
now plans batch patterns and reasoning levels, resolves rendered topic clues,
constructs variants from decisive facts, and branches answer review between
individual choices, joint components, and complete candidates. Rationale source
tracing is explicit in working notes. Seven reusable acceptance cases are
bundled with the skill; no scored JSON schema or app behavior was changed.

Author-led checks produced six temporary original drafts, reviewed all seven
acceptance cases, planned a six-item batch, and verified unique variant IDs,
stable option IDs, changed keys, and the joint-action example's unique valid
pair. All temporary drafts passed the real schema validator. These checks are
not independent model-driven evaluations or Azure labs. The skill-creator
validator, metadata/reference checks, repository build/check, all 13 Node tests,
static-site link validation, and diff whitespace checks passed. A Git audit
confirmed the bank, app, knowledge, outline, generated files, style guide, and
inventory were unchanged. This revision remains local on
`docs/az104-question-authoring-skill`; no push, merge, or deployment was performed.

## Functional review increment

The requested functional review of the question-authoring skill is complete.
The [review report](docs/reviews/az104-question-authoring-functional-review.md)
assesses the authored revision at `1dd081c`, focusing on researched question
style and the original practice-question requirements. It records one high
priority ambiguity in joint-action answer review and three medium priority
workflow gaps: batch style/difficulty planning, topic-label clue resolution,
and variant construction. The skill and bank were not revised during review.

Verification includes 12 manual instruction walkthroughs, one original draft
validated in memory, a deliberately wrong key accepted by the schema validator,
and enumeration of the joint-action example's six possible answer pairs.
Microsoft sources for the examples were checked on October 3, 2026. These are
review diagnostics, not independent model-driven evaluations or Azure labs.
Build/check validated the unchanged 322-question bank and 82/82 coverage;
all 13 Node tests and the static-site build passed. Internal review-document
links and diff whitespace checks passed. A Git audit confirmed the skill,
bank, knowledge, exam metadata, generated files, app, style guide, and preserved
inventory were unchanged. The report and handoff remain local on the work
branch; no push, merge, or deployment was performed.

## Skill creation increment

The requested question-authoring skill is implemented on
`docs/az104-question-authoring-skill`, which includes the preceding local
research commit. Its entrypoint is
`.agents/skills/az104-question-authoring/SKILL.md`, with Codex presentation
metadata in `agents/openai.yaml` inside the skill directory. It reads the
existing style guide, question format, and research conventions, then applies
them to drafting, editing, or reviewing original questions. Review requests
produce findings; inventory adaptation still needs the user's later request.

AGENTS.md routes question-authoring work to the skill. README.md documents
invocation and repository-local discovery, checked against official OpenAI
documentation on October 3, 2026. This increment changes no questions, Azure
knowledge, research inventory, generated bank data, or app behavior. This branch
is local and has not been pushed, merged, or deployed.

Skill verification: the skill-creator validator passed. Its missing PyYAML
dependency was installed in an isolated temporary Python environment, with no
project or global dependency changes. Additional checks verified the matching
directory/name, UI metadata, invocation prompt, and all repository reference
paths. The workflow was reviewed for review-only findings, ambiguous answer
sets, and unsupported question formats. No independent model-driven evaluation
or new Azure question trial was run; structural checks do not establish the
quality of future questions.

Repository verification: build/check validated the unchanged 322 questions,
99 topics, and 82/82 objective coverage. All 13 Node tests passed. The static
build checked deployment links, and a Git diff audit confirmed that the bank,
knowledge, outline, generated content, app, inventory, and style guide were
unchanged. No Azure lab was executed.

## Previous research increment

The requested official-question-style research is complete on
docs/official-question-style-research. The
[research inventory](docs/research/official-question-inventory.md) preserves
69 paraphrased public Microsoft training questions from 23 pages, plus 47
distinct technical oral prompts/themes from five official preparation videos.
The five current AZ-104 learning paths and their 26 modules were inspected;
an additional Log Analytics module supplied three of the 69 questions.
The interactive Practice Assessment yielded no readable items; its access
limit is recorded. These are public preparation resources, not live exam items.

The [style guide](docs/az-104-question-style.md) separates documented exam
formats, observed public-example patterns, and repository authoring rules.
AGENTS.md requires future question work to read it. Research entries have no
bank IDs or objective/topic/family mappings and remain unscored. No existing
questions, generated data, quiz behavior, or coverage mappings changed.
Review flags preserve broad, ambiguous, or changing Microsoft wording rather
than treating the collected alternatives as verified answer keys.
This documentation branch has not been merged or deployed.

Research verification: build/check validated the unchanged 322-question bank,
99 topics, and 82/82 coverage. All 13 Node tests completed with localhost
binding allowed; the initial restricted run could not bind its server socket.
The static build checked the new documentation's internal links. An inventory
audit confirmed 69 unique sequential OBS IDs, 47 unique sequential VID IDs,
23 question-page sections, and five video sections. No Azure lab was executed.

All 82 objectives from the April 17, 2026 outline now have researched guides
and original questions. The outline was rechecked against Microsoft on
October 2, 2026 and remains unchanged.

The bank contains 322 questions across 311 families and 99 specific topics:
storage, identity/governance, compute, networking, and monitoring/recovery.
Reviewed variants are available in every domain. Examples remain
documentation-checked, not executed in Azure. Coverage measures presence of
content, not exhaustive scenarios, mastery, or exam readiness.

The 13 networking objectives have 15 specific guides. All 13 monitoring/recovery
objectives now cover metrics, diagnostics, agent/DCR collection, KQL, alerts,
Insights, network monitoring, vaults, backup/restore, reporting, and Site Recovery.
Domain and subtopic indexes link the detailed files.

The planned weighted mixed sessions are implemented using normalized domain
midpoints and rounded family counts. Missed-family review adapts to available
capacity. [Selection design](docs/quiz-selection.md) explains the approximation.
Printable questions and answers now include domain/topic context.

Implemented app behavior:

- Test submission advances directly to the next question or final results.
- Preparation preserves feedback for every option and the Next step.
- Every question displays its topic; incorrect results open, correct results
  stay closed. Results show selected answers and missed correct answers only.
- One reviewed variant per family, stable option IDs, exact-match scoring.
- Browser-local history with validated export/import; no account or backend.
- Local-root and GitHub project-path hosting with relative study links.

A global Git ignore pattern excluded directories named Backup and Logs.
Repository ignore exceptions now keep all knowledge Markdown/indexes trackable.

## Publication

Origin: https://github.com/Frank-Reichenbach/az104-prep.git.
Public repository; default/deployment branch: main. The user authorized the
migration on 2026-10-02. Initial publication used feature/github-pages, whose
history is preserved by renaming the branch. No merge was needed. Future work
uses prefixed branches and pull requests; merges still require approval.

The Pages workflow and environment allow deployment only from main. The local
main branch tracks origin/main, and origin/HEAD resolves to origin/main.
The repository's About website field links the live
app, and its topics are azure, az-104, exam, preparation, and exam-preparation.
The README starts with an unofficial-study-material notice. See the phase
status table in [PLAN.md](PLAN.md) for the original plan's delivered work.

Live app: https://frank-reichenbach.github.io/az104-prep/.

The complete 322-question bank and weighted sessions deployed from e0a31df in
successful [Actions run 37025534855](https://github.com/Frank-Reichenbach/az104-prep/actions/runs/37025534855).
The public data was checked for 322 questions, 99 topics, and 82/82 objectives.
Chrome verified weighted sessions, direct advancement, topic context, results,
preparation feedback, study links, and saved progress against the live URL.
The branch also includes a follow-up correction that shuffles unique families
before weighted selection so families with extra variants have equal selection
opportunity. Its regression test and local browser checks passed.
The correction deployed from 6b96c34 in successful
[Actions run 37025987214](https://github.com/Frank-Reichenbach/az104-prep/actions/runs/37025987214),
and Chrome checked the live app and confirmed its quiz module matched the local
revision. For subsequent commits, use the repository's Actions history.

The publishing audit added browser checks for native Tab/Space/Enter operation
and actual progress download/import with the confirmation dialog. Local checks
also transfer a downloaded history file between the root and project-path
origins and verify imported history survives reload.
These checks completed at both local URLs and against the live Pages site.

The pre-migration head was ce1c0fd. The workflow/docs migration commit was
prepared and checked on the initial publication branch before the rename,
retaining all history without a direct push to main. The repository-wide audit
found no webhooks, rulesets, branch protections, open PRs, or hard-coded content
URLs depending on the old branch. Its remaining mentions are historical notes
and older-clone update instructions in docs/hosting.md.

Migration preflight included build/check, all 13 Node tests, the static build,
and Chrome checks at both local hosting paths. The user also confirmed export
and import work. Main deployment runs are recorded in the
[Actions history](https://github.com/Frank-Reichenbach/az104-prep/actions?query=branch%3Amain).

## Verification

Content build/check has validated all 82 objective mappings, question formats,
three or more families per topic, internal links, and generated output.
All 13 Node tests passed, including weighted domain allocation, scarce/missed
family selection, variant selection fairness, exact scoring, isolation, progress validation, and
local HTTP routing. The static build and Chrome checks passed at both the local
root and /az104-prep/ path, exercising weighted 100-question tests, direct
navigation, module context, compact/open results, preparation feedback, internal
links, and progress persistence. Azure claims were reviewed separately using
Microsoft sources; these automated checks do not establish technical correctness.

Earlier ten-test Node and Chrome checks passed for the 240-question networking
increment at the local root and project path. Live checks passed for previous
published increments. Browser sessions are limited to 100 questions; they do
not evaluate every Azure claim.

The keyboard/file-transfer checks close verification gaps in the original plan;
they do not add a new app feature or change question content.

## Documentation uncertainties

Guides explicitly record conflicting or changing Microsoft wording rather than
using those claims as unconditional scored answers. Examples include App
Service certificates/linked-database backup, Standard VM backup and Trusted
Launch/migration, secure-by-default soft delete availability, Ultra Disk
cross-region restore, Connection Monitor agent guidance, and failback tutorial
direction wording. VM Insights Map/Dependency Agent deprecation and NSG flow-log
retirement are documented with current alternatives.

## Next task

Continue the authorized existing-bank review from `npm run review:status`.
Current checkpoint: 89/322 questions, 24/99 topics complete.
Next: `identity.users.licenses` (User and group license assignments).
Record real source checks and repair decisions in its report; do not mark a
topic complete based on schema checks alone.

The skill-review findings are resolved. Use the revised workflow for the next
requested authoring or review task, and retain acceptance cases for future
changes. A broader independent quality evaluation remains a possible follow-up;
the author-led checks above do not claim one was performed.

Wait for the user's later request before reviewing, updating, or adding the
preserved research questions. At that point, recheck current Microsoft service
documentation and write original scenarios using the new style guide. Do not
automatically map or import the inventory. Reviewing an authenticated Practice
Assessment remains an optional source follow-up, not a claimed completed survey.

The approved initial knowledge base and basic app are complete. There are no
unfinished exam objectives. Next work is maintenance driven by study feedback,
additional scenario depth, and source refresh before the December–January exam
window. Recheck the official outline and the documented service changes first.
The question-authoring skill is available for future content work. A quiz skill
remains an optional later interface; the basic app is the chosen first interface.
Do not start cloud labs without authorization for that separate scope.

## Limits

- No Azure resources were deployed and no cloud lab was executed.
- Study progress stays in each browser; use export/import to transfer it.
- Reload ends an unfinished quiz but preserves recorded answers when storage
  is available.
- Study links expose Markdown; a formatted reader is outside this increment.
- Supplementary service developments are labeled, not new exam objectives.
