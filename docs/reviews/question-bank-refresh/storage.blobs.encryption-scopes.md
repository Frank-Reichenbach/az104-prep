# Blob encryption scopes review

Topic: `storage.blobs.encryption-scopes`; objective: `st-09`.
Verified: 2026-10-03. Source: questions/storage/storage-blobs-encryption-scopes.json.
The displayed title does not reveal override behavior, repair, or access role.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| st-scope-enforced | Revise, revision 2 | Applied complete configurations | Compare the two real scope/default flags across four candidates instead of metadata or assigning a role to a scope. Key `prevent`. |
| st-scope-disabled | Revise, revision 2 | Troubleshooting repair | State the observed failure and working dependencies; replace anonymous access and mutable version-ID fiction with real role/scope actions. Key `scope`. |
| st-scope-vs-rbac | Revise, revision 2 | Foundation encryption/authorization distinction | Replace automatic tokens/firewalls with genuine control-plane, data-plane, vault, and encryption settings. Key `access`. |

## Evidence and option review

The [scope management guide](https://learn.microsoft.com/en-us/azure/storage/blobs/encryption-scope-manage)
documents creation-time default/override controls. Only tenant-a with override
prevention enforces the required upload boundary; permitting overrides accepts
another scope, while selecting tenant-b enforces or defaults to the wrong key
boundary. Each complete configuration is evaluated against every requirement.

The [scope overview](https://learn.microsoft.com/en-us/azure/storage/blobs/encryption-scope-overview)
documents 403 for disabled scopes and recovery by re-enabling the required
scope. It also associates each encrypted blob with its selected scope, so a
new differently named scope does not remove an existing disabled dependency.
The [403 troubleshooting guide](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-storage/blobs/authentication/storage-troubleshoot-403-errors)
distinguishes encryption-scope availability from authorization and networking.
The prompt fixes those layers and Microsoft-managed keys, excluding an
unmentioned vault-key failure. Account-key rotation and more data permissions
do not change the scope state.

For vs-rbac, [Entra Blob authorization](https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-access-azure-active-directory)
supports container-scoped data Reader; [management Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/general#reader)
lacks data actions. The [vault role table](https://learn.microsoft.com/en-us/azure/key-vault/general/rbac-guide)
grants wrapping rather than Blob reads. The scope management guide assigns
encryption defaults, not customer identity permissions. These sources support
all four distinct controls and their disqualifiers.

Each item has one qualifying answer. No joint components or variants are
present. The batch has configuration comparison, observed-failure repair, and
a short control-layer distinction. Stable IDs/families remain. Build/check,
13 tests, site links, hashes, and whitespace checks validate the checkpoint;
technical review is author-led, with no Azure labs executed.
