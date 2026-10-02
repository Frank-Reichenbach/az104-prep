# Public DNS zones, delegation, and records

Topic ID: networking.dns.public

Objectives: nw-11

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Host a public namespace

Azure DNS hosts authoritative DNS records; creating a zone does not purchase
the domain or change its registrar delegation. Use the exact name servers
assigned to that zone at the parent/registrar.
[Delegation](https://learn.microsoft.com/en-us/azure/dns/dns-delegate-domain-azure-dns).

## Implement

With DNS Zone Contributor or equivalent permissions, create the public zone.
Copy its assigned NS values into the parent delegation. Add record sets:
A for IPv4, AAAA for IPv6, CNAME for an alias name, MX for mail routing, and TXT
for text/ownership checks. Specify record-set name relative to the zone,
type, TTL, and values; @ denotes its apex.
[Records](https://learn.microsoft.com/en-us/azure/dns/dns-zones-records).

An apex CNAME conflicts with required apex SOA/NS data. Azure DNS alias
record sets support an apex A/AAAA alias for supported Azure targets, such
as a public IP resource, without using an apex CNAME.
[Alias records](https://learn.microsoft.com/en-us/azure/dns/dns-alias).

## Verify and troubleshoot

Query the assigned authoritative name servers, then use an external recursive
resolver. Compare delegation, record type/name, target, and TTL. Cached old
answers can persist until their TTL expires; an authoritative update is not
proof every resolver has refreshed.
[Delegation verification](https://learn.microsoft.com/en-us/azure/dns/dns-delegate-domain-azure-dns).

Example: host a registered example domain, delegate it, and add www as a CNAME
to a frontend hostname. Azure DNS does not create that frontend or configure
its TLS binding. Zone/record query costs are separate from the app itself.
Remove obsolete records before deleting target resources; change parent
delegation before deleting a still-used zone.
See [App Service custom domains](../../compute/app-service/domains.md).

[Question data](../../../questions/networking/networking-dns-public.json).
