# Diagnosing VNet connectivity review

Topic: `networking.vnets.troubleshooting`; objective: `nw-05`.
Verified: 2026-10-04. Source: questions/networking/networking-vnets-troubleshooting.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| nw-diag-allowed | Keep, revision 1 | Troubleshooting evidence interpretation | Allow proves evaluated Azure rules, not listener, guest firewall, or DNS success. Key `a`. |
| nw-diag-next | Revise, revision 2 | Troubleshooting targeted routing query | Supply changed-route failure and exact output needs; compare diagnostics rather than unrelated configuration screens. Key `c`. |
| nw-diag-name | Revise, revision 2 | Troubleshooting name-resolution stage | Specify a preconnection resolution failure; replace destructive/unrelated repairs with diagnostic stages. Key `b`. |

## Evidence and acceptance

[IP flow verify](https://learn.microsoft.com/en-us/azure/network-watcher/ip-flow-verify-overview)
documents NSG/security-admin rule evaluation and returned rule decisions,
tracing all retained evidence rationales. It does not probe a listener,
guest firewall, or client DNS. [Next hop](https://learn.microsoft.com/en-us/azure/network-watcher/next-hop-overview)
documents the three requested routing fields. [Packet capture](https://learn.microsoft.com/en-us/azure/network-watcher/packet-capture-overview)
records packets, and [NSG diagnostics](https://learn.microsoft.com/en-us/azure/network-watcher/network-watcher-network-configuration-diagnostics-overview)
evaluates security configuration; these trace the wrong diagnostic outputs.
Connection troubleshoot is not offered as a wrong choice because current
documentation also includes next-hop analysis in its comprehensive response.

[Connection troubleshoot](https://learn.microsoft.com/en-us/azure/network-watcher/connection-troubleshoot-overview)
distinguishes DNS resolution, listening ports, and other connectivity failures.
The named failure stage plus successful direct-IP TCP check fixes the DNS
diagnostic priority. TLS certificate and HTTP path checks occur later in the
protocol sequence; these are explicit protocol inferences, not claims that
every hostname-versus-IP failure must be DNS. The key queries the VM actual
resolver rather than assuming public DNS is authoritative for private names.

Exactly one individual conclusion/query qualifies per item; no joint sets or
variants. The title does not name the selected tool, establish a listener,
or identify the failed resolution stage. Stable IDs/families remain.
Author-led source review is separate from build/check, 13 tests, site links,
hashes, and whitespace validation. No diagnostic was executed in Azure.
