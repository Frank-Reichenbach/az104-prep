# Azure Files identity-based SMB access review

Topic: `storage.files.identity`; objective: `st-05`.
Verified: 2026-10-03. Source: questions/storage/storage-files-identity.json.
The rendered module names the service and access method, without identifying
the failing permission layer, read-only role, or identity-source scope.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| st-files-two-layers | Revise, revision 2 | Troubleshooting observed directory denial | Add a successful root-file read and directory-specific failure; replace automatic key retry and anonymous SMB fiction with authentication and connectivity diagnoses. Key `deny`. |
| st-files-share-role | Revise, revision 2 | Applied constrained role assignment | Require read-only share permissions, state scope and existing grants, and compare neighboring SMB roles with management Reader. Key `smb`. |
| st-files-source-count | Revise, revision 2 | Foundation configuration boundary | Replace padded yes/no answers with four configuration scopes while retaining the account-wide user identity-source principle. Key `one`. |

## Rationale evidence

The [file permission guide](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-configure-file-level-permissions)
supports the directory-denial key. The
[share permission guide](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-identity-assign-share-level-permissions)
distinguishes regular Contributor from privileged roles that override ACLs.
The question excludes such additional grants. The
[authentication overview](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-active-directory-overview)
establishes Kerberos authentication followed by both authorization layers.
Successful reads in the same session disqualify the authentication diagnosis.
The [connectivity troubleshooting guide](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-storage/files/connectivity/files-troubleshoot)
documents SMB's TCP 445 requirement; the successful read disqualifies a blocked
connection as the cause of this directory-specific failure.

For share-role, the [Storage role definitions](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage)
support the read-only Reader key, Contributor's additional writes/deletes, and
Elevated Contributor's additional ACL changes. These are effective alternative
read roles, but they fail the stated restriction on assigned share permissions.
The [general Reader definition](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/general#reader)
has control-plane read actions and no data actions, so cannot supply SMB reads.
The share permission guide supports file-share scope and the explicit exclusion
of other role/default grants.

For source-count, the authentication overview places the choice of AD DS or
Microsoft Entra Domain Services at storage-account scope across its shares.
The share and file guides distinguish authorization scopes from authentication
configuration; subscription-wide selection is inconsistent with the documented
per-account choice. This item concerns the named user identity sources. The
overview's newer, separate managed-identity SMB support can coexist with user
authentication; it is not turned into an exclusion or a new exam objective.

## Answer-set and acceptance review

All three items select one independently evaluated answer; no joint set is
graded. Only the directory ACL matches the observed failure. Only SMB Share
Reader meets the explicit role-operation constraint, regardless of the current
ACL restrictions. Only storage-account scope matches the identity-source
setting. Each wrong choice has a distinct service-related misconception.

There are no variants. The batch contains an observed diagnostic, a constrained
assignment, and a short scope distinction. IDs, option IDs, and families remain
stable. Build/check, 13 Node tests, site links, ledger hashes, and whitespace
checks validate the checkpoint. The technical review is author-led; no Azure
configuration or labs were executed.
