# Private DNS zones and VNet links review

Topic: `networking.dns.private`; objective: `nw-11`. Verified: 2026-10-04.
Sources: networking-dns-private.json and the relevant reviewed-variants.json item.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| nw-private-link | Revise, revision 2 | Troubleshooting missing resolution link | Explicit working record and resolver; compare related link/registration/peering/zone actions. Key `a`. |
| nw-private-registration | Keep, revision 1 | Foundation resolution vs registration | Four distinct outcomes of a disabled-registration link. Key `b`. |
| nw-private-one | Revise, revision 2 | Applied complete two-zone mapping | Replace public delegation/apex padding with four comparable final configurations. Key `c`. |
| nw-private-registration-enabled-variant | Keep, revision 1 | Foundation enabled-registration outcome | Independently reviewed enabled fact changes key to `register`. |

## Evidence and acceptance

[VNet links](https://learn.microsoft.com/en-us/azure/dns/private-dns-virtual-network-links)
supports resolution-only and registration links, single registration zone
per VNet, multiple resolution zones, and completed link status. These rules
support the complete alpha/beta mapping; alternatives exceed the registration
limit, stop required registration, or move it to the wrong zone. They also
support enabled/disabled family outcomes and the irrelevance of changing
vnet-a registration to vnet-b resolution.

[Private DNS overview](https://learn.microsoft.com/en-us/azure/dns/private-dns-overview)
supports private visibility and resolution across linked VNets separately
from peering. A peering recreation cannot add a missing zone link; a second
empty zone does not copy existing records. Internet publication and automatic
peering are not outcomes of either family variant. This is DNS resolution,
not proof of application reachability or authorization.

The two registration variants preserve their shared distinction and each
has one unique outcome under its enabled/disabled fact. Every other item has
one complete action/configuration; no joint sets. Rendered title identifies
the domain but does not supply the link target, registration setting, mapping,
or outcome. Stable IDs and families remain. Author-led technical review is
separate from build/check, 13 tests, site links, hash and whitespace validation.
No private DNS or peering changes were executed.
