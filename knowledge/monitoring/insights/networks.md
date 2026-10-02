# Network Insights topology, health, and traffic

Topic ID: monitoring.insights.networks

Objectives: mo-05

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Inspect relationships

Network Insights presents deployed topology, network resource health, metrics,
and alerts. Open Azure Monitor's network view and choose subscription/group/type
filters. Use topology to identify related resources, then drill into the resource
view and diagnostic toolkit.
[Network Insights](https://learn.microsoft.com/en-us/azure/network-watcher/network-insights-overview).

The inventory/topology view does not require configuring every traffic collector.
Continuous connection tests, flow logs, and traffic analytics need their own
configuration. Use read/monitoring permissions at the selected scopes; collector
changes require additional write permissions.
[Network Watcher capabilities](https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-overview).

## Verify and diagnose

Select the incident time window and relevant frontend/backend resource.
Correlate health and metrics with actual client failures, then use the tool
suited to the hypothesis. A topology line means a resource relationship, not
proof a guest listener or NSG permits the application flow.
[Views](https://learn.microsoft.com/en-us/azure/network-watcher/network-insights-overview).

Example: investigate a failing load-balancer application by locating frontend,
pool, VNet, and VM relationships, then checking probe and client port behavior.
See [load-balancer diagnosis](../../networking/load-balancer/troubleshooting.md).

## Limitations and maintenance

Do not assume the dashboard automatically creates Connection Monitor tests.
Point-in-time Connection troubleshoot and continuous Connection Monitor serve
different purposes. NSG flow logs are retiring and no longer accept new
creation; use VNet flow logs for new traffic-logging designs.
[Current traffic guidance](https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-overview).

Review collector/storage/analytics costs before enabling traffic views. Remove
unused tests and flow-log settings without deleting records still needed for
analysis or retention. Filter scope carefully if a resource appears missing.

[Question data](../../../questions/monitoring/monitoring-insights-networks.json).
