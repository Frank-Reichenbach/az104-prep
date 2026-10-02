# Effective NSG rules and flow evaluation

Topic ID: networking.security.effective-rules

Objectives: nw-07

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Read the combined policy

Effective security rules show the rules associated with a VM NIC through its
subnet and NIC. These are not a single global priority list: an allow in one
NSG does not override a deny in the other. Inbound processing is subnet then
NIC; outbound is NIC then subnet. Microsoft recommends avoiding simultaneous
subnet/NIC NSGs when their overlap adds unnecessary complexity.
[Processing model](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-group-how-it-works).

## Inspect

For a running VM, open its NIC's **Effective security rules**, or use this
unexecuted example:

```bash
az network nic list-effective-nsg --resource-group study-rg --name app-nic
```

Use read/effective-rule permissions on the NIC and associated resources.
Output requires an NSG on the subnet, NIC, or both. Check every NIC on a
multi-NIC VM; their associations can differ. Inspect expanded addresses and
the rule's association rather than only its name.
[Portal and CLI procedure](https://learn.microsoft.com/en-us/azure/virtual-network/diagnose-network-traffic-filter-problem).

## Verify an individual flow

Run IP flow verify for exact addresses, ports, protocol, and direction.
A default **AzureLoadBalancer** probe allow does not allow all user traffic.
Custom rules can override defaults. Rules from Virtual Network Manager may
be evaluated before NSGs; investigate them if NSG evidence alone is incomplete.
[Security layers](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview).

Example: subnet permits HTTPS but NIC denies it. Repair the intended NIC rule,
then test a new connection. Verify routes, guest firewall, and listeners
separately. Keep a record of both association levels before rollback.
See [rule configuration](nsg-asg.md) and
[connectivity diagnosis](../virtual-networks/troubleshooting.md).

[Question data](../../../questions/networking/networking-security-effective-rules.json).
