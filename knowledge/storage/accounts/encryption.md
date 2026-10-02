# Storage encryption and customer-managed keys

Topic ID: storage.accounts.encryption  
Objectives: st-09  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Azure Storage encrypts persisted data automatically. Microsoft-managed keys
are the default. Customer-managed keys (CMK) give your organization control of
the wrapping key and its rotation; they do not replace TLS, RBAC, or firewalls.
Microsoft recommends service-side encryption for most workloads.
[Encryption model](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption).

CMK resides in Key Vault or Managed HSM. Azure Storage uses it to protect the
data-encryption key. Losing access to that wrapping key can make data
unavailable, even when the storage account and blobs still exist.
[CMK dependencies](https://learn.microsoft.com/en-us/azure/storage/common/customer-managed-keys-overview).

## Configure an existing account with Key Vault

Use a same-tenant account for this example. Prerequisites include a supported
RSA key, Key Vault soft deletion and purge protection, a storage managed
identity, and network access from the service to the vault. Administrators need
storage configuration permission, key administration permission for creating
the key, and separate role-assignment permission to grant its use.

1. Create or select the protected key vault and key.
2. Enable/select the storage account's managed identity.
3. Grant that identity **Key Vault Crypto Service Encryption User** at the
   vault's appropriate scope when using Azure RBAC.
4. In the storage account's **Encryption** page, select customer-managed keys,
   the identity, and the key URI. Configure automatic version updates or
   select a specific version according to the rotation design.
5. Save, inspect the encryption settings, and test a small write/read.
[Existing-account CMK walkthrough](https://learn.microsoft.com/en-us/azure/storage/common/customer-managed-keys-configure-existing-account).

An administrator's ability to open Key Vault does not prove the **storage
identity** can use its key. If operations fail after a key change, check the
identity assignment, key enabled/expiry state, version, and vault networking.
Keep old versions available until the service has adopted the replacement.
[Rotation and revocation](https://learn.microsoft.com/en-us/azure/storage/common/customer-managed-keys-overview).

## Other encryption boundaries

Infrastructure encryption supplies an additional encryption layer with a
separate Microsoft-managed key. Plan it during account creation; the account
setting cannot simply be toggled later. It is different from configuring
customer ownership of the service-level key.
[Infrastructure encryption](https://learn.microsoft.com/en-us/azure/storage/common/infrastructure-encryption-enable).

A customer-provided key accompanies individual supported Blob requests; it is
different from a vault-backed CMK managed by the account. Encryption scopes
provide container/blob boundaries within an account.
[Encryption choices](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption).

Verify the active key model in the account's Encryption page or its encryption
properties, rather than inferring it from an access key.
[Inspect the key model](https://learn.microsoft.com/en-us/azure/storage/common/storage-encryption-key-model-get).

Key Vault/HSM and key operations can add charges. For cleanup, move disposable
data to a deliberately chosen encryption configuration before removing a key
dependency; never delete a still-required key to save exercise costs.

[Question data](../../../questions/storage/storage-accounts-encryption.json).
