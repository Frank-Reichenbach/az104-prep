# Azure file share provisioning and configuration

Topic ID: storage.files.configuration  
Objectives: st-11  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Azure Files supplies managed file shares. Choose SMB or NFS for a share; the
same share does not serve both protocols. This topic uses classic shares under
Microsoft.Storage accounts. The newer Microsoft.FileShares top-level resource
model is supplementary and has different deployment instructions.
[Deployment planning](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-planning).

## Select a model

Current guidance recommends provisioned v2 for new classic shares where
available. It uses FileStorage accounts and supports separate capacity,
IOPS, and throughput provisioning. FileStorage is therefore no longer a
reliable synonym for “premium only”: current v2 SKUs include HDD/Standard.
Pay-as-you-go StorageV2 and provisioned v1 remain supported.
[Current creation guidance](https://learn.microsoft.com/en-us/azure/storage/files/create-classic-file-share).

Match protocol, media, region, and redundancy before selecting a SKU. Do not
apply Blob's RA-GRS secondary-read behavior to Azure Files.
[Files management concepts](https://learn.microsoft.com/en-us/azure/storage/files/files-management-concepts).

## Implement and connect

With permission to create/configure the storage account and file share:

1. In **Create storage account**, choose Azure Files as the primary service,
   the supported media tier, provisioned v2 billing, and redundancy.
2. Open **File shares → + File share**. Enter a name, choose the supported
   protocol, and specify provisioned capacity and performance.
3. Review the account's networking and per-protocol encryption settings.
4. For SMB, configure [identity access](identity-based-access.md) and share/
   directory permissions before mounting with a normal user.
5. Use the share's **Connect** guidance for the client OS. On Windows, confirm
   TCP 445 reachability, resolve the endpoint, and mount the UNC path
   `\\<account>.file.core.windows.net\<share>`.
[Windows mounting](https://learn.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-windows).

## Verify, resize, and troubleshoot

Create, read, and delete a disposable file with the intended identity. Inspect
capacity and performance metrics rather than assuming every slow share needs
more storage. In a provisioned v2 share's size/performance settings, adjust
capacity, IOPS, or throughput within its supported limits. Other billing models
have different scaling and cooldown rules.
[Modifying a share](https://learn.microsoft.com/en-us/azure/storage/files/modify-file-share).

For a mount failure, separate DNS/port reachability from authentication and
ACL errors. Blob NFS 3.0 and hierarchical namespace account settings do not
configure an Azure Files NFS 4.1 share. For SMB directory access denial,
check both permission layers instead of replacing user credentials with a key.

Enable [share soft deletion](soft-delete.md) and use
[snapshots](snapshots.md) or backup for file-level recovery. Provisioned
capacity/performance, retained snapshots, and soft-deleted data affect cost.
Unmount test clients and remove disposable shares only after checking retention
and recovery needs; deletion may leave billed retained data.

[Question data](../../../questions/storage/storage-files-configuration.json).
