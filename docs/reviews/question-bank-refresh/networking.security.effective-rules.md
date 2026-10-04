# Effective NSG rules and flow evaluation review

Topic: `networking.security.effective-rules`; objective: `nw-07`.
Verified: 2026-10-04. Source: questions/networking/networking-security-effective-rules.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| nw-effective-layers | Keep, revision 1 | Applied two-layer rule evaluation | Subnet Allow 100 does not override NIC Deny 200. Key `b`. |
| nw-effective-running | Revise, revision 2 | Troubleshooting query prerequisite | Supply permissions/both associations; compare runtime versus client/address/placement changes. Key `a`. |
| nw-effective-multiple | Revise, revision 2 | Applied evidence scope | Specify shared NIC policy but different subnet associations; compare incomplete rule/route evidence. Key `c`. |

## Evidence and acceptance

[NSG processing](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-group-how-it-works)
documents inbound subnet then NIC evaluation and permission at both layers.
It traces all retained outcomes: priority is local to the NSG, passing the
first does not bypass the second, and equal numbers are not required to deny.
[Effective-rule procedure](https://learn.microsoft.com/en-us/azure/virtual-network/diagnose-network-traffic-filter-problem)
documents running-VM and association prerequisites and checking every NIC.
It traces both revised keys and runtime/evidence misconceptions. Switching
clients, adding an IP, or relocating rules cannot supply a running VM.

[NSG overview](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview)
supports the filtering role. Route tables choose paths rather than replacing
NSG evidence, as separately verified in the preceding route topic. Different
subnet policies prevent assuming the shared NIC NSG or first NIC result
describes the second complete filtering path. These are explicit consequences
of the documented association model, not global priority merging.

Exactly one individual conclusion/review satisfies each scenario; no joint
sets or variants. The displayed title does not resolve a two-layer outcome,
query runtime state, or scope of second-NIC evidence. Stable IDs/families
remain. Author-led review is separate from build/check, 13 tests, site links,
hashes, and whitespace validation. No VM was started or filtering changed.
