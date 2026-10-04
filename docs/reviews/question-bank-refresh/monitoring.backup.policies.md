# Backup schedules, retention, and policy selection review

Topic: `monitoring.backup.policies`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-backup-policies.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-policy-frequency | Revise, revision 2 | Applied complete schedule | Replace tags/NSG padding with interval and schedule-versus-retention mistakes. Key `a`. |
| mo-policy-retention | Revise, revision 2 | Foundation tier distinction | Replace DNS/name padding with adjacent schedule and snapshot settings. Key `b`. |
| mo-policy-job | Revise, revision 2 | Troubleshooting evidence selection | Replace padded binary with actual failed-job verification. Key `c`. |

## Evidence and acceptance

[Enhanced policy](https://learn.microsoft.com/en-us/azure/backup/backup-azure-vms-enhanced-policy)
documents four-hour scheduling, the daily/interval distinction, snapshot versus
vaulted retention, and a configurable schedule window.
[VM enrollment](https://learn.microsoft.com/en-us/azure/backup/backup-azure-arm-vms-prepare)
documents schedule and retention configuration.
[Management](https://learn.microsoft.com/en-us/azure/backup/backup-azure-manage-vms)
provides backup-job and recovery-point inspection. These sources support every
schedule, retention and evidence rationale. Job failure is not assumed to
prove that every possible point is absent; the task asks for actual verification.

The four-hour question requests recovery snapshots, not six daily vaulted
transfers. Frequency-dependent snapshot-retention limits and conflicting
Standard/Enhanced migration wording remain documented and unscored.

Each item has exactly one complete answer; no joint sets or family variants
occur in this topic. Every distractor fails a stated requirement or documented
behavior, as detailed above and in its rationale. The displayed topic title
(`Backup schedules, retention, and policy selection`) supplies context, not the requested
configuration, outcome or evidence distinction. Stable IDs and families remain.
The table records the reasoning level and necessary repairs; retained wording
is independently checked against the cited source within this author-led review.
Build/check, all 13 tests, static-site/internal links, ledger hashes and whitespace
checks validate structure and behavior separately from Azure technical review.
No Azure deployments, backups, restores, notifications or failovers were executed.
