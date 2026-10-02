# KQL filtering, aggregation, and interpretation

Topic ID: monitoring.logs.kql

Objectives: mo-03

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Query the right data

Kusto Query Language (KQL) pipelines pass each operator's result to the next.
Start with a known table, filter time and relevant rows, then select columns
or aggregate. Use the schema's exact table/column case. Query permissions such
as those in Log Analytics Reader are required at the relevant scope.
[Query fundamentals](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/get-started-queries).

## Example

This documentation example counts collected Syslog messages per computer in
five-minute intervals; it has not been executed against Azure:

```kusto
Syslog
| where TimeGenerated > ago(1h)
| summarize Messages=count() by Computer, bin(TimeGenerated, 5m)
| order by TimeGenerated desc
```

The output has one row per observed computer/time-bin combination.
summarize aggregates rows; project chooses columns; where filters rows.
A missing bin is not necessarily a zero count or healthy service.
[Aggregation semantics](https://learn.microsoft.com/en-us/kusto/query/summarize-operator).

## Verify and troubleshoot

Open workspace **Logs**, inspect a small table sample, check scope/time range,
and run the query. Compare counts with a known generated event. take returns
an arbitrary sample; use top/sort when order matters. If a required column is
projected out before a later filter, that filter cannot reference it.
[Operators](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/get-started-queries).

Check the portal time picker as well as the query. An empty result can mean
wrong workspace/table, overly narrow time/filter, missing ingestion, or
insufficient scope. It does not establish that nothing happened.
[Log Analytics workflow](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/log-analytics-tutorial).

Prefer explicit tables and early filters over an unnecessary workspace-wide
search. Review query/table-plan costs before routine broad scans. Save useful
queries; remove temporary exports containing operational data after use.
See [collection configuration](agent-dcr.md).

[Question data](../../../questions/monitoring/monitoring-logs-kql.json).
