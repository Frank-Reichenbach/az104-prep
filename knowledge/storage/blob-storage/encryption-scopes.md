# Blob encryption scopes

Topic ID: storage.blobs.encryption-scopes  
Objectives: st-09  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Encryption scopes separate encryption-key boundaries inside one storage
account. A container can have a default scope, and its configuration decides
whether an upload may use another scope. This controls encryption selection;
it is not an Azure RBAC assignment.
[Scope model](https://learn.microsoft.com/en-us/azure/storage/blobs/encryption-scope-overview).

## Implement a container boundary

Prerequisites: permission to create storage encryption scopes, a supported
account, and container data permissions. A customer-managed scope also needs
the managed identity and protected vault described in
[account encryption](../accounts/encryption.md).

1. In **Storage account → Encryption → Encryption scopes**, create a scope.
2. Select Microsoft-managed keys, or configure the required CMK and identity.
   If infrastructure encryption is needed at scope level, decide at creation.
3. Create a new container with that default scope. Set override prevention
   when every blob must use the chosen boundary.

```sh
az storage container create --account-name '<account>' \
  --name '<container>' --default-encryption-scope '<scope>' \
  --prevent-encryption-scope-override true --auth-mode login
```

Microsoft's management guide documents this creation-time container setting.
Do not assume adding an account scope automatically changes all existing
containers or rewrites older data.
[Create and apply scopes](https://learn.microsoft.com/en-us/azure/storage/blobs/encryption-scope-manage).

## Verify and troubleshoot

Upload a small blob without overriding the scope and inspect its encryption
properties. Attempt a second upload using a different scope: with override
prevention enabled, expect rejection. A 403 in this case can indicate the
container encryption policy rather than a missing data role.
[Diagnose scope failures](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-storage/blobs/authentication/storage-troubleshoot-403-errors).

Disabling a scope blocks subsequent reads and writes that depend on it.
This is a key availability control, not a data deletion command. Plan recovery
and re-enable the scope if it was disabled inadvertently.
[Disabling scopes](https://learn.microsoft.com/en-us/azure/storage/blobs/encryption-scope-overview).

Review access-tier feature constraints and scope billing before adoption.
Use a separate disposable container to test; remove test data and disable
unused exercise scopes only after checking dependencies. Do not remove a key
that still protects retained blobs.

[Question data](../../../questions/storage/storage-blobs-encryption-scopes.json).
