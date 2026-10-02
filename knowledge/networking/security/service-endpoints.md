# Service endpoints and subnet authorization

Topic ID: networking.security.service-endpoints

Objectives: nw-09

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Purpose and recommendation

A classic service endpoint extends subnet identity to a supported Azure
service and optimizes its route over the backbone. It does not allocate a
private endpoint IP; the service hostname still identifies its public endpoint.
Microsoft recommends Private Link/private endpoints for private service access.
The newer standard service endpoint preview is supplementary here.
[Overview](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview).

## Implement

For an Azure Storage example, enable **Microsoft.Storage** on the client
subnet. On the storage account, select restricted public network access and
add that subnet as a virtual-network rule. Preserve required exceptions
intentionally. Enabling the subnet endpoint alone does not restrict the account.
Use subnet write/join-service-endpoint permissions and storage network-rule
write permissions; data access authorization remains separate.
[Procedure](https://learn.microsoft.com/en-us/azure/virtual-network/tutorial-restrict-network-access-to-resources).

## Verify and limitations

From an authorized VM in the allowed subnet, test with valid data credentials.
Test a disallowed source as well, allowing for any configured exceptions.
Inspect the effective service-endpoint route and account network rules.
[Storage verification example](https://learn.microsoft.com/en-us/azure/virtual-network/tutorial-restrict-network-access-to-resources).

Enabling/disabling an endpoint changes the source-address behavior and can
interrupt existing service connections. Plan reconnection. On-premises traffic
cannot inherit the subnet's service-endpoint identity merely by crossing a VPN.
The route does not authenticate a user or grant Blob Data Reader.
[Constraints](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview).

Do not disable a storage account's public endpoint and expect classic service
endpoints to become private endpoints. Choose the network model first.
Cross-reference [storage rules](../../storage/access/network-rules.md).
Restore previous account/subnet settings during cleanup rather than removing
restrictions needed by other workloads.

[Question data](../../../questions/networking/networking-security-service-endpoints.json).
