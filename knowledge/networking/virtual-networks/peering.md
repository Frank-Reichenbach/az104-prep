# VNet peering, forwarding, and gateway transit

Topic ID: networking.vnets.peering

Objectives: nw-02

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Peering model

Peering connects VNet private address spaces over the Microsoft backbone.
Local peering is within a region; global peering crosses regions. Traditional
VNet peering requires nonoverlapping connected address spaces and is not
transitive: A–B and B–C peerings do not automatically provide A–C routing.
[Peering overview](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview).

## Implementation

With authorized peering read/write/peer operations on both networks, create
the two directional peering resources. The portal can create both together
when the operator has suitable permissions. Enable network access according
to the intended topology and verify both sides report **Connected**.
[Peering management](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-manage-peering).

In a hub/spoke design, allowing forwarded traffic permits traffic arriving
through a peered appliance; it does not create the appliance or UDRs. Configure
routing, appliance/NIC IP forwarding, guest forwarding, and symmetric return
paths separately when using service chaining.

Gateway transit uses **Allow gateway transit** on the hub side and **Use remote
gateways** on the spoke side. The spoke cannot already have its own gateway,
and can use a remote gateway through only one peering. Confirm gateway SKU
support and the effective learned routes.
[VPN gateway transit](https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-peering-gateway-transit).

Peering does not automatically integrate DNS namespaces or grant application
authorization. Link the appropriate private DNS zones or configure DNS
forwarding independently. NSGs can still block traffic across a connected peering.

## Verify and troubleshoot

Check both peering states, effective routes, address overlap, NSGs, and guest
listeners. Test the actual destination port, not only ICMP. After a VNet address
space change, synchronize its peerings; Microsoft recommends syncing after each
change. For spoke-to-spoke failures, identify whether a direct peering or
explicit transit path exists rather than assuming the hub makes peering
transitive.
[Address-space synchronization](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview).

Peering traffic has charges; global paths and gateways can add costs. Delete
both directional links when dismantling a lab, after checking users of the
transit path. See [address planning](subnets.md).

[Question data](../../../questions/networking/networking-vnets-peering.json).
