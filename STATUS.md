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

- Coverage, Knowledge index, Printable questions and "Study this topic" open in an in-app Markdown viewer (`#/doc/<path>`, `app/markdown.mjs`) instead of raw `.md` files.
- Compact header: title left, theme toggle top right. Question/family/objective counts and the Coverage, Knowledge index, Printable questions and Changelog links moved to the footer. Verified with `pnpm run build`, `pnpm run check`, `pnpm test` (24 pass) and a browser check at desktop and 375px width.
- Test submission advances directly to the next question or final results.
- Preparation preserves feedback for every option and the Next step.
- "I'm unsure" (button or `U` key) records an attempt with `unsure: true` and no selection; it never counts as correct. Review filter offers wrong, unsure, or both (latest result per family). Verified by `npm test` (18 pass); not yet browser-verified by the user.
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

## Releases

Release automation (release-please, `.github/workflows/release.yml`) is
implemented on `feature/release-automation` but not yet merged or run. The app
footer reads `app/version.json` and links `CHANGELOG.md`. Baseline version is
0.1.0; the changelog starts after commit 6b3c651. `npm run test:browser` was
not run locally (Chrome not installed at the default path); `npm run check` and
`npm test` pass.

## Verification

Dark mode (uncommitted, 2026-10-03): the moon/sun toggle sits in the header
menu, follows the system theme by default, and stores the choice in the
browser (`az104-theme`). `pnpm run check` and the 13 Node tests passed; the
toggle was checked manually in the built-in browser. `pnpm run test:browser`
could not launch Chrome in this environment, so it was not run.

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

## Styling

The app UI uses Tailwind CSS v4, compiled at build time (devDependencies only;
no runtime dependency, CDN, or CSP change). Edit app/tailwind.css, index.html,
or main.mjs, then run `pnpm run build:css` and commit the generated app/style.css.
CI fails if the committed stylesheet is stale. `pnpm install --frozen-lockfile` is now required before
building. Verified 2026-10-03: pnpm test (13 pass) and the browser check at both
base paths passed (Edge via BROWSER_BIN); a visual check was done on desktop width only.

CSS animations (2026-10-03, branch feature/css-animations): section fade-in,
staggered answer choices, feedback and message entrances, button/toggle
transitions. All are disabled under prefers-reduced-motion. Verified: npm run
build, check, and test (13 pass). Not checked in a browser.

## PWA and offline use

Added 2026-10-03 (branch feature/pwa-offline): web app manifest, icons
(app/icons/, source icon.svg, PNGs rendered once with rsvg-convert), and a
service worker (app/sw.js, filled by scripts/sw.mjs) that precaches the whole
site, including all Markdown documents, under a content-hash cache name. A new
version waits until the user clicks "Reload to update", so a running session is
never swapped. Theme preference is now system / light / dark (default system,
follows OS changes live) and updates the theme-color meta tag. Verified: pnpm
run build, check, test (27 pass), build:site, and the browser check (Edge via
BROWSER_BIN) at both base paths, which reloads with the network off, opens a
document offline, and cycles the theme. Not verified: installation on a real
phone/desktop, Lighthouse, and the live Pages deployment (GitHub Pages sends
`Cache-Control: max-age=600` for sw.js, so updates can lag up to ~10 minutes).

## Search and agent discovery

Added 2026-10-03 (branch `feature/seo-discovery`, not yet merged or deployed):
canonical, Twitter and JSON-LD (`Course`) metadata, a `<noscript>` link list,
and generated `robots.txt`, `sitemap.xml` and `llms.txt` (`scripts/seo.mjs`).
The public base URL is `SITE_URL`, default
<https://vergissberlin.github.io/education-az104/>; AGENTS.md still names the
Frank-Reichenbach remote, so confirm which URL is authoritative. `pnpm test`
passes (28 tests); `pnpm run test:browser` could not run locally (Chrome not
installed at the expected path). After deploy, submit `sitemap.xml` in Google
Search Console and Bing Webmaster Tools and validate the JSON-LD. Topic content
is still reachable only as raw Markdown, not as per-topic HTML pages.

## Exam-sized test mode

Added 2026-10-03 (branch `feature/exam-timer`, not yet merged or deployed): test
mode defaults to 50 questions and 100 minutes (practice mode keeps 10 and has
no timer). The time limit field is editable and follows the question count at
2 minutes per question until edited. A countdown progress bar shrinks during the
session, turns amber below 25% and red below 10%, and the session ends
automatically at zero ("Time expired"); unanswered questions are not scored.
Basis: Microsoft states "typically 40-60 questions" and 100 minutes (120 with
labs) for associate exams (checked 2026-10-03). The 2 minutes per question is
our assumption, not an official figure. `pnpm run build`, `pnpm run check` and
`pnpm test` (30 tests) passed; the countdown, auto-end, defaults and practice
mode were verified manually in the built-in browser. `pnpm run test:browser`
was not run. `.claude/launch.json` names port 3000, but `pnpm start` serves
port 8080.

## Analysis page and charts

Added 2026-10-03 (branch `feature/analysis-page`, not merged or deployed):
`#/analysis` shows the weakest exam domains (error rate, drill-down to topics,
at least 3 answered families per area). The results screen of every session
embeds a grouped bar chart of this test against the learning state before it,
with a percentage-point change per area (shown only with 3+ answers on both
sides). Charts use Chart.js 4.5.1 (MIT), vendored in `app/vendor/` and loaded
lazily; a data table is the accessible fallback. Statistics come from the
latest answer per family (`topicStats`, `compareStats`, `weakest` in
`app/quiz.mjs`). History format is unchanged. Verified manually in the built-in
browser with synthetic history (`pnpm start` serves port 8080, not the 3000
from `.claude/launch.json`). `pnpm run build`, `pnpm run check`, `pnpm test`
(33 tests) and `pnpm run test:browser` (run with Microsoft Edge via
`BROWSER_BIN`, Chrome is not installed here) passed. Not verified: dark-mode
and 375 px rendering of the charts.

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
