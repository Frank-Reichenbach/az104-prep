# Site Recovery production failover and recovery points review

Topic: `monitoring.recovery.failover`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-recovery-failover.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-failover-rto | Revise, revision 2 | Applied numeric constraints | Original no-processing condition also fit an older processed app-consistent point; explicit age limit resolves ambiguity. Key `a`. |
| mo-failover-commit | Revise, revision 2 | Foundation workflow boundary | Replace repeated view-only padding with change-point versus validation/commit/configuration distinctions. Key `c`. |
| mo-failover-shutdown | Revise, revision 2 | Troubleshooting failed shutdown | Replace offline-backup padding with automatic-cancel/pause/data-loss misconceptions. Key `b`. |

## Evidence and acceptance

[Failover tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback)
defines Latest processed, Latest, app-consistent and Custom recovery points,
confirms continuing failover when source shutdown fails, and states that Commit
deletes the available Site Recovery points. These support every workflow and
shutdown rationale. Point timestamps are original scenario givens: five minutes
qualifies; 65 and 125 minutes fail the declared limit. Latest violates the
no-additional-processing condition regardless of its newer data.

Low processing overhead is not a guaranteed RTO for the whole application.
No recovery choice guarantees unreplicated source writes. Potential concurrent
writers are a runbook inference from failed source shutdown, not a new automatic
Site Recovery isolation capability. Custom applies to the explicitly single VM.

Each item has exactly one complete answer; no joint sets or family variants
occur in this topic. Every distractor fails a stated requirement or documented
behavior, as detailed above and in its rationale. The displayed topic title
(`Site Recovery production failover and recovery points`) supplies context, not the requested
configuration, outcome or evidence distinction. Stable IDs and families remain.
The table records the reasoning level and necessary repairs; retained wording
is independently checked against the cited source within this author-led review.
Build/check, all 13 tests, static-site/internal links, ledger hashes and whitespace
checks validate structure and behavior separately from Azure technical review.
No Azure deployments, backups, restores, notifications or failovers were executed.
