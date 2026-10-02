# Azure Monitor metric aggregation and dimensions

Topic ID: monitoring.metrics.analysis

Objectives: mo-01

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Interpret a time series

Metrics are numeric measurements over time. Platform metrics describe Azure
resources; guest measurements can require extra collection. A chart's scope,
metric namespace, aggregation, time grain, and dimensions determine what it
shows.
[Metrics explorer](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/analyze-metrics).

Average smooths values, Maximum exposes peaks, and Sum totals supported values
during each interval. Count counts measurements and is not automatically equal
to the sum of their measured values. Only supported aggregations are available.
[Aggregation](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/metrics-aggregation-explained).

## Configure and verify

With metric read permissions, open resource **Metrics**, select namespace and
metric, then the incident time window and aggregation. Use a smaller time grain
to investigate short spikes. Filter dimensions to a subset; split dimensions
to compare separate series. For supported multi-resource charts, resources must
share subscription, region, and type.
[Chart procedure](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/analyze-metrics).

Example: compare average CPU with maximum CPU over one-minute intervals.
For a metric exposing an instance dimension, split by instance to find a hot
worker hidden by the combined average. Ensure units and time zones align before
comparing charts.
[Display semantics](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/metrics-aggregation-explained).

## Limitations and diagnosis

Missing points are not automatically zero; check data collection, resource
activity, scope, and available dimensions. Do not infer a percentile from a
maximum. A changed chart does not change collection or alert configuration.
Pin a chart when useful; remove obsolete dashboards during cleanup.
Log ingestion, custom metrics, and alert rules can have separate costs.

Most standard Azure metrics retain 93 days, with a 30-day single-chart query
window; verify the particular metric rather than assuming all metric stores
share those limits.
[Retention note](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/analyze-metrics).

[Question data](../../../questions/monitoring/monitoring-metrics-analysis.json).
