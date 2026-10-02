# Alert rules, signals, and evaluation

Topic ID: monitoring.alerts.rules

Objectives: mo-04

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Match the signal

Use metric alerts for supported numeric time series, log search alerts for
query-based conditions, and Activity Log alerts for management events such as
a resource deletion. An alert rule evaluates a condition; an action group
defines responses.
[Alert types](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-types).

## Configure

With Monitoring Contributor or equivalent rule write and resource read
permissions, open **Alerts → Create → Alert rule**. Select scope, signal,
condition, dimensions, evaluation window/frequency, severity, and action groups.
For metrics, choose a supported aggregation and static or supported dynamic
threshold. A five-minute evaluation window and one-minute frequency mean
evaluate the previous five minutes each minute.
[Metric rule setup](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-create-metric-alert-rule).

## Verify and troubleshoot

Review rule enabled state and telemetry availability. Trigger a controlled
condition, inspect fired/resolved alert instances, then verify notification
delivery separately. Alert state and user response state serve different
purposes; acknowledging an alert does not repair the monitored resource.
Stateful/stateless behavior varies by alert type/configuration.
[Alert lifecycle](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview).

Example: detect sustained average CPU above a threshold, rather than assuming
a single spike must fire an average-window rule. For failed delivery, distinguish
rule evaluation from action-group/processing-rule effects.

Choose actionable thresholds and account for expected load to reduce noise.
Review per-rule/time-series/log-query costs. Disable/delete temporary rules
after testing, preserving production coverage. See
[metrics interpretation](../metrics/analysis.md).

[Question data](../../../questions/monitoring/monitoring-alerts-rules.json).
