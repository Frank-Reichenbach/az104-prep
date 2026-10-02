# VNet flow logs and traffic analytics

Topic ID: monitoring.network.flow-logs

Objectives: mo-06

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Record traffic metadata

VNet flow logs record IP-flow metadata such as addresses, ports, protocol,
direction, flow state, and packet/byte counts. They are not a packet-payload
capture or a record of application authentication outcomes.
[Flow format](https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-overview).

NSG flow logs no longer support new creation and retire September 30, 2027.
Microsoft recommends migration to VNet flow logs. Existing stored records
follow their retention policy after the logging-resource retirement.
[Retirement notice](https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-overview).

## Configure and verify

With suitable flow-log/network, destination storage, and optional workspace
permissions, register Microsoft.Insights if needed. Open **Network Watcher →
Flow logs → Create**, choose VNet flow logging and target, storage destination,
and retention. Optionally enable traffic analytics and choose a Log Analytics
workspace/processing interval.
[Management procedure](https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-manage).

Generate a known flow and check new log blobs for the corresponding five-tuple.
For traffic analytics, allow processing time and inspect the selected
workspace. Logging and analytics are separate stages; a log blob does not prove
the analytics pipeline has processed it.

## Limitations and cleanup

Review supported targets, destination networking, and overlap with other
flow-log configurations before enabling collection broadly. Retention 0 means
indefinite retention until removal, not zero-day deletion. Storage, logging,
and analytics can have separate costs.
[Retention settings](https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-manage).

Example: use a flow record to locate a denied TCP connection, then use the
[diagnostic sequence](../../networking/virtual-networks/troubleshooting.md) to
explain its rule/path. For payload investigation, choose a supported packet
capture workflow. Disable obsolete collectors without deleting retained
incident evidence accidentally.

[Question data](../../../questions/monitoring/monitoring-network-flow-logs.json).
