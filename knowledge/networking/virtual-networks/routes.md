# User-defined routes and next hops

Topic ID: networking.vnets.routes

Objectives: nw-04

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Route selection

A user-defined route (UDR) changes where subnet traffic goes; it does not
authorize that traffic. Azure normally selects the longest matching prefix.
For equal prefixes, precedence is UDR, BGP, then system. Service-endpoint routes
cannot be overridden; do not apply the general precedence rule blindly.
[Routing rules](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview).

## Implement

With Network Contributor or equivalent route-table/subnet permissions, create
a route table in the subnet's subscription and region. Add a destination prefix,
next-hop type, and private next-hop IP for a virtual appliance. Associate the
table with each intended subnet; one subnet can have only one table.
[Management procedure](https://learn.microsoft.com/en-us/azure/virtual-network/manage-route-table).

Example: send 0.0.0.0/0 from an application subnet to a firewall VM's private IP.
Keep the appliance in a separate subnet to avoid routing loops. Enable Azure
NIC IP forwarding and the appliance's guest forwarding. Plan symmetric return
routes and outbound address translation separately.
[Appliance requirements](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview).

## Verify and troubleshoot

Inspect the subnet association and a running VM NIC's effective routes. Check
the actual destination against competing prefixes before testing its port.
A 0.0.0.0/0 UDR does not defeat a more-specific route just because it is custom.
A **None** next hop drops matching traffic.

Do not disable route propagation on GatewaySubnet. Before altering a gateway's
subnet, review documented gateway restrictions.
[Gateway guidance](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview).

Detach the table before deleting it. Record its former associations so rollback
can restore them. Route tables do not replace NSGs or provide an outbound NAT
service.
[Cleanup](https://learn.microsoft.com/en-us/azure/virtual-network/manage-route-table).
See [peering transit](peering.md).

[Question data](../../../questions/networking/networking-vnets-routes.json).
