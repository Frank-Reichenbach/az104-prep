# Network and application security groups

Topic ID: networking.security.nsg-asg

Objectives: nw-06

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Filtering and grouping

A network security group (NSG) filters flows using addresses, ports, protocol,
and direction. Lower priority numbers run first; the first match decides.
Rules are stateful: response traffic for an allowed flow does not need a
separate return rule. Changed rules generally affect new connections.
[NSG behavior](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview).

An application security group (ASG) groups NICs for use in NSG rules. It is
not itself a firewall or an Entra group. All NICs in an ASG must be in the same
VNet; source and destination ASGs in one rule must also belong to that VNet.
Microsoft recommends ASGs/service tags where they simplify rules.
[ASG guidance](https://learn.microsoft.com/en-us/azure/virtual-network/application-security-groups).

## Implement

Create an NSG, then rules with distinct direction/priority pairs. Associate it
with the subnet or NIC. Create ASGs such as Web and Database; add the intended
NIC IP configurations. For example, permit Web → Database TCP 1433 before a
broader database deny. Confirm membership before relying on the rule.
Use Network Contributor or a custom role permitting these network operations.
[Configuration example](https://learn.microsoft.com/en-us/azure/virtual-network/application-security-groups).

## Verify and troubleshoot

Inspect subnet and NIC associations, ASG membership, and effective rules.
Test new connections after a change; an existing session surviving a rule
removal does not mean the removal failed. Default rules cannot be deleted,
but higher-priority custom rules can override them.
[Rule evaluation](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview).

When both subnet and NIC have NSGs, each must permit the flow. An NSG is not
a route, NAT device, or application authentication service.
[Combined filtering](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-group-how-it-works).

Keep an administrative access path before tightening rules. Remove temporary
exceptions and unused ASG memberships after a lab. See
[diagnostic sequence](../virtual-networks/troubleshooting.md).

[Question data](../../../questions/networking/networking-security-nsg-asg.json).
