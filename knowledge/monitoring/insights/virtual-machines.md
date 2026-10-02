# VM Insights and enhanced guest monitoring

Topic ID: monitoring.insights.vms

Objectives: mo-05

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Host versus guest evidence

Host CPU/network/disk metrics are collected automatically. Guest memory,
processes, and guest logs require additional collection. Current VM monitoring
offers OpenTelemetry metrics, recommended for new deployments, and classic
logs-based metrics. The April 2026 outline names Insights; these newer workflow
details support that objective rather than add a new one.
[Current VM monitoring](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/monitor-vm).

## Enable and verify

With extension, DCR/association, and destination permissions, open the VM's
monitoring view and enable enhanced monitoring. Choose an Azure Monitor workspace
for the supported OpenTelemetry metrics experience, or a Log Analytics workspace
for classic log-based metrics/logs. Configure AMA, DCR, and machine association.
[Enablement](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/vm-enable-monitoring).

Inspect guest charts and a known counter after ingestion. For classic collection,
verify the InsightsMetrics stream rather than assuming a generic performance
DCR lights up every Insights view. Do not alter the predefined classic DCR
arbitrarily.
[Portal procedure](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/tutorial-enable-monitoring).

## Limitations and migration

The Dependency Agent and VM Insights Map are deprecated and retire June 30,
2028. Microsoft says not to enable them for new deployments; new portal VM
onboarding to that feature stopped September 30, 2025. Legacy documentation
about requiring Dependency Agent for all monitoring is therefore misleading.
[Map notice](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/vminsights-maps).

Example: investigate a high-load VM with host CPU first, then guest memory and
disk counters. If guest charts are empty, inspect identity, extension health,
DCR association, selected destination, and collection availability.
Review ingestion/retention costs and remove unused associations after a lab
without disabling shared collection.
See [AMA/DCR](../logs/agent-dcr.md).

[Question data](../../../questions/monitoring/monitoring-insights-vms.json).
