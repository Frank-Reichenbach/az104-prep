# Session handoff

Updated: 2026-10-02. Approved scope: [PLAN.md](PLAN.md).

## Current increment

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
Public repository; default/deployment branch: feature/github-pages.
Initial publication required no merge. Future merges still require approval.

Live app: https://frank-reichenbach.github.io/az104-prep/.

The complete 322-question bank and weighted sessions deployed from e0a31df in
successful [Actions run 37025534855](https://github.com/Frank-Reichenbach/az104-prep/actions/runs/37025534855).
The public data was checked for 322 questions, 99 topics, and 82/82 objectives.
Chrome verified weighted sessions, direct advancement, topic context, results,
preparation feedback, study links, and saved progress against the live URL.
The branch also includes a follow-up correction that shuffles unique families
before weighted selection so families with extra variants have equal selection
opportunity. Its regression test and local browser checks passed.
For subsequent deployment commits, use the repository's Actions history.

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

## Documentation uncertainties

Guides explicitly record conflicting or changing Microsoft wording rather than
using those claims as unconditional scored answers. Examples include App
Service certificates/linked-database backup, Standard VM backup and Trusted
Launch/migration, secure-by-default soft delete availability, Ultra Disk
cross-region restore, Connection Monitor agent guidance, and failback tutorial
direction wording. VM Insights Map/Dependency Agent deprecation and NSG flow-log
retirement are documented with current alternatives.

## Next task

The approved initial knowledge base and basic app are complete. There are no
unfinished exam objectives. Next work is maintenance driven by study feedback,
additional scenario depth, and source refresh before the December–January exam
window. Recheck the official outline and the documented service changes first.
A skill remains an optional later interface; the basic app is the chosen first
interface. Do not start cloud labs without authorization for that separate scope.

## Limits

- No Azure resources were deployed and no cloud lab was executed.
- Study progress stays in each browser; use export/import to transfer it.
- Reload ends an unfinished quiz but preserves recorded answers when storage
  is available.
- Study links expose Markdown; a formatted reader is outside this increment.
- Supplementary service developments are labeled, not new exam objectives.
