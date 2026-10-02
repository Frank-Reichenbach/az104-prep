# Azure Backup alerts and notification routing

Topic ID: monitoring.backup.alerts

Objectives: mo-13

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Detection and notifications

Azure Backup generates built-in Azure Monitor alerts for supported critical/security events and job failures. Job-failure alerting has configurable vault monitoring settings; destructive-operation alerts have different behavior. An alert existing does not prove that email or another notification was sent. Route notifications through an alert processing rule and an action group. [Backup alerts](https://learn.microsoft.com/en-us/azure/backup/backup-azure-monitoring-alerts).

## Implementation and verification

**Example, not executed:** check the vault's monitoring settings, enable the intended Azure Monitor job-failure alerts, create an email action group, and add an alert processing rule scoped to the relevant vaults. Check rule filters, enabled state, and schedules; test the action group, then verify routing using a suitable actual alert. [Backup alerts](https://learn.microsoft.com/en-us/azure/backup/backup-azure-monitoring-alerts); [action group testing](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups).

Microsoft recommends using Azure Monitor rather than continuing duplicate classic-alert notifications. For the guided migration, the documentation requires Backup Contributor and Monitoring Contributor at subscription scope. Apply permissions appropriate to your actual configuration operations rather than assuming Backup Reader can create monitoring resources. [Backup alerts](https://learn.microsoft.com/en-us/azure/backup/backup-azure-monitoring-alerts).

## Maintenance and limitations

A suppression rule suppresses alert actions during a matching window; it does not fix the failed backup or stop the underlying alert from existing. Review unresolved alerts and job errors after maintenance. [Processing rules](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules).

Custom log alerts need the relevant diagnostic data and tolerate ingestion delay; metric alerts suit supported backup health signals. Notification charges and limits depend on Azure Monitor. Keep historical [reporting](reports.md) separate from incident detection. [Backup alerts](https://learn.microsoft.com/en-us/azure/backup/backup-azure-monitoring-alerts).

An acknowledged/closed alert is an administrative state, not evidence that a recovery point was created. Verify the underlying backup job and protected item's state before considering the incident resolved. See [general alert rules](../alerts/rules.md) and [action groups](../alerts/action-groups.md).

[Question data](../../../questions/monitoring/monitoring-backup-alerts.json).
