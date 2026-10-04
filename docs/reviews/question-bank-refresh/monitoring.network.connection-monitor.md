# Network Watcher and continuous Connection Monitor review

Topic: `monitoring.network.connection-monitor`; objective: `mo-06`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-network-connection-monitor.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-connection-continuous | Revise, revision 2 | Applied complete configuration | Displayed topic named the former tool answer; now require endpoints, matching protocol/port and enabled recurring tests. Key `a`. |
| mo-connection-test | Revise, revision 2 | Foundation component distinction | Replace unrelated DNS/RBAC/snapshot choices with actual monitor components. Key `b`. |
| mo-connection-port | Revise, revision 2 | Troubleshooting protocol mismatch | Replace ambiguous TCP/HTTP health claim and TXT padding with distinct protocol/port configurations. Key `c`. |

## Evidence and acceptance

[Overview](https://learn.microsoft.com/en-us/azure/network-watcher/connection-monitor-overview)
defines endpoints, configurations, groups and individual tests, including
disabled-group behavior and stored monitoring history.
[Portal configuration](https://learn.microsoft.com/en-us/azure/network-watcher/connection-monitor-create-using-portal)
documents group membership and protocol, port and frequency settings.
Together these support every option's membership, enablement and protocol/port
boundary. The extension is given as installed; no installation ambiguity is scored.
TCP success is distinguished from correct HTTP responses. The known legacy
on-premises agent wording in the portal guide is not used for a scored claim.

All three have exactly one complete answer, no joint sets or variants. The
actual title names Connection Monitor but supplies none of the requested
configuration or component distinctions. Stable IDs and families remain;
the original difficulty levels match the rewritten decisions. Author-led
source review is separate from build/check, 13 tests, site-link, hash and
whitespace checks. No Azure monitoring tests were executed.
