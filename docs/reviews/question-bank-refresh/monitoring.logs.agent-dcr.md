# Azure Monitor Agent and data collection rules review

Topic: `monitoring.logs.agent-dcr`; objective: `mo-02`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-logs-agent-dcr.json.

| ID | Decision | Pattern / difficulty | Defect and key |
| --- | --- | --- | --- |
| mo-dcr-association | Revise, revision 2 | Troubleshooting absent target association | Replace DNS/retention padding with plausible association, group, duplicate-rule and destination actions. Key `a`. |
| mo-dcr-heartbeat | Revise, revision 2 | Troubleshooting observed missing event selection | Supply healthy communication, local event, correct query and System-only filter. Key `b`. |
| mo-dcr-sources | Revise, revision 2 | Foundation rule/association mapping | Title originally supplied DCR answer; compare meanings within the named collection system. Key `c`. |

## Evidence and acceptance

[DCR model](https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-rule-overview)
supports sources, destinations and explicit resource associations. Group
membership, unassociated copies, and changed destinations cannot substitute
for the missing association. It traces the retained configuration concept
and reversed relationship/deployment/storage misconceptions.

[VM collection](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/data-collection)
supports association, Heartbeat versus source-specific verification, and Event
table placement. [Windows events](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/data-collection-windows-events)
supports selecting event logs and filters. The question uses AMA Windows-event
collection into Event, not a Sentinel connector routing to SecurityEvent.
Reinstallation, retention and query-range changes retain the excluded source.
[Syslog](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/data-collection-syslog)
supports the first question’s configured Linux source and workspace path.

Each item has exactly one complete action/assertion; no joint sets or variants.
The rendered agent/DCR title does not supply target association, filter repair,
or rule/association mapping. Stable IDs/families remain. General DCR limits
and optional DCE/private-link designs are not tested as unconditional claims.
Author-led source review is distinct from build/check, 13 tests, site links,
hash and whitespace validation. No agents or Azure resources were configured.
