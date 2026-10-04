# DNS Private Resolver and hybrid forwarding review

Topic: `networking.dns.resolver`; objective: `nw-11`. Verified: 2026-10-04.
Source: questions/networking/networking-dns-resolver.json.
Supporting DNS implementation detail, not an added standalone exam objective.

| ID | Decision | Pattern / difficulty | Defect and key |
| --- | --- | --- | --- |
| nw-resolver-inbound | Revise, revision 2 | Applied forwarding destination | Replace unrelated load-balancer/delegation padding with four explicit DNS destination choices. Key `a`. |
| nw-resolver-outbound | Revise, revision 2 | Applied jointly required components | Explicit existing endpoint, network path, absence of competing private zone, and default-DNS constraint. Keys `b`,`c`. |
| nw-resolver-loop | Revise, revision 2 | Troubleshooting constrained repair | Replace a diagnosis already given by the stem with a repair preserving spoke resolution. Key `c`. |

## Evidence and answer-set review

[Resolver overview](https://learn.microsoft.com/en-us/azure/dns/dns-private-resolver-overview)
supports inbound listeners, outbound forwarding, default/custom DNS query
paths and rule matching. [Endpoints and rulesets](https://learn.microsoft.com/en-us/azure/dns/private-resolver-endpoints-rulesets)
supports endpoint IPs, enabled rules, client links, and the explicit warning
against an inbound-targeting ruleset linked to its own VNet. It traces all
loop alternatives: hub removal preserves the spoke link; spoke removal does
the reverse; wildcard and allocation changes retain the circular relationship.

[Platform IP](https://learn.microsoft.com/en-us/azure/virtual-network/what-is-ip-address-168-63-129-16)
supports the platform DNS boundary. Inbound queries use the supplied private
endpoint rather than platform DNS, a subnet gateway, or the forwarder itself.
For outbound resolution, removal of either keyed component loses rule
selection or client application. Registration does not replace forwarding;
custom DNS violates the stated constraint. Exactly one offered pair meets
the complete requirements. Reachability is a prerequisite, not an inferred
side effect of a ruleset link.

No variants. Actual topic label does not select an endpoint address,
component pair, or link removal. Stable IDs/families remain; selection count
change is revisioned. Author-led source review is distinct from build/check,
13 tests, site links, hashes, and whitespace validation. No resolver deployed.
