# Network Insights topology, health, and traffic review

Topic: `monitoring.insights.networks`; objective: `mo-05`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-insights-networks.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-network-topology | Keep, revision 1 | Foundation evidence boundary | Resource relationship does not establish listeners, guest login, or configured recurring tests. Key `a`. |
| mo-network-continuous | Revise, revision 2 | Applied capability selection | Replace cosmetic/lock padding with point diagnostic, routing, and filtering alternatives. Key `b`. |
| mo-network-flow-new | Revise, revision 2 | Applied supported traffic collection | Compare logging, synthetic tests and per-VM capture under explicit VNet-wide scope. Key `c`. |

## Evidence and acceptance

[Network Insights](https://learn.microsoft.com/en-us/azure/network-watcher/network-insights-overview)
supports topology relationships, separately configured Connection Monitor
tests and access to diagnostics. [Network Watcher](https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-overview)
distinguishes recurring monitoring, current diagnostics, route lookup, filtering
and packet capture. Those boundaries support every retained topology rationale
and all continuous-monitoring alternatives. [Connection Monitor](https://learn.microsoft.com/en-us/azure/network-watcher/connection-monitor-overview)
supports recurring TCP checks and round-trip history.

[VNet flow logs](https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-overview)
supports VNet-scoped observed flow data and Storage.
[NSG flow logs](https://learn.microsoft.com/en-us/azure/network-watcher/nsg-flow-logs-overview)
confirms that new NSG flow-log creation is unsupported and retirement is
September 30, 2027. Synthetic test results and a one-VM capture do not replace
the requested collection scope. Detailed flow-log traffic exclusions remain;
the item does not promise every packet payload or every service flow.

Each item has one complete alternative; no joint sets/variants. Real topology/
health/traffic title does not select capability or configuration, and the
retained relationship item tests what evidence means within that context.
Stable IDs/families remain. Current replacement detail supports the existing
objective without inventing a new one. Author-led technical review is separate
from build/check, 13 tests, site links, hashes and whitespace checks. No network
tests, flow-log settings, notifications or Azure resources were executed.
