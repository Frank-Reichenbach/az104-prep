# Storage encryption and customer-managed keys review

Topic: `storage.accounts.encryption`; objective: `st-09`.
Verified: 2026-10-03. Source: questions/storage/storage-accounts-encryption.json.
The rendered topic supplies context without identifying a key configuration,
role, or required protection.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| st-encryption-default | Revise, revision 2 | Foundation default comparison | Replace SAS-triggered encryption fiction and transport confusion with real at-rest key/layer choices. Key `managed`. |
| st-encryption-identity | Revise, revision 2 | Troubleshooting constrained permission repair | Specify RBAC mode, service identity, working prerequisites, scope, and permitted operations; compare related Key Vault roles. Key `role`. |
| st-encryption-vault-protection | Revise, revision 2 | Foundation paired requirements | Replace anonymous keys and Blob-on-vault fiction with logging and rotation; correct the applied label for a direct requirements distinction. Keys `soft`, `purge`. |

## Evidence for every rationale

The [service encryption guide](https://learn.microsoft.com/en-us/azure/storage/common/storage-service-encryption)
supports default Microsoft-managed encryption, optional vault-backed keys, and
optional customer-provided Blob request keys. The
[infrastructure encryption procedure](https://learn.microsoft.com/en-us/azure/storage/common/infrastructure-encryption-enable)
requires explicitly enabling the additional layer; default encryption alone
does not establish double encryption.

The [existing-account CMK procedure](https://learn.microsoft.com/en-us/azure/storage/common/customer-managed-keys-configure-existing-account)
assigns key-use permission to the storage managed identity. The
[Key Vault RBAC role table](https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide)
maps Service Encryption User to metadata/wrap/unwrap, Reader to metadata only,
Crypto User to broader cryptographic operations, and Secrets User to secret
contents. Only the keyed role repairs access within the specified permission
limit. The scenario removes key-state and network failures as alternative causes.

The CMK procedure requires soft delete and purge protection. This is a service
prerequisite, rather than a recommendation to enable every vault feature.
[Logging](https://learn.microsoft.com/en-us/azure/key-vault/general/logging)
records operations; [rotation](https://learn.microsoft.com/en-us/azure/key-vault/keys/how-to-configure-key-rotation)
creates replacement versions. Neither supplies deletion recovery/purge retention.
The question does not claim soft delete can be disabled on a new vault.

## Acceptance

Each single-answer item has one qualifying complete choice. The protection
item keys two individually required assertions: removing either omits a CMK
prerequisite, and neither logging nor rotation substitutes for it. Only one
pair qualifies. There are no variants. Stable IDs and families remain; the
batch contains two direct distinctions and one observed failure with a
constrained repair, rather than pretending the paired recall item is applied.
Build/check, 13 tests, site links, hashes, and whitespace checks validate this
author-led review. No Azure configuration or labs were executed.
