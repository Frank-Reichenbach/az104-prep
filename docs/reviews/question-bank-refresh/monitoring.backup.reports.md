# Azure Backup reports and diagnostic data review

Topic: `monitoring.backup.reports`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-backup-reports.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-reports-pipeline | Revise, revision 2 | Foundation data path | Replace NSG padding with metric-versus-log collection distinction. Key `a`. |
| mo-reports-delay | Revise, revision 2 | Troubleshooting delayed visibility | Replace deletion/Bastion padding with job and partial-day assumptions. Key `c`. |
| mo-reports-retention | Revise, revision 2 | Applied retention configuration | Define future 90-day queryable history; replace SKU/email padding with time-picker/soft-delete mistakes. Key `b`. |

## Evidence and acceptance

[Reporting](https://learn.microsoft.com/en-us/azure/backup/configure-reports)
uses logs/workbooks, allows initial delivery delay, omits current partial-day
records and documents filter checks. These support all timing interpretations.
[Diagnostic events](https://learn.microsoft.com/en-us/azure/backup/backup-azure-diagnostic-events)
describes exporting reporting records, distinct from guest heartbeat, metric
charts or backup disk content. [Log retention](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/data-retention-configure)
controls queryable table data. Widening the time picker, backup retention or
soft-delete retention does not extend that log lifetime.

The retention question is prospective and does not promise recovery of
already expired logs. Queryable retention is explicit; merely archiving data
without the workbook's query path is not assumed sufficient. Current partial-day
exclusion is an expected reporting boundary, not proof that diagnostics failed.

Each item has exactly one complete answer; no joint sets or family variants
occur in this topic. Every distractor fails a stated requirement or documented
behavior, as detailed above and in its rationale. The displayed topic title
(`Azure Backup reports and diagnostic data`) supplies context, not the requested
configuration, outcome or evidence distinction. Stable IDs and families remain.
The table records the reasoning level and necessary repairs; retained wording
is independently checked against the cited source within this author-led review.
Build/check, all 13 tests, static-site/internal links, ledger hashes and whitespace
checks validate structure and behavior separately from Azure technical review.
No Azure deployments, backups, restores, notifications or failovers were executed.
