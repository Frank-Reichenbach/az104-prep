# Public IP resources and allocation review

Topic: `networking.vnets.public-ips`; objective: `nw-03`.
Verified: 2026-10-04. Source: questions/networking/networking-vnets-public-ips.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| nw-ip-inbound | Revise, revision 2 | Troubleshooting scoped NSG repair | Original allow omitted priority against the deny. Define rule order and preserve other-source denial. Key `a`. |
| nw-ip-release | Keep, revision 1 | Foundation allocation lifecycle | Name reuse does not reserve the released numeric address. Key `b`. |
| nw-ip-create | Revise, revision 2 | Applied association compatibility | Compare complete SKU/tier/allocation candidates for a regional NIC. Key `c`. |

## Evidence and acceptance

[Public IP behavior](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses)
and [creation](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/create-public-ip-portal)
document Standard static allocation, deletion/reallocation, numeric pool
selection, and DNS A-record updates. These trace all retained lifecycle
rationales. Resource name reuse does not reserve the old numeric address.
The same documentation distinguishes direct VM association from Global-tier
cross-region load balancers and current Standard v2 NAT-only association,
tracing every creation candidate. Standard v2 is supplementary service
evolution used here to qualify current compatibility, not a new exam objective.

[NSG overview](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview)
documents direction, matching source/port, and lower-number-first evaluation.
Combined with public-IP secure-by-default behavior it traces the repair key
and all wrong rules: priority 400 loses to 300, outbound does not authorize
inbound, and Internet-wide allow violates the scoped goal. The stem asks
about new connections to avoid stateful-rule changes on established flows.

One complete rule/configuration or individual assertion qualifies per item.
No joint sets or variants. The title does not supply priority/source matching,
lifecycle behavior, or SKU association compatibility. Stable IDs/families
remain. Author-led source review is separate from build/check, 13 tests, site
links, hashes, and whitespace validation. No public IP or NSG was changed.
