# Azure Files identity-based SMB access

Topic ID: storage.files.identity  
Objectives: st-05  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Identity-based SMB access authenticates a user with Kerberos and then evaluates
share permissions and Windows file/directory access control lists (ACLs).
Choose one identity source per storage account: AD DS, Microsoft Entra Domain
Services, or Microsoft Entra Kerberos. Match the choice to the client and
directory prerequisites; an Entra sign-in alone is not an SMB configuration.
[Identity options](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-active-directory-overview).

## Implement an existing AD DS environment

This example assumes a Windows client with domain connectivity, an existing
SMB share, synchronized user/group identities, and access to the storage
endpoint on TCP 445. Administrative setup needs permission to configure the
storage account and create its AD identity. Role assignment requires separate
Azure RBAC administration permissions.

1. Follow Microsoft's AzFilesHybrid setup from a domain-connected Windows
   machine. Import the module, sign in to Azure, and run its
   `Join-AzStorageAccount` workflow with the intended resource group, storage
   account, and AD organizational unit.
2. Verify the storage account's directory properties and AD service identity.
   Run `Debug-AzStorageAccountAuth` for the signed-in AD user to diagnose
   domain, Kerberos, and account configuration problems.
[AD DS implementation](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-ad-ds-enable).

3. At the **file share's IAM scope**, assign a group Storage File Data SMB
   Share Reader or Contributor according to its tasks. Use Elevated Contributor
   only when users need the corresponding permission to modify ACLs.
4. Prefer explicit group assignments to a default share permission for every
   authenticated identity. If synchronization is unavailable, default
   share-level permission is an alternative that still requires restrictive
   ACLs.
[Share permission design](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-assign-share-level-permissions).

5. Mount with an administrative identity authorized to set ACLs. Use Windows
   File Explorer **Security** or `icacls` to grant the intended group access
   to its directories. For the AD DS example, ACL administration needs domain
   controller connectivity. Normal users must satisfy both permission layers.
[File permissions](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-configure-file-level-permissions).

## Verify and distinguish failures

Test with a normal user, not a cached account-key connection. Confirm the user
can read an allowed file, cannot read a restricted directory, and cannot write
when only Reader is assigned. Inspect share role, group membership, Kerberos
ticket, ACL inheritance/deny entries, and port 445 reachability in that order.

An account-key mount can hide an identity-configuration defect and cannot
demonstrate per-user access. Microsoft recommends identity-based access and
periodic maintenance of the storage account's directory/Kerberos credentials.
[Azure Files security guidance](https://learn.microsoft.com/en-us/azure/storage/files/secure-files).

The current Entra Kerberos documentation also describes cloud-only identities;
check its current client prerequisites rather than assuming only hybrid users
are supported.
[Entra Kerberos setup](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-auth-hybrid-identities-enable).

Remove temporary roles, mappings, and test ACLs after an exercise. Shares,
snapshots, networking, and managed domain services can incur separate charges.
Do not disable a production identity source as a cleanup step.

[Question data](../../../questions/storage/storage-files-identity.json).
