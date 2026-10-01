# Session handoff

Updated: 2026-10-01. Approved scope: [PLAN.md](PLAN.md).

## Current increment

Storage data-protection expansion. The knowledge base now has six documented
objectives out of 82, with 36 questions across 35 families and eight topics.
Azure command examples remain documentation-checked, not lab-tested.

New content covers blob soft deletion, container soft deletion, blob versioning,
Azure Files share snapshots, and classic share soft deletion. There are four
new question families per topic. Files distinguish recovery scope, retention,
feature prerequisites, implementation, verification, and cleanup. The snapshot
topic records an ambiguity in introductory Microsoft wording and follows the
dedicated soft-delete reference's explicit share-level scope.

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
publication until they can test the Pages app. The published/default branch is
feature/github-pages; no merge was needed for this initial deployment.

Live app: https://frank-reichenbach.github.io/az104-prep/.
GitHub Pages deployed successfully and the public app was verified in Chrome.
[Deployment run](https://github.com/Frank-Reichenbach/az104-prep/actions/runs/36872020021)
published app commit d43ce77. GitHub's automatically created main-only
environment rule initially blocked deployment; feature/github-pages was added
to the explicit allowlist and the deployment rerun succeeded.

The data-protection expansion passed local content, Node, and Chrome checks.
It publishes through the Pages workflow on the same ongoing feature branch;
no merge is involved. Use the latest successful Actions run to identify the
current deployment, rather than treating a local commit as publication.

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
- The same browser checks also completed against the live GitHub Pages URL,
  including retrieval of internal study links and progress after reload.
- No Azure resources were deployed and no paid service was configured.

## Next task

After publishing the data-protection expansion, research storage access:
shared access signatures, stored access policies, access keys, and storage
network rules (st-02, st-03, st-04, st-01). Add specific topic files and 3–5
original question families per topic, update exam/topics.json, and rebuild.

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
