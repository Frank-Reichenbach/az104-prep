# Public and internal Standard Load Balancer review

Topic: `networking.load-balancer.configuration`; objective: `nw-12`.
Verified: 2026-10-04. Source: networking-load-balancer-configuration.json.

| ID | Decision | Pattern / difficulty | Defect and key |
| --- | --- | --- | --- |
| nw-lb-private | Revise, revision 2 | Applied complete service configuration | Explicit private address and multi-backend distribution; compare public restriction, NAT, and missing-rule alternatives. Key `a`. |
| nw-lb-components | Revise, revision 2 | Applied protocol/port mapping | Replace DNS/route/NSG padding with reversed ports, wrong protocol, or single-VM NAT. Key `b`. |
| nw-lb-layer | Revise, revision 2 | Foundation rule matching boundary | Replace yes/no padding with four comparable request attributes. Retains the layer-4 versus HTTP-path distinction. Key `c`. |

## Evidence and acceptance

[Overview](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview)
supports private/public frontend distinctions and layer-4 operation.
[Components](https://learn.microsoft.com/en-us/azure/load-balancer/components)
supports pools, probes, protocol/port rules, and NAT versus distribution.
These support every configuration rationale: source restriction does not
change address type; NAT chooses a VM; probes do not supply a distribution
rule; reversed ports and UDP fail the supplied TCP listener facts. The
layer-4 boundary excludes path, Host, and TLS-name matching; frontend port
can select a pool. TLS/HTTP parsing is not inferred from an HTTP probe.

One complete alternative meets each goal. No joint sets or variants.
Actual title names both frontend kinds without choosing the required full
configuration, mapping, or request attribute. Prerequisite routes, security,
and probe health are supplied where needed; no guarantee of connectivity is
inferred from a private frontend alone. Stable IDs/families remain.
Author-led source review is separate from build/check, 13 tests, site links,
hashes and whitespace validation. No load balancer or networking changes ran.
