# Azure Monitor metric aggregation and dimensions review

Topic: `monitoring.metrics.analysis`; objective: `mo-01`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-metrics-analysis.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-metric-peak | Revise, revision 2 | Applied aggregation/time-grain mapping | Replace title/unsupported aggregation padding with four chart configurations; specify supported one-minute Maximum. Key `a`. |
| mo-metric-split | Revise, revision 2 | Applied dimension/series-limit configuration | Replace resource-lock padding with filtering/splitting and explicit all-worker count. Key `b`. |
| mo-metric-count | Keep, revision 1 | Foundation numeric interpretation | Count 3, Sum 20, Maximum 10; Average is 20/3. Key `c`. |

## Evidence and acceptance

[Metrics explorer](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/analyze-metrics)
supports chart time grain, supported aggregations, filtering, splitting, and
display limits. Wrong peak alternatives average, group too coarsely, or only
change displayed range. Wrong worker alternatives exclude workers, combine
them, or truncate the split. [Aggregation](https://learn.microsoft.com/en-us/azure/azure-monitor/metrics/metrics-aggregation-explained)
supports maximum versus average and sample count versus sum. All four
retained numeric assertions are independently evaluated against three values.
Only the supplied count/sum assertion is true.

Smaller chart intervals cannot recover uncollected sub-minute measurements;
the question asks for highest collected values, not true instantaneous peaks.
Each question has one complete configuration/assertion; no joint sets or
variants. Actual aggregation/dimensions title does not give the required
setting pair, series limit, or arithmetic. Stable IDs and families remain.
Author-led review is separate from build/check, 13 tests, site links, hashes
and whitespace validation. No monitoring configuration or Azure test ran.
