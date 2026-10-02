# Shared access signatures

Topic ID: storage.access.sas  
Objectives: st-02  
Verified: 2026-10-01  
Status: documented; examples have not been executed in Azure.

A shared access signature (SAS) delegates specified storage operations for a
limited period. For example, let a contractor download one private blob without
sharing the account key. Microsoft recommends user delegation SAS where
supported. Service SAS uses an account key and one service; account SAS can
span services and service-level operations. Scope permissions, resources, and
expiry narrowly and distribute tokens over HTTPS.
[Microsoft SAS guidance](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview).

## Implement a Blob user delegation SAS

Use an existing private blob, Azure CLI, and an Entra identity with blob read
access. The identity also needs the generateUserDelegationKey action at storage
account, resource-group, or subscription scope. A container-scoped data role
alone cannot grant that account-level action. Storage Blob Delegator at account
scope plus the required container data role can separate these responsibilities.
[Delegation permissions](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-user-delegation-sas-create-cli).

1. Sign in with `az login` and select the intended subscription.
2. Choose a near-term UTC expiry. Replace the placeholders below.
3. Generate the URI in a secure environment; its output is a credential.

```sh
az storage blob generate-sas \
  --account-name '<account>' --container-name '<container>' \
  --name '<blob>' --permissions r --expiry '<YYYY-MM-DDTHH:MMZ>' \
  --auth-mode login --as-user --https-only --full-uri
```

The CLI's `--as-user` requests user delegation signing; `--auth-mode login`
uses the signed-in identity. `r` grants read, not write or list.
[CLI reference](https://learn.microsoft.com/en-us/cli/azure/storage/blob#az-storage-blob-generate-sas).

## Verify, revoke, and troubleshoot

From an allowed network, test a download using the generated URL, then confirm
a write fails. Check expiry, UTC time, resource path, and permissions for a 403.
A declared SAS expiry cannot outlive its signing delegation key, whose maximum
validity is seven days. For emergency account-wide revocation, an authorized
administrator can run:

```sh
az storage account revoke-delegation-keys \
  --resource-group '<group>' --name '<account>'
```

This revokes the account's delegation keys, affecting other delegated SAS too;
cached authorization can delay the effect. A stored access policy cannot
individually revoke a user delegation SAS.
[Lifetime and revocation](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-user-delegation-sas-create-cli).

Remove temporary assignments after an exercise and discard credential output.
Storage operations and outbound data can incur charges even when authorized
by SAS. Tokens are not an inventory of centrally stored objects: Azure Storage
does not provide a list of all generated SAS.
[SAS operational considerations](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview).

The current overview includes newer user-delegation service support beyond
Blob Storage. This implementation and its scored questions deliberately cover
Blob Storage; do not memorize an outdated universal “Blob only” rule.

[Question data](../../../questions/storage/storage-access-sas.json).
