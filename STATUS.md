# Session handoff

Updated: 2026-10-02. Approved scope: [PLAN.md](PLAN.md).

## Current increment

Compute expansion. The knowledge base now has 56 documented
objectives out of 82, with 195 questions across 194 families and 60 topics.
Azure command examples remain documentation-checked, not lab-tested.

All 24 compute objectives now have guides, questions, and domain/subtopic
indexes. Content build/check, all ten Node tests, static-site build, and Chrome
checks at the local root and project path passed for all 195 questions. The
72 compute questions are ready for publication.
App Service research records the newer linked-database backup deprecation and
the conflicting certificate-public-access wording alongside the November 2025
update. Conflicting details are not used as unconditional scored answers.

All 17 storage objectives now have guides and original questions. The latest
topics cover SAS, stored policies, keys, network rules, Files identity and
provisioning, account creation, redundancy, object replication, encryption,
encryption scopes, AzCopy, and Storage Explorer. Documentation nuances include
newer Files provisioned v2 models and storage firewall exceptions that can
remain effective with public access disabled.

All 15 identity/governance objectives now also have guides and questions:
users/groups, licenses, external users, SSPR, RBAC, Policy, locks, tags,
resource groups, subscriptions, costs, and management groups. App labels and
browser context checks now support multiple domains. Recent identity questions
use related alternative answers rather than unrelated service distractors.

Continue one topic at a time without stopping between batches. Report each
completed topic as "Done: <topic>." The user explicitly requested this workflow.

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

The complete storage domain deployed from d3dcaeb in successful Actions run
36959628423. The live site was also checked in Chrome. Identity/governance
commit 3638c9c deployed successfully in run 36960817593 after retrying a
Chrome startup timeout. That published bank contains 123 questions. No merge
was involved. The expanded compute bank is still local.

## Verification

- Content build/check: valid mappings, question structure, internal links, and
  reproducible generated output.
- Ten Node tests cover scoring, variants, progress validation, content
  rejection cases, and local HTTP routing.
- Chrome automation checked both local-root and project-path hosting. It
  exercised sessions up to the UI's 100-question limit, valid/invalid submissions, partially
  correct multiple answers, direct advancement, final results, topic context,
  compact results, expansion state, preparation feedback, internal HTTP links,
  and browser history persistence after reload.
- The same browser checks also completed against the live GitHub Pages URL,
  including retrieval of internal study links and progress after reload.
- No Azure resources were deployed and no paid service was configured.

## Next task

Complete compute validation and publication, then continue through networking
and monitoring/recovery. Domain-weighted mixed quizzes
remain deferred until every domain has enough questions. A skill remains an
optional later interface.

## Limits

- Storage and identity/governance are published. All compute objectives are
  documented locally; 26 objectives remain across networking and monitoring.
  Presence of content is not exhaustive scenario coverage.
- Study progress is browser-local; transfer it using export/import.
- Reloading ends an unfinished quiz but preserves submitted answers when
  browser storage is available.
- Knowledge links expose Markdown. A formatted reader is outside this increment.
- Smart tier remains supplementary research, not scored content.
