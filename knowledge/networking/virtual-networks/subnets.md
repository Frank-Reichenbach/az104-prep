# Virtual network address spaces and subnets

Topic ID: networking.vnets.subnets

Objectives: nw-01

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Address planning

A VNet belongs to one Azure region and spans its availability zones. Use
nonoverlapping address ranges for networks that will connect. Subnets must fit
inside the VNet address space and must not overlap each other. Azure reserves
five addresses in each IPv4 subnet: the first four and the last. A /27 therefore
has 27 assignable addresses before service-specific consumption.
[VNet FAQ](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-faq).

Plan dedicated or delegated subnets for services that require them. Reserve
space for growth and temporary allocations during scaling. Manage private IP
allocation on the Azure NIC; avoid manually configuring a conflicting address
inside the guest.

## Implementation

With network write permission, create a VNet and application subnet:

```sh
az network vnet create --resource-group rg-study --name vnet-study \
  --location westeurope --address-prefixes 10.40.0.0/16 \
  --subnet-name apps --subnet-prefixes 10.40.1.0/24
az network vnet subnet show --resource-group rg-study --vnet-name vnet-study --name apps
```

Associate intended NSGs, routes, DNS settings, and service delegation. Configure
an explicit outbound method when VMs require public connectivity. For API
versions released after March 31, 2026, new VNets default to private subnets;
existing VNets are not automatically changed. Microsoft recommends explicit
egress such as a NAT gateway for predictable behavior.
[Create/change VNets](https://learn.microsoft.com/en-us/azure/virtual-network/manage-virtual-network);
[outbound access](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/default-outbound-access).

## Verify and troubleshoot

Inspect address prefixes, subnet associations, available IPs, NIC allocations,
effective routes, and connectivity. Renew DHCP leases after changing VNet DNS
servers so guests receive the new settings. A correct subnet address does not
prove DNS, security rules, or outbound translation are working.

Check connected networks before extending address space; peering synchronization
may be needed after changes. Subnet resizing has in-use restrictions and service
requirements. Use the actual destination service guidance before modifying it.
[VNet changes](https://learn.microsoft.com/en-us/azure/virtual-network/manage-virtual-network).

VNets themselves have no compute charge, but NAT gateways, public IPs,
endpoints, peering, and network appliances may be billable. Remove dependencies
before deleting an unused subnet/VNet; never remove a shared network solely
because one VM was deleted.

[Question data](../../../questions/networking/networking-vnets-subnets.json).
