# Public and internal Standard Load Balancer

Topic ID: networking.load-balancer.configuration

Objectives: nw-12

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Choose the frontend

Azure Load Balancer distributes TCP/UDP flows at transport layer 4. A public
frontend uses a public IP; an internal frontend uses a private subnet IP for
privately reachable clients. It does not provide URL-path routing or terminate
TLS for an application. Basic Load Balancer retired in September 2025.
[Overview](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-overview).

## Configure

Using authorized Load Balancer/network write and join permissions, create a
regional Standard resource. Add a compatible frontend, backend pool with intended
VM NIC/IP configurations, health probe, and load-balancing rule. Specify frontend
port, backend port, protocol, pool, and probe. Permit both client traffic and
probe traffic in relevant NSGs and guest firewalls.
[Public setup](https://learn.microsoft.com/en-us/azure/load-balancer/quickstart-load-balancer-standard-public-portal).

For an internal frontend, choose VNet/subnet and private allocation. Test from
a separate privately reachable client. Backend VMs do not each require public
IPs. An inbound NAT rule maps to a chosen backend; it is not the same as a
rule distributing flows across healthy instances.
[Internal setup](https://learn.microsoft.com/en-us/azure/load-balancer/quickstart-load-balancer-standard-internal-portal).

## Verify and limitations

Confirm backend membership, probe status, and new client flows. A stable
connection is not reassigned on every HTTP request. Design explicit outbound
connectivity independently; an internal frontend is not an Internet SNAT
service. Microsoft recommends NAT Gateway for most outbound scenarios.
[Outbound design](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-outbound-connections).

Example: TCP 443 frontend maps to two VM listeners on 8443 with a separate
health probe. Configure TLS in the guest/service, not on this layer-4 balancer.
Delete unused frontends, IPs, and test backends after checking dependencies;
load-balancing and address charges can apply.
See [public IPs](../virtual-networks/public-ips.md).

[Question data](../../../questions/networking/networking-load-balancer-configuration.json).
