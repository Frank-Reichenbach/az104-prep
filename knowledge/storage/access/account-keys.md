# Storage account access keys

Topic ID: storage.access.keys  
Objectives: st-04  
Verified: 2026-10-01  
Status: documented; examples have not been executed in Azure.

An account has two interchangeable access keys so applications can move to one
while the other is regenerated. These are powerful data credentials; they are
not per-container passwords. Prefer managed identities and Entra authorization
where supported, and protect unavoidable keys in Key Vault.
[Key management recommendations](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage).

## Rotate without an avoidable outage

Inventory consumers, connection strings, and key-signed SAS first. Use an
identity with `Microsoft.Storage/storageAccounts/regeneratekey/action`;
Storage Account Key Operator Service Role includes key management, whereas
Storage Blob Data Reader does not.
[Storage role definitions](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage).

For a workload currently using key1:

1. Confirm key2 is valid, then update every consumer to key2 through its secure
   configuration mechanism. Test normal requests before proceeding.
2. In the account's **Access keys** page, regenerate key1.
3. Update consumers to the new key1 and verify again.
4. Regenerate key2 only after consumers have stopped using it.
5. Replace any service/account SAS signed with a regenerated key.
[Rotation sequence](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage).

The CLI operation below regenerates key1. It changes a live credential and
can return sensitive key material; the example suppresses normal output.

```sh
az storage account keys renew \
  --resource-group '<group>' --account-name '<account>' \
  --key primary --output none
```

Use `secondary` for key2. The CLI also accepts the aliases `key1` and `key2`.
[CLI renew reference](https://learn.microsoft.com/en-us/cli/azure/storage/account/keys#az-storage-account-keys-renew).

## Disable Shared Key where feasible

Inspect authentication logs and dependencies first. In **Configuration**,
set **Allow storage account key access** to Disabled, or update
`allowSharedKeyAccess` to false. For Blob requests, this blocks account-key
authorization and key-signed SAS; it does not block an otherwise valid user
delegation SAS. Azure Files has service-specific behavior, so do not assume
the Blob restriction has identical effects on every protocol.
[Shared Key prevention](https://learn.microsoft.com/en-us/azure/storage/common/shared-key-authorization-prevent).

Verify a Blob request using an old key fails and an authorized Entra request
works. Network denial can produce a similar failure: test from the same
permitted client and inspect the error/authentication type before changing
permissions. Disabling Shared Key does not remove data.

Key rotation reminders are administrative prompts, not evidence that every
application secret has automatically changed. Remove exercise secrets and
temporary key-management assignments afterward; retain diagnostic records,
not key values. See [SAS](shared-access-signatures.md) for scoped delegation.

[Question data](../../../questions/storage/storage-access-keys.json).
