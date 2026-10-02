# Azure Backup reports and diagnostic data

Topic ID: monitoring.backup.reports

Objectives: mo-13

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Implementation

Azure Backup reporting uses Azure Monitor Logs and workbooks for historical jobs, policies, usage, and trends. Select a Log Analytics workspace, configure vault diagnostic settings to send the required reporting categories, then open Backup Reports and select workspace, vault, and time filters. A workspace's location/subscription can differ from the vault's. [Configure reports](https://learn.microsoft.com/en-us/azure/backup/configure-reports).

**Example, not executed:** consolidate reporting from two vaults into one workspace and compare completed backup jobs across the last month. Choose supported diagnostic categories for each vault type; a vault existing in Azure does not mean its reporting logs have been exported. [Configure reports](https://learn.microsoft.com/en-us/azure/backup/configure-reports).

## Verification and timing

Check diagnostic delivery, reporting filters, and workspace/table retention. The initial data push can take up to 24 hours, and reports omit the current partial day. Microsoft recommends starting report review two days after configuring diagnostics. Use operational job views and [alerts](alerts.md) for timely incident handling. [Configure reports](https://learn.microsoft.com/en-us/azure/backup/configure-reports).

## Permissions and limitations

Configuring diagnostic settings requires write access to the source settings and appropriate access to the destination. Viewing reports requires access to their underlying log data. Follow [diagnostic settings permissions](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings) and the workspace access model in [KQL analysis](../logs/kql.md).

Log retention controls how long reporting data remains available; a backup retention policy controls recovery-point retention. Adjusting either does not automatically change the other. Ingestion/retention can incur Azure Monitor charges. [Configure reports](https://learn.microsoft.com/en-us/azure/backup/configure-reports).

Microsoft recommends the Logs/workbook approach over the older Power BI template path. Report support and diagnostic categories depend on workload and vault type; do not assume every operational job type appears in every historical report. [Configure reports](https://learn.microsoft.com/en-us/azure/backup/configure-reports).

[Question data](../../../questions/monitoring/monitoring-backup-reports.json).
