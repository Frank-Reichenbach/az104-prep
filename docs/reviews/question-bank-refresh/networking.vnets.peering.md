# VNet peering, forwarding, and gateway transit review

Topic: `networking.vnets.peering`; objective: `nw-02`.
Verified: 2026-10-04. Source: questions/networking/networking-vnets-peering.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| nw-peering-transitive | Revise, revision 2 | Applied topology mapping | Supply access checks and compare complete pair-connectivity outcomes; remove peering-name distractor. Key `a`. |
| nw-peering-transit | Revise, revision 2 | Applied jointly required gateway settings | Fix ambiguity in every-spoke-peering choice when only one peer exists; compare explicit side/setting assignments. Keys `a`, `b`. |
| nw-peering-forward | Keep, revision 1 | Foundation permission versus routing | Forwarded traffic permission creates neither appliance/routes nor DNS links and does not override NSGs. Key `a`. |

## Evidence and acceptance

[Peering overview](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview)
documents direct connectivity, NSGs, and separately configured service chaining.
[Peering management](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-manage-peering)
documents nontransitivity, direction-specific settings, and forwarded traffic
permission without new UDRs/appliances. These trace each complete topology
mapping and retained forward-permission rationale. DNS links are a separate
configuration, not a consequence of allowing forwarded packets.

[Gateway transit](https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-peering-gateway-transit)
documents hub permission and spoke use of its remote gateway. The key set
needs both: permission alone does not select the hub gateway in the spoke,
and spoke selection alone lacks the hub permission. Wrong-side remote use
conflicts with the hub own gateway; wrong-side transit offers no spoke
gateway. No other offered pair meets the same arrangement. Existing network
access and supported gateway are explicit; these two changes do not claim
to complete every on-premises routing/firewall prerequisite.

Traditional peerings exclude newer managed connected-group topology semantics
from the nontransitivity scenario. No variants; stable IDs/families remain.
The displayed title names three concepts without resolving topology, side
assignments, or the permission/routing distinction. Author-led source review
is separate from build/check, 13 tests, site links, hashes, and whitespace
validation. No peering or gateway operation was executed in Azure.
