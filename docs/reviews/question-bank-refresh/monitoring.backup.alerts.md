# Azure Backup alerts and notification routing review

Topic: `monitoring.backup.alerts`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-backup-alerts.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-backup-notifications | Revise, revision 2 | Troubleshooting routing scope | Make generated alert and healthy receiver known; diagnose processing scope instead of NIC/report padding. Key `d`. |
| mo-backup-suppression | Revise, revision 2 | Foundation action boundary | Retain sound options and key; correct applied label for a direct suppression behavior distinction. Key `a`. |
| mo-backup-custom-logs | Revise, revision 2 | Applied complete collection change | Require queried-workspace ingestion while preserving existing export; replace IP padding with plausible response/retention/destructive replacement mistakes. Key `b`. |

## Evidence and acceptance

[Backup alerts](https://learn.microsoft.com/en-us/azure/backup/backup-azure-monitoring-alerts)
separates alert generation from processing-rule/action-group routing and custom
log ingestion. [Processing rules](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules)
apply actions to matching scope/filter/schedule and suppress notifications
without repairing backup jobs, deleting alert history or stopping backups.
[Action groups](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups)
provide notification responses, not backup-log collection. These support every
routing and retained suppression rationale.
[Backup logs](https://learn.microsoft.com/en-us/azure/backup/backup-azure-monitoring-use-azuremonitor)
requires diagnostic records for log queries. [Diagnostic settings](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings)
allows separate settings for multiple same-type destinations. Retention and
response configuration cannot substitute for export into the query workspace.

The routing repair concerns future matching alerts and assumes the edited
rule becomes effective, not retroactive notification. The collection answer is
one complete change preserving both destinations; ingestion delay still applies.
No claim equates an action-group sample test with successful real-alert routing.

Each item has exactly one complete answer; no joint sets or family variants
occur in this topic. Every distractor fails a stated requirement or documented
behavior, as detailed above and in its rationale. The displayed topic title
(`Azure Backup alerts and notification routing`) supplies context, not the requested
configuration, outcome or evidence distinction. Stable IDs and families remain.
The table records the reasoning level and necessary repairs; retained wording
is independently checked against the cited source within this author-led review.
Build/check, all 13 tests, static-site/internal links, ledger hashes and whitespace
checks validate structure and behavior separately from Azure technical review.
No Azure deployments, backups, restores, notifications or failovers were executed.
