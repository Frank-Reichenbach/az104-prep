# DNS Private Resolver and hybrid forwarding

Topic ID: networking.dns.resolver

Objectives: nw-11

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Direction matters

DNS Private Resolver provides managed hybrid DNS forwarding. This is supporting
DNS implementation detail, not an additional independently listed exam objective.
An inbound endpoint receives queries into Azure; an outbound endpoint sends
queries through a DNS forwarding ruleset to other resolvers.
[Resolver model](https://learn.microsoft.com/en-us/azure/dns/dns-private-resolver-overview).

## Implement

Create the resolver in a supported region and VNet with authorized
Microsoft.Network resolver/subnet operations. Use separate dedicated endpoint
subnets delegated to Microsoft.Network/dnsResolvers. For an on-premises client,
provide VPN/ExpressRoute reachability and configure its conditional forwarder
to the inbound endpoint IP. Link the Azure private zone to the resolver VNet.
[Portal setup](https://learn.microsoft.com/en-us/azure/dns/dns-private-resolver-get-started-portal).

For Azure-to-on-premises queries, create an outbound endpoint, ruleset, enabled
suffix rule with destination DNS IP/port, and ruleset link to the client VNet.
With multiple suffix matches, the longest suffix wins. Check that destination
resolvers are reachable.
[Endpoints and rulesets](https://learn.microsoft.com/en-us/azure/dns/private-resolver-endpoints-rulesets).

## Verify and troubleshoot

Test a known Azure private name from on-premises and a known on-premises name
from the linked Azure VNet. Inspect DNS client settings before assuming the
ruleset applies: custom DNS settings direct queries to those custom servers.
[Query flow](https://learn.microsoft.com/en-us/azure/dns/dns-private-resolver-overview).

Avoid forwarding loops, particularly a ruleset linked to the resolver's own
VNet that sends matching queries back to its inbound endpoint. A wildcard
forwarder must resolve required public dependencies too.
[Loop example](https://learn.microsoft.com/en-us/azure/dns/dns-private-resolver-get-started-portal).

Resolver endpoints add service costs. Remove dependent ruleset links/rulesets
before deleting an outbound endpoint. Retain shared DNS paths until consumers
have migrated. See [private zones](private-zones.md).

[Question data](../../../questions/networking/networking-dns-resolver.json).
