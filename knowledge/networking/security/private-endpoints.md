# Private endpoints, approval, and DNS

Topic ID: networking.security.private-endpoints

Objectives: nw-10

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Private access

A private endpoint creates a private-address network interface targeting a
specific service subresource. The endpoint belongs to the VNet's region and
subscription; the target service can be elsewhere. Only an **Approved**
connection carries traffic. Creation rights and target approval rights are
separate.
[Endpoint model](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview).

## Implement

Create the endpoint in a suitable subnet, select the service resource and
subresource, and request/approve the connection using authorized roles.
For Storage, blob and file need distinct endpoints. Data Lake workflows can
need both dfs and blob.
[Storage requirements](https://learn.microsoft.com/en-us/azure/storage/common/storage-private-endpoints).

Configure the documented private DNS zone, its A record, zone group, and VNet
links. Keep the application's normal service hostname; do not replace its
connection string with the privatelink hostname.
[DNS values](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns).

Configure public network access separately if the service should be private
only. A new private endpoint does not automatically block the public path.
Service data authorization also remains required.
[Storage network controls](https://learn.microsoft.com/en-us/azure/storage/common/storage-private-endpoints).

## Verify and troubleshoot

From each intended client network, resolve the normal hostname to the private
IP and test the service using valid credentials. Check connection approval,
subresource, DNS links/forwarding, routing, and filtering in that order.
On-premises clients need both private connectivity and suitable DNS.

Private endpoint subnet policies can enable NSG/UDR processing; do not assume
those controls are universally unsupported. Follow the documented prefix
conditions when overriding endpoint routes: a broad 0.0.0.0/0 alone is not enough.
[Network policies](https://learn.microsoft.com/en-us/azure/private-link/disable-private-endpoint-network-policy).

Endpoint hours/data processing can incur charges. Remove endpoint connections
and DNS records/zone groups carefully during cleanup, checking shared zone
users. See [service endpoints](service-endpoints.md).

[Question data](../../../questions/networking/networking-security-private-endpoints.json).
