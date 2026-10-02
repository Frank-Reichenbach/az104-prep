# Storage Explorer connections and data management

Topic ID: storage.transfers.explorer  
Objectives: st-10  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Storage Explorer is a desktop client for managing storage data. Prefer Entra
connections when suitable. Subscription browsing involves ARM discovery;
direct attachment to a container can work with data-only permissions.
A successful sign-in is not proof that the selected identity can read data.
[Connection choices](https://learn.microsoft.com/en-us/azure/storage/storage-explorer/vs-azure-tools-storage-manage-with-storage-explorer).

## Connect and manage blobs

Install the app for the supported operating system and use a client allowed by
the [storage network rules](../access/network-rules.md).

1. Open **Account Management**, sign in, and select the correct cloud, tenant,
   and subscriptions.
2. To browse accounts, ensure the identity has management read permission.
   Assign Storage Blob Data Reader for downloads or Contributor for uploads
   at the necessary data scope.
3. With only container data permission, use **Connect → Blob container →
   Sign in using Microsoft Entra ID** and supply the container URL directly.
4. Expand the container, upload a small test file, refresh the listing, and
   download it for comparison.
[Required permissions](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-storage/blobs/alerts/storage-explorer-troubleshooting).

For temporary delegated access, attach using a container SAS URL instead.
A display name is only a local connection label; it does not rename the Azure
resource. Account-key connections are broader credentials, not a remedy for
every failed Entra operation.
[Attach a resource](https://learn.microsoft.com/en-us/azure/storage/storage-explorer/vs-azure-tools-storage-manage-with-storage-explorer).

Use the Blob interface to inspect properties, metadata, versions, and available
recovery actions. Confirm the selected account/container before a delete,
copy, or access-tier operation. For bulk transfer, inspect the activity result
and any per-item failures instead of assuming every item succeeded.
[Blob management walkthrough](https://learn.microsoft.com/en-us/azure/storage/storage-explorer/vs-azure-tools-storage-explorer-blobs).

## Troubleshoot and clean up

Separate discovery failures from data failures: Reader may make the account
visible but does not authorize Blob reads. Refresh after permission changes;
check tenant selection, expired SAS, proxy/TLS failures, and firewall rules.
Do not solve a missing container permission by handing out account keys.
[Troubleshooting](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-storage/blobs/alerts/storage-explorer-troubleshooting).

Remove the local attachment or sign out when finished. Detaching a connection
does not delete the Azure account or its data. Remove disposable test objects
separately, with appropriate authorization. Normal storage operations and
transfers performed by the desktop app can still incur Azure charges.

[Question data](../../../questions/storage/storage-transfers-explorer.json).
