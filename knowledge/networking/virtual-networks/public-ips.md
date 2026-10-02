# Public IP resources and allocation

Topic ID: networking.vnets.public-ips

Objectives: nw-03

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Choose the resource

Use Standard public IPs for current designs; Basic retired in September 2025.
Standard allocation is static. Azure chooses the address; deleting its public
IP resource releases it permanently. An unattached address is not a listener.
Standard v2 currently serves Standard v2 NAT Gateway only; treat this as
supplementary service evolution.
[IP behavior](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses).

## Implement

In **Public IP addresses → Create**, select subscription, group, region,
Standard SKU, IP version, and compatible zone settings. Choose a DNS label if
needed. Read the resulting address and DNS name rather than inventing them.
Associate it with a NIC IP configuration or another supported frontend.
Creation and association require the corresponding network-resource write
and join permissions; Network Contributor is a broad built-in option.
[Portal procedure](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/create-public-ip-portal).

For a VM, permit only the required source/port in its NSG and guest firewall,
then verify the application listens. Standard IP assignment alone does not
allow inbound traffic. Public load balancer backends do not each need public IPs.
[Security and association](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses).

## Verify and maintain

Inspect SKU, allocation, IP configuration association, and DNS resolution.
Test from an allowed external source. Check subnet and NIC NSGs if connection
fails. Zone-redundant IPs cover multiple zones; a zonal IP shares its zone's
failure exposure. Current documentation says formerly non-zonal Standard IPs
are zone-redundant in supported regions, so an empty zones field alone is not
proof of single-zone exposure.
[Zone behavior](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/public-ip-addresses).

Example: create a Standard address for an HTTPS frontend, bind it, and allow
TCP 443 only where required. Remove DNS references before deleting the
frontend/address. Retained public IPv4 resources can continue to incur charges.
[Cleanup](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/create-public-ip-portal).
See [explicit outbound planning](subnets.md).

[Question data](../../../questions/networking/networking-vnets-public-ips.json).
