# Stored access policies

Topic ID: storage.access.stored-policies  
Objectives: st-03  
Verified: 2026-10-01  
Status: documented; examples have not been executed in Azure.

Use a stored access policy to centrally change or revoke a group of
**service SAS** credentials. It does not control account SAS or user delegation
SAS. Policies belong to a container, share, queue, or table; a container policy
can also govern SAS for individual blobs. A resource allows five policies,
not merely five SAS.
[Policy scope and limits](https://learn.microsoft.com/en-us/rest/api/storageservices/define-stored-access-policy).

## Implement and inspect

For a Blob exercise, use a private container and an authorized administrator.
Managing its ACL with Entra requires the container write action, available in
Storage Blob Data Contributor. Issuing a service SAS separately requires the
account key (or permission to retrieve it). Do not confuse these permissions.
[Set Container ACL authorization](https://learn.microsoft.com/en-us/rest/api/storageservices/set-container-acl),
[service SAS signing](https://learn.microsoft.com/en-us/azure/storage/blobs/sas-service-create-dotnet).

1. Open the container in the Azure portal and select **Access policy**.
2. Add a stored policy named `contractor-read`, permission Read, and a UTC
   expiry appropriate for the exercise; save.
3. In a service-SAS-capable SDK, set the SAS builder's signed identifier to
   `contractor-read`, sign using a securely supplied account key, and share
   only the resulting SAS URI.
4. Keep permission/expiry fields in the policy instead of repeating the same
   fields in the token. A field cannot be specified in both places.
5. Read the container ACL back and confirm the identifier and restrictions.
   Test a blob read and a rejected write using the SAS from an allowed network.
   Policy creation or modification can take up to 30 seconds to propagate.
[Policy parameters](https://learn.microsoft.com/en-us/rest/api/storageservices/define-stored-access-policy).

## Revoke and verify

Delete the identifier or replace it with a new identifier, as Microsoft's
service SAS example recommends. Associated SAS then lose their policy link.
Do not re-create the old identifier as a “cleanup” shortcut: doing so can
restore old credentials while their other validity conditions remain satisfied.
Verify that the old URL fails and the newly issued URL works.
[Service SAS policy management](https://learn.microsoft.com/en-us/azure/storage/blobs/sas-service-create-dotnet).

When updating ACLs through REST/SDK, preserve other policy entries that must
remain: Set Container ACL supplies the policy collection. Accidentally omitting
an entry revokes its users too. An empty policy list removes all entries.
[ACL request semantics](https://learn.microsoft.com/en-us/rest/api/storageservices/set-container-acl).

A policy is unrelated to Azure Policy governance and grants no network bypass.
Remove the exercise policy and temporary grants afterward; data requests still
have normal storage transaction/transfer costs. For new applications without a
service-SAS requirement, consider [user delegation SAS](shared-access-signatures.md).

[Question data](../../../questions/storage/storage-access-stored-policies.json).
