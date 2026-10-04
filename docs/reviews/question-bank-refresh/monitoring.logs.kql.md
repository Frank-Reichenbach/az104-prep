# KQL filtering, aggregation, and interpretation review

Topic: `monitoring.logs.kql`; objective: `mo-03`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-logs-kql.json.

| ID | Decision | Pattern / difficulty | Defect and key |
| --- | --- | --- | --- |
| mo-kql-summarize | Revise, revision 2 | Foundation aggregation interpretation | Sound stem/options retained; applied label overstated direct operator recognition, changed to foundation and focused source. Key `a`. |
| mo-kql-take | Revise, revision 2 | Foundation complete query selection | Replace padded yes/no with four comparable valid queries and distinct timestamps. Key `b`. |
| mo-kql-empty | Revise, revision 2 | Troubleshooting observed workspace mismatch | Replace vague check-two plus bogus choices with known ingestion/filter evidence and one scope repair. Key `a`. |

## Evidence and acceptance

[summarize](https://learn.microsoft.com/en-us/kusto/query/summarize-operator)
supports one output group per Computer with count, rather than raw rows,
latest selection, or grouping by message text. [take](https://learn.microsoft.com/en-us/kusto/query/take-operator),
[top](https://learn.microsoft.com/en-us/kusto/query/top-operator), and
[arg_max](https://learn.microsoft.com/en-us/kusto/query/arg-max-aggregation-function)
support each complete query's result. Distinct timestamps exclude tied-boundary
ordering ambiguity; no query deletion behavior is invented.

[Scope](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/scope)
supports workspace-scoped searches. The verified ingestion and matching
filters rule out collection, time-range, and Computer-filter repairs as ways
to retrieve this stored event from the wrong workspace. [VM collection](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/data-collection)
supports source-table verification; no ingestion latency guarantee is tested.
An attempted where-operator page was unavailable; no new scored claim relies
on that page. Existing filtering facts are explicitly supplied in the scenario.

Exactly one complete result/query/action satisfies each stem. The former
multiple-answer item is revisioned with its new selection count. No variants.
Rendered KQL/filtering/aggregation title does not identify query ordering,
result grouping, or correct workspace. Stable IDs/families remain. Author-led
technical review is separate from build/check, 13 tests, site links, hashes
and whitespace validation. Queries were not executed against an Azure workspace.

The bare take/top URLs initially failed in the browser tool; their Microsoft
Fabric view pages were retrieved and checked successfully. Both explicitly
apply to Azure Monitor. No unresolved source-access claim remains.
