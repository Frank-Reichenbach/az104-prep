# Azure Monitor Agent and data collection rules

Topic ID: monitoring.logs.agent-dcr

Objectives: mo-02

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Collect guest telemetry

Azure Monitor Agent (AMA) uses data collection rules (DCRs) to select sources,
destinations, and supported transformations. A DCR association applies the
configuration to a machine. Merely creating a workspace or installing the
agent does not select every guest log automatically.
[DCR model](https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/data-collection-rule-overview).

## Implement

Use the supported AMA workflow for Azure VMs or Azure Arc machines. Configure
a managed identity, install the agent extension, then create a DCR with
Windows events, Linux Syslog, or supported performance counters and a workspace
destination. Associate the intended machines. Use authorized extension,
identity, DCR/association, and destination operations; avoid assuming workspace
read access lets you change agents.
[Agent management](https://learn.microsoft.com/en-us/azure/azure-monitor/agents/azure-monitor-agent-manage).

For Syslog, select facilities and severity thresholds, verify the guest's
Syslog daemon forwards messages to the agent, and inspect the Syslog table.
[Syslog procedure](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/data-collection-syslog).

## Verify and troubleshoot

Check extension health, machine identity, DCR association, destination, and
network access to ingestion endpoints. Generate a known event; query the
appropriate table using its time and computer name. Heartbeat can establish
agent communication but does not prove your chosen event filter collects
the desired records.
[VM collection](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/data-collection).

Example: collect only required auth facility severities rather than every
Syslog message. Check other DCRs before adding overlapping sources; duplicated
collection can increase ingestion and costs. A data collection endpoint may
be needed for particular network/private-link designs; it is not universally
required for every public ingestion scenario.

Remove associations before retiring collection and check remaining users of
a shared DCR. See [resource diagnostics](diagnostic-settings.md) for service
logs rather than guest logs.

[Question data](../../../questions/monitoring/monitoring-logs-agent-dcr.json).
