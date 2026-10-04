# VNet flow logs and traffic analytics review

Topic: `monitoring.network.flow-logs`; objective: `mo-06`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-network-flow-logs.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-flow-payload | Revise, revision 2 | Foundation evidence interpretation | Replace padded yes/no and private-key claims with related evidence distinctions. Key `a`. |
| mo-flow-retention | Revise, revision 2 | Foundation setting interpretation | Specify supported destination and absence of other deletion; correct applied label for direct documented behavior. Key `b`. |
| mo-flow-analytics | Revise, revision 2 | Troubleshooting saved configuration | Make disabled analytics decisive; replace DNS/disk padding with collection, retention and workspace mistakes. Key `c`. |

## Evidence and acceptance

[Flow format](https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-overview)
supports endpoint and volume fields; application payload, HTTP response codes
and authenticated users are absent from that schema. This is a metadata boundary,
not a claim that every supported service or packet is logged.
[Management](https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-manage)
documents zero retention for Standard GPv2, enabled state separately, and analytics
enablement, workspace selection and processing interval.
[Analytics](https://learn.microsoft.com/en-us/azure/network-watcher/traffic-analytics)
describes processing raw flows into workspace data. These support all retention
and configuration rationales; changing raw retention/destination cannot enable
the disabled processing stage. A selected workspace is a required destination,
not interchangeable with any workspace.

Each item has one complete answer; no joint sets or variants. The actual
flow-logs/analytics title does not identify a metadata field, retention meaning
or complete destination configuration. IDs/families remain stable. Known NSG
retirement is not used as a new exam objective. Source review is author-led,
separate from build/check, 13 tests, site links, hashes and whitespace checks.
No Azure logging or processing configurations were executed.
