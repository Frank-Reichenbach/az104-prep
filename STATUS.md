# Session handoff

Updated: 2026-10-01. Approved scope: [PLAN.md](PLAN.md).

## Current increment

Quiz refinements and GitHub Pages publication. The knowledge base still has
three documented objectives out of 82, with 16 questions across 15 families.
Azure command examples remain documentation-checked, not lab-tested.

Implemented:

- Test submissions advance immediately to the next question or final results.
- Preparation retains full answer explanations and the Next step.
- Every question shows its topic, including mixed-topic sessions.
- Incorrect results open by default; correct results remain collapsed.
- Result details show selected and correct options, without unrelated
  distractors or duplicate options for partially correct multiple selections.
- Relative URLs support local hosting and the /az104-prep/ project path.
- A static-site build packages app files and study content into _site/.
- GitHub Actions validates, tests, builds, and deploys using standard runners.

## Publication

Origin: https://github.com/Frank-Reichenbach/az104-prep.git.
The remote was inspected and confirmed public and empty. The user authorized
publication until they can test the Pages app. The first published branch will
be feature/github-pages; no merge is needed for this initial deployment.

Target: https://frank-reichenbach.github.io/az104-prep/.
Deployment is pending; update this section after checking the live site.

## Verification

- Content build/check: valid mappings, question structure, internal links, and
  reproducible generated output.
- Ten Node tests cover scoring, variants, progress validation, content
  rejection cases, and local HTTP routing.
- Chrome automation checked both local-root and project-path hosting. It
  exercised all available families, valid/invalid submissions, partially
  correct multiple answers, direct advancement, final results, topic context,
  compact results, expansion state, preparation feedback, internal HTTP links,
  and browser history persistence after reload.
- No Azure resources were deployed and no paid service was configured.

## Next task

Finish publication and verify the live Pages app. Then let the user test it.
After the UI feedback, resume storage research: blob/container soft deletion,
blob versioning, and file-share snapshots/soft deletion (st-14, st-17, st-15).
Add specific topic files and 3–5 original question families per topic, then
update exam/topics.json and rebuild.

Complete the remaining storage objectives, followed by identity/governance,
compute, networking, and monitoring/recovery. Domain-weighted mixed quizzes
remain deferred until every domain has enough questions. A skill remains an
optional later interface.

## Limits

- The app has the storage sample, not complete exam preparation.
- Study progress is browser-local; transfer it using export/import.
- Reloading ends an unfinished quiz but preserves submitted answers when
  browser storage is available.
- Knowledge links expose Markdown. A formatted reader is outside this increment.
- Smart tier remains supplementary research, not scored content.
