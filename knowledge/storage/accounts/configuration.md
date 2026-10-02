# Storage account creation and configuration

Topic ID: storage.accounts.configuration  
Objectives: st-06  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

A storage account defines the namespace and shared settings for its services.
Standard general-purpose v2 (StorageV2) supports blobs, files, queues, and
tables and is Microsoft's usual starting point. Specialized premium account
types serve specific workloads; “Premium” is not simply an access tier.
Choose the service, performance, region, and redundancy together.
[Account choices](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview).

## Create and configure

Prerequisites: an Azure subscription, a target resource group, and management
permission to create Microsoft.Storage/storageAccounts there. Contributor
can create the resource; separate data roles are needed for Entra data access.

1. Select **Storage accounts → Create** in the portal.
2. Choose subscription, group, location, and a globally unique account name.
   Names use 3–24 lowercase letters or digits.
3. Select Standard/general-purpose v2 for this example. Choose redundancy
   for the required failure scope; the command uses LRS only as an example.
4. Review networking, identity, recovery, encryption, and tags before creating.
   Enable hierarchical namespace only after checking required feature support.
[Creation walkthrough](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create).

Illustrative CLI, using an existing group:

```sh
az storage account create --resource-group '<group>' \
  --name '<uniqueaccountname>' --location '<region>' \
  --kind StorageV2 --sku Standard_LRS \
  --https-only true --min-tls-version TLS1_2 \
  --allow-blob-public-access false --allow-shared-key-access false
az storage account show --resource-group '<group>' \
  --name '<uniqueaccountname>' \
  --query '{kind:kind,sku:sku.name,endpoints:primaryEndpoints}'
```

Before uploading data, apply the intended [network restrictions](../access/network-rules.md).
The example disables Shared Key, so plan Entra authentication and appropriate
data roles. It does not deploy a network or assign those roles.
[CLI account options](https://learn.microsoft.com/en-us/cli/azure/storage/account#az-storage-account-create).

## Verify and operate

Confirm account kind, location, SKU, security properties, and service endpoint.
Create a private test container using Entra authorization and verify a small
upload/download from an approved client. A naming conflict needs a new global
name; an authorization error may require a data role rather than another
management role.

Secure transfer requires HTTPS for REST requests and has protocol-specific
effects on file clients. Minimum TLS is a separate setting: enabling HTTPS
alone is not a statement about the permitted TLS version.
[Secure transfer](https://learn.microsoft.com/en-us/azure/storage/common/storage-require-secure-transfer).

Review provisioned capacity, transactions, replication, retrieval, and egress
costs. Delete only a disposable exercise account after confirming all data can
be discarded. Account deletion is broader than removing one container.

[Question data](../../../questions/storage/storage-accounts-configuration.json).
