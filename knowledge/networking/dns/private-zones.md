# Private DNS zones and VNet links

Topic ID: networking.dns.private

Objectives: nw-11

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Resolution versus registration

Link a private zone to each VNet that should resolve it through Azure-provided
DNS. A resolution link exposes records without registering that VNet's VMs.
An autoregistration link also maintains VM A records. One VNet can have only
one registration zone, but multiple resolution zones.
[VNet links](https://learn.microsoft.com/en-us/azure/dns/private-dns-virtual-network-links).

Peering alone does not share private-zone resolution. A shared private zone
can serve linked VNets without peering, although application connectivity still
needs its own route. Microsoft advises against .local zone names.
[Private DNS overview](https://learn.microsoft.com/en-us/azure/dns/private-dns-overview).

## Implement and verify

Create the private zone with Private DNS Zone Contributor or equivalent
permissions. Add VNet links using authorized link/join operations, choosing
autoregistration only where required. Wait for completed link status, then
create a manual record or inspect a registered VM record.
[Portal procedure](https://learn.microsoft.com/en-us/azure/dns/private-dns-getstarted-portal).

Example: link two study VNets to corp.example, enable registration for the
VM-hosting VNet, and leave the consuming VNet resolution-only. Query a known
record from clients in both. If clients use custom DNS, configure forwarding;
a zone link does not force a custom resolver to consult Azure.
[Resolution flow](https://learn.microsoft.com/en-us/azure/dns/dns-private-resolver-overview).

Private zones are not publicly delegated. Split-horizon designs can use the
same zone name publicly and privately with different answers; review missing
private records rather than assuming every lookup falls back publicly.
[Capabilities](https://learn.microsoft.com/en-us/azure/dns/private-dns-overview).

Before cleanup, check other linked VNets. Deleting a shared zone breaks their
name resolution. Private-zone hosting/query charges can apply.
See [private endpoints](../security/private-endpoints.md).

[Question data](../../../questions/networking/networking-dns-private.json).
