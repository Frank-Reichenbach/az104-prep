# Session handoff

Updated: 2026-10-01. Approved scope: [PLAN.md](PLAN.md).

## Current increment

Repository foundation and the first storage sample. This is **not** completion
of the full approved knowledge base. The app currently draws from storage only.

- Local Git repository initialized on chore/initial-setup. The user provided
  https://github.com/Frank-Reichenbach/az104-prep as the origin remote; origin
  is now configured to that repository's HTTPS Git URL. The planning update is
  on docs/github-pages-plan.
- Approved plan, project instructions, README, ignore rules, attributes, and
  editor configuration added.
- All 82 task bullets from the April 17, 2026 outline inventoried with local IDs.
- Three specific topics documented: containers, access tiers, lifecycle.
- Sixteen original questions across fifteen families, including one reviewed
  scenario variant. Every option has an explanation and source references.
- Local app supports topic filtering, practice/test feedback, shuffled options,
  one variant per family, exact-match scoring, missed-family review, and
  browser progress export/import.
- Build generates coverage, printable questions, answer explanations, and app
  data from the source files.

## Verification

Microsoft documentation was checked on 2026-10-01. Azure commands and policy
examples have not been executed in Azure.

- npm run build: generated coverage, app data, and printable material.
- npm run check: validates question structure, mappings, internal links, and
  reproducibility of generated files.
- npm test: 10 tests cover exact-match scoring, shuffling, variant exclusion,
  topic/missed filtering, progress validation, content rejection cases, and
  local HTTP routes. The HTTP test needed host permission to bind a loopback
  port; rerunning with that permission completed successfully.
- No visual or interactive browser review was performed in this session.
  JavaScript syntax and HTTP behavior were checked separately.
- Planning update: npm run check and git diff --check completed; origin's fetch
  and push URLs were verified locally. No app code changed in this update.

## Next task

Implement the requested quiz refinements:

1. Test submissions advance directly to the next question or final results.
   Preparation keeps feedback and the Next question button.
2. Display the topic/module above each question.
3. Open incorrect results by default; keep correct results collapsed.
4. Result details show selected answers and, when wrong, the correct answers,
   without the other distractors. Keep full explanations in preparation mode.

Then implement GitHub Pages packaging and deployment as specified in PLAN.md.
The expected URL is https://frank-reichenbach.github.io/az104-prep/; it is not
verified live. No push, Pages activation, or deployment has been performed in
this planning update. Remote visibility, existing history, and Pages settings
have not been inspected. The hosting discussion's 1–2 hour estimate remains
preliminary. This update records the work; it does not implement the UI changes.

After these app tasks, research storage data protection: blob/container soft
deletion, blob versioning, and file-share
snapshots/soft deletion (st-14, st-17, st-15). Add separate detailed files and
3–5 original question families per specific topic. Follow docs/research.md and
update exam/topics.json, rebuild, and update this handoff.

Then complete the remaining storage objectives, followed by identity/governance,
compute, networking, and monitoring/recovery. Domain-weighted mixed quizzes
remain deferred until enough questions exist in every domain. A quiz skill is
an optional later interface, not required for this first app.

## Known limits and decisions

- Coverage is 3/82 objectives. A documented objective is not proof of exhaustive
  scenario coverage or user mastery.
- Current product docs describe smart tier. It is not included in scored
  questions; assess its relevance when refreshing the tier topic.
- No Azure deployments or paid services. GitHub Pages is now the planned
  public hosting target, while local usage remains supported.
- The app stores answered-question history, not an unfinished quiz session.
  Reloading ends the active session but keeps submitted answers when browser
  storage is available.
- Knowledge links open Markdown as text in the local server. A formatted
  document reader is outside the initial basic app.
