# Virtual network address spaces and subnets review

Topic: `networking.vnets.subnets`; objective: `nw-01`.
Verified: 2026-10-04. Source: questions/networking/networking-vnets-subnets.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| nw-subnet-reserved | Keep, revision 1 | Foundation reservation calculation | 32 addresses minus five ordinary IPv4 reservations equals 27. Key `a`. |
| nw-vnet-region | Keep, revision 1 | Foundation regional boundary | One region, spanning its zones; not global, single-zone, or relocated by group metadata. Key `a`. |
| nw-vnet-egress | Revise, revision 2 | Troubleshooting missing translation | Supply successful DNS/security/route checks and private-only NIC constraint; compare path/permission/subnet mistakes. Key `a`. |

## Evidence and acceptance

[VNet FAQ](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq)
documents five reserved IPv4 addresses and the regional VNet/zone boundary.
It traces both retained keys and their allocation/location distractors. The
resource-group-location distractor is also traced by the previously verified
[resource-group management](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)
distinction between metadata and individual resource locations. No service
allocation is assumed in the ordinary reservation calculation.

[Default outbound access](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/default-outbound-access)
documents private-subnet explicit egress; [NAT overview](https://learn.microsoft.com/en-us/azure/nat-gateway/nat-overview)
documents source translation and association to the VM subnet. Together they
trace each repair rationale: another allow or Internet route cannot create
translation, and association to a different subnet does not cover this VM.
The goal excludes a NIC public IP; it does not claim NAT is the only Azure
egress method. The explicit false property avoids relying on rollout dates
or unspecified creation API defaults. Older FAQ generalities about Internet
access are not used to imply default egress for this private subnet.

One assertion/change qualifies per item; no joint sets or variants. The topic
title does not supply reservation arithmetic, regional extent, or an egress
repair. Stable IDs/families remain. Author-led source review is separate from
build/check, 13 tests, site links, hashes, and whitespace validation. No Azure
network or VM update operation was executed.
