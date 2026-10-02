# Network Watcher and continuous Connection Monitor

Topic ID: monitoring.network.connection-monitor

Objectives: mo-06

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Select a tool

Network Watcher includes point-in-time diagnostics and ongoing monitoring.
Connection troubleshoot investigates now; Connection Monitor repeatedly measures
reachability, failed-check percentage, and round-trip time. IP flow verify and
Next hop answer narrower filtering/routing questions.
[Capabilities](https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-overview).

## Configure continuous tests

With authorized Network Watcher/monitor write, source extension, and workspace
operations, create a connection monitor in the source region. Choose workspace,
source/destination endpoints, protocol/port, frequency, and thresholds. Test
groups associate endpoints with test configurations.
[Portal procedure](https://learn.microsoft.com/en-us/azure/network-watcher/connection-monitor-create-using-portal).

Azure VM/scale-set sources use the Network Watcher extension; portal creation
can enable it automatically. Current on-premises source monitoring uses
Arc-enabled hosts and AMA. A destination does not generally require the source
monitoring extension. Do not reuse the deprecated classic Connection Monitor
or legacy Log Analytics agent path.
[Current agents](https://learn.microsoft.com/en-us/azure/network-watcher/connection-monitor-overview).

## Verify and troubleshoot

Test the real application protocol/port. Review failed-check percentage and
latency over the incident period, then inspect hops/issues. Source-agent health,
DNS, guest firewalls, NSGs, route selection, and destination listeners can all
affect results. A successful ICMP test is not proof TCP 443 succeeds.
[Interpretation](https://learn.microsoft.com/en-us/azure/network-watcher/connection-monitor-overview).

The portal guide still contains legacy on-premises agent wording in one section;
the overview explicitly excludes that legacy agent. This guide follows the
overview and does not score the stale installation instructions.

Example: monitor app-VM → service TCP 443 every minute with an agreed latency
threshold. Review test and workspace costs; delete unused tests and retain
logs according to policy. See
[connectivity diagnosis](../../networking/virtual-networks/troubleshooting.md).

[Question data](../../../questions/monitoring/monitoring-network-connection-monitor.json).
