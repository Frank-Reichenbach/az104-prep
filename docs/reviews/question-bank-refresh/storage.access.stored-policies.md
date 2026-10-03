# Stored access policies review

Topic: `storage.access.stored-policies`; objective: `st-03`.
Verified: 2026-10-03. Source: questions/storage/storage-access-stored-policies.json.
Displayed module context does not select an ACL action, compatible credential,
or quota scope.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| st-policy-revoke-group | Revise, revision 2 | Applied selective revocation | Make preservation of other ACL entries explicit; replace unrelated tier change with Private/authorized-SAS confusion. Key `delete`. |
| st-policy-compatible | Keep, revision 1 | Foundation credential distinction | Real neighboring service SAS, account SAS, delegation SAS, and OAuth mechanisms; exactly service SAS supports the policy reference. Key `service`. |
| st-policy-sixth | Revise, revision 2 | Troubleshooting quota scope | Compare policy entry, token, account, and authorized-blob counts. Add a separate full container to expose the per-resource boundary. Key `limit`. |

## Rationale evidence

[Define a stored access policy](https://learn.microsoft.com/en-us/rest/api/storageservices/define-stored-access-policy)
documents selective revocation by removing an identifier while passing the
collection of identifiers to keep. It also supports compatible's service-SAS
restriction and the exclusion of account/user delegation credentials; OAuth
does not use this SAS policy association. The
[SAS overview](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview)
checked in the previous topic distinguishes key-signed SAS from Entra request
authorization, supports account-key regeneration's broader effect, and explains
that token issuance is not restricted to five tokens.

For revoke-group, the [anonymous-access configuration guide](https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure)
checked earlier on October 3 distinguishes anonymous reads from credentialed
SAS requests. Management Reader role removal does not invalidate account-key
SAS signatures. The direct policy guide supports all quota alternatives:
five entries per supported resource, multiple blob associations, and no
five-entry pool shared between different containers.

The policy guide describes both propagation of created/updated policies and
revocation behavior. This batch makes no scored promise of an exact immediate
revocation delay; verification must observe the affected requests.

## Acceptance and verification

Exactly one listed action satisfies selective revocation without key rotation;
exactly one credential supports the association; exactly one quota statement
matches documented resource scope. All alternatives were checked, including
why a Private setting does not revoke a valid SAS. There are no variants.
The mix is applied revocation, foundation credential distinction, and observed
quota failure. Stable IDs, option IDs, families, and objectives are preserved.

Build/check, 13 Node tests, static-site links, ledger hashes, and whitespace
checks validate the checkpoint. This is author-led source review; no Azure
operations were executed. Automated checks do not prove service behavior.
