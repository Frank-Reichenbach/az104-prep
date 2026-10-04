# App Service inbound and outbound networking review

Topic: `compute.app-service.networking`; objective: `co-23`.
Verified: 2026-10-04. Source: questions/compute/compute-app-service-networking.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-web-outbound | Keep, revision 1 | Foundation traffic direction | Regional integration supplies outbound private access; endpoint/domain/inbound filter do not. Key `a`. |
| co-web-inbound | Revise, revision 2 | Applied joint path design | Define supported app, database VM, prerequisites, DNS/public-access work, and two necessary path components. Keys `a`, `b`. |
| co-web-subnet | Revise, revision 2 | Applied subnet eligibility | Replace slot/DNS placeholders with real subnet/delegation candidates. Key `a`. |
| co-web-inbound-direction-variant | Keep, revision 1 | Foundation reverse traffic direction | Existing outbound integration does not provide the new inbound private path. Key `endpoint`. |
| co-web-integration-subnet-variant | Revise, revision 2 | Applied reverse subnet placement | Keep inbound endpoint fixed and select valid region/delegation for new outbound integration. Key `separate`. |

## Evidence and acceptance

[VNet integration](https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration)
documents outbound access, same-region support, delegation, and the absence
of inbound routing via integration/its inbound NSG rules. It traces the
retained outbound key and filter misconception and the joint outbound choice.
[App private endpoints](https://learn.microsoft.com/en-us/azure/app-service/overview-private-endpoint)
documents inbound-only behavior, DNS, supported Standard plans, public access
coexistence, and separate integration/endpoint subnets. It traces the endpoint
key, wrong-direction misconception, and the fact that DNS alone is insufficient.
The domain-only retained distractor cannot create a network attachment.

[Subnet delegation](https://learn.microsoft.com/en-us/azure/virtual-network/subnet-delegation-overview)
excludes delegated subnets. Combined with the App Service separate-subnet rule
it traces every subnet candidate: available addresses are insufficient when
the unchanged subnet delegation forbids the endpoint. The eligible subnet
need not be empty or dedicated; those extra requirements are not asserted.

The joint set needs both components: remove the endpoint and there is no
private inbound attachment; remove integration and there is no outbound
private VM path. DNS-only or an inbound integration-subnet rule cannot replace
either missing path. No alternative offered pair meets both requirements.
Permissions, separate subnets, endpoint approval, private DNS, and disabled
public access are accounted for rather than silently promised by feature
creation alone. The direction family variant reverses the requested traffic
direction and independently keys endpoint rather than integration. Its route
and NAT choices change outbound behavior, so neither supplies inbound access.
The subnet variant reverses which attachment already exists; all four options
are independently reviewed for location, delegation, and retained endpoint.
Its new region/delegation constraints keep one qualifying arrangement. Stable
IDs/families remain; the quiz still selects at most one member per family.

The actual title names traffic directions without selecting these configurations
or subnet eligibility. Author-led review is separate from build/check, 13 tests,
site links, hashes, and whitespace validation. No network changes ran in Azure.
