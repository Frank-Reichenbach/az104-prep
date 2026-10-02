# Diagnosing VNet connectivity

Topic ID: networking.vnets.troubleshooting

Objectives: nw-05

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Diagnose one flow

Record source, destination name/IP, protocol, port, direction, and time.
Confirm DNS resolves to the intended endpoint before changing firewall rules.
Use a port-specific test; a failed ping does not establish that HTTPS is down.

IP flow verify evaluates a VM's TCP/UDP flow against NSG and applicable
security-admin rules and identifies the deciding rule. An allowed result does
not prove the application listens or the guest firewall allows it.
[IP flow verify](https://learn.microsoft.com/en-us/azure/network-watcher/ip-flow-verify-overview).

## Implement a troubleshooting sequence

1. Inspect DNS and the source NIC's effective routes.
2. Use Network Watcher **Next hop** with source VM and destination IP to inspect
   the selected route. A next hop of None explains a routing black hole.
   [Next hop](https://learn.microsoft.com/en-us/azure/network-watcher/next-hop-overview).
3. Run IP flow verify with the real source/destination addresses and ports.
4. Use **Connection troubleshoot** against the destination endpoint. Review
   reachability, failed probes, latency, and issues; then inspect guest firewall
   and listener configuration.
   [Connection troubleshoot](https://learn.microsoft.com/en-us/azure/network-watcher/connection-troubleshoot-overview).

Use permissions for the diagnostic operation and involved resources; a network
configuration role is not automatically guest administrator access. Ensure
Network Watcher exists in the relevant region. Follow the selected tool's
prerequisites. Connection troubleshoot now documents an agentless preview;
the traditional VM-agent workflow still exists. This preview is supplementary,
so questions do not assume every diagnostic requires an extension.

## Verify the repair

Retest the same flow from the same source after one controlled change. Compare
the deciding NSG rule and selected route, then test application behavior.
Record evidence rather than opening all ports as a permanent fix.
See [routes](routes.md) and [peering](peering.md).

A point-in-time successful test does not guarantee continuous availability.
Remove temporary diagnostic rules after testing.

[Question data](../../../questions/networking/networking-vnets-troubleshooting.json).
