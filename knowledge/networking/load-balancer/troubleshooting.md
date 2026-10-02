# Load Balancer probes and connectivity diagnosis

Topic ID: networking.load-balancer.troubleshooting

Objectives: nw-13

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Separate probe health from client traffic

A healthy probe indicates the configured probe check succeeds, not that every
client operation works. An HTTP/HTTPS probe expects HTTP 200; redirects or
authentication failures mark it down. Design a health path that reflects service
readiness. TCP probes check a listener without assessing HTTP response content.
[Probe behavior](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-custom-probe-overview).

## Inspect

With read/monitoring access, inspect **Health Probe Status** and **Data Path
Availability** metrics by frontend/backend dimensions. Correlate their time
window with the incident; aggregated averages can hide one failed backend.
[Diagnostics](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-standard-diagnostics).

Then check pool membership, rule/probe association, backend listener, probe
port/path, NSGs, and guest firewall. IPv4 probes originate from 168.63.129.16;
the AzureLoadBalancer service tag permits this source in NSGs. A custom deny
can override the default. Client traffic needs its own appropriate permit.
[Probe access](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-custom-probe-overview).

For outbound failures, inspect explicit outbound configuration and SNAT port
utilization rather than treating a successful inbound probe as proof of egress.
[Outbound troubleshooting](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-outbound-connections).

## Verify the repair

Test new flows from a separate eligible client and each backend's intended
health response. Example: a health path redirects to login; expose an appropriate
readiness path returning 200 when ready, then confirm probe recovery. Do not
declare healthy by forcing 200 while dependencies are actually unavailable.

A failed probe prevents new flows to that backend but does not necessarily
terminate established Standard Load Balancer TCP flows. Restore temporary rules
and captures after diagnosis.
[Common problems](https://learn.microsoft.com/en-us/troubleshoot/azure/load-balancer/troubleshoot-common-problems/load-balancer-troubleshoot).
See [configuration](configuration.md).

[Question data](../../../questions/networking/networking-load-balancer-troubleshooting.json).
