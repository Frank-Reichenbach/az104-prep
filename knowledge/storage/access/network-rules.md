# Storage firewalls and network access

Topic ID: storage.access.network  
Objectives: st-01  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Storage network rules restrict the public endpoint's data traffic. They do not
grant permission to read data. A client needs both an allowed path and valid
authorization. A SAS with an IP restriction cannot override the firewall.
[Firewall model](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security).

Microsoft recommends private endpoints with restricted public access when
practical; otherwise allow only necessary public IP ranges, subnets, or resource
instances. Service endpoints keep the service's public endpoint; private
endpoints give the selected storage service a private address in your network.
[Security recommendations](https://learn.microsoft.com/en-us/azure/storage/common/secure-storage).

## Allow a subnet through a service endpoint

Use management permissions on the storage account and permission to join the
subnet through a service endpoint. Changing subnet settings also needs network
write permission. First inventory application, administrator, and recovery
paths; do not remove the only working path before configuring its replacement.

1. In the subnet's **Service endpoints**, enable Microsoft.Storage for the
   relevant regional case, or Microsoft.Storage.Global for cross-region access.
2. In the storage account's **Networking**, add that existing subnet.
3. Set public access to **Enabled from selected networks** and save.
4. Review IP rules, resource-instance rules, and trusted-service exceptions;
   each is a separate allowed path.
[Subnet rule procedure](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-virtual-networks).

For an existing allowlist, enforce its default with:

```sh
az storage account update --resource-group '<group>' \
  --name '<account>' --default-action Deny
az storage account network-rule list --resource-group '<group>' \
  --account-name '<account>'
```

With defaultAction Allow, adding restrictive-looking rules alone does not deny
other clients. Disabling public network access is a separate setting; provision
and test private endpoints before depending on them.
[Default access configuration](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-set-default-access).

## Verify and troubleshoot

Read the same test blob with the same credential from an allowed client and
an unlisted external client. Expect only the allowed network to work.
A successful account-management operation is insufficient evidence: the
firewall filters data-plane requests, not ARM management operations.

Use public egress IPv4 addresses for IP rules, not a laptop's 192.168.x.x
address. Same-region Azure clients need the appropriate network mechanism,
not their public IP in an IP rule. Re-created subnets must be reauthorized.
[Firewall limitations](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-limitations).

**Documentation nuance:** the default-access page describes Disabled as
private-endpoint-only. The limitations page explicitly says previously
configured trusted-service/resource-instance exceptions can remain effective.
Inspect and remove unneeded exceptions when designing strict isolation;
do not infer their absence from Disabled alone.

Record original settings before an exercise and remove only its temporary
rules. Private endpoints and their traffic can add charges; no endpoints are
deployed by these notes.

[Question data](../../../questions/storage/storage-access-network.json).
