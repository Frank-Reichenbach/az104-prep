# Alert rules, signals, and evaluation review

Topic: `monitoring.alerts.rules`; objective: `mo-04`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-alerts-rules.json.

| ID | Decision | Pattern / difficulty | Defect and key |
| --- | --- | --- | --- |
| mo-alert-signal | Revise, revision 2 | Applied operation/status condition | Replace weak signal-feature alternatives with complete management-event filters and completion requirement. Key `a`. |
| mo-alert-window | Revise, revision 2 | Applied numeric setting interpretation | Replace deletion/notification padding with four timing/window mappings. Key `b`. |
| mo-alert-ack | Revise, revision 2 | Foundation condition/response mapping | Replace yes/no padding with four comparable state pairs. Key `c`. |

## Evidence and acceptance

[Activity rule setup](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-create-activity-log-alert-rule)
and [Activity Log schema](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/activity-log-schema)
support Administrative events, operation-name/status filters, and success
versus start/failure. The scenario fixes resource scope; no unrelated resource
or operation can meet its delete-completion requirement.

[Metric rule setup](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-create-metric-alert-rule)
supports check frequency versus lookback. Each timing alternative is evaluated
against both settings. These do not promise firing or a notification each
minute: threshold and state behavior remain separate.

[Lifecycle overview](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview)
supports independent system condition and operator response. A continuing
breach remains Fired; acknowledgement selects Acknowledged, not Closed.
The other complete pairs violate one or both supplied facts; no automatic
remediation is inferred from acknowledgement.

One full configuration/interpretation/pair satisfies each stem. No joint sets
or variants. The rendered rules/signals/evaluation title does not supply the
operation/status values, timing mapping, or state pair. Stable IDs/families
remain. Author-led source review is distinct from build/check, 13 tests, site
links, hashes and whitespace checks. No alert rule or Azure lab was executed.
