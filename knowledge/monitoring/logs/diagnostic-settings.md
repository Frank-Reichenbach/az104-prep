# Resource logs and diagnostic settings

Topic ID: monitoring.logs.diagnostic-settings

Objectives: mo-02

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Choose the collection path

Platform metrics and the Activity Log are collected automatically. Resource
logs generally need diagnostic settings. Guest OS logs use an agent/data
collection rule instead. Choose only categories required for investigation or
compliance to control ingestion costs.
[Diagnostic settings](https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/diagnostic-settings).

## Implement

Create the destination first: a Log Analytics workspace for queries, Storage
for archives, or Event Hubs for streaming. With diagnostic-setting write
permissions and appropriate destination access, open the resource's
**Diagnostic settings → Add**. Select categories/category groups, destinations,
and save. A setting can have one destination of each type; use another setting
for a second workspace. A resource supports up to five settings.
[Destination rules](https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/diagnostic-settings).

For a regional resource, Storage/Event Hubs destinations must match its region.
Restricted destination networks may require the documented trusted-services
exception. Resource-specific subservices can expose separate categories, so
inspect the correct scope.
[Platform export](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/resource-logs).

## Verify and maintain

Generate a relevant service operation, allow ingestion time, and query the
documented table at the correct workspace/time scope. Tables can appear only
after the first records arrive. Lack of rows can mean no event was generated,
wrong categories/scope, or destination access failure.

Example: collect a storage service's read/write/delete logs into a workspace,
then query a known request. This does not capture every guest OS event on a VM.
Use [metrics analysis](../metrics/analysis.md) for numeric telemetry.

Before deleting/moving/recreating a monitored resource, review/remove obsolete
diagnostic settings. Exported logs have destination retention and storage costs;
configure those explicitly rather than assuming export means permanent,
free retention.
[Lifecycle guidance](https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/diagnostic-settings).

[Question data](../../../questions/monitoring/monitoring-logs-diagnostic-settings.json).
