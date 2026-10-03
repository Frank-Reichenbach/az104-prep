# Shared access signatures review

Topic: `storage.access.sas`; objective: `st-02`.
Verified: 2026-10-03. Source: questions/storage/storage-access-sas.json.
The Shared access signatures module does not disclose the signing method,
flags, lifetime outcome, or role/scope combination being selected.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| st-sas-private-download | Revise, revision 2 | Applied constrained SAS configuration | Compare four actual SAS configurations. Give the issuer required permissions; isolate signing recommendation from hard single-blob scope and 20-minute duration. Key `delegation`. |
| st-sas-cli-user | Keep, revision 1 | Foundation joint option selection | Real CLI options compare login/signing flags against account-key and stored-policy parameters. Keys `login`, `user`. |
| st-sas-key-expiry | Revise, revision 2 | Troubleshooting lifetime failure | Add successful-then-failing evidence and unchanged roles/network. Replace automatic key switching with expiry precedence, OAuth refresh, and service-policy misconceptions. Key `expire`. |
| st-sas-delegator-scope | Revise, revision 2 | Troubleshooting role and scope | Compare four actual role assignments rather than anonymous access and stored policies. Explicitly prohibit widened blob data access. Key `delegator`. |

## Rationale evidence

The [SAS overview](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview)
supports all signing and scope distinctions in private-download, including
Microsoft's user delegation recommendation, narrow permissions, service/account
key signing, and stored-policy exclusions. The
[CLI creation guide](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-user-delegation-sas-create-cli)
documents separate container/blob generation and the container read scope.
An account SAS cannot select one named blob; user delegation container scope
permits reads beyond that blob. Recommendation failure is distinguished from
technical invalidity in the service-SAS rationale.

The CLI guide and [generate-sas reference](https://learn.microsoft.com/en-us/cli/azure/storage/blob#az-storage-blob-generate-sas)
support every cli-user option: login and as-user select the requested signing
mode together; account-key supplies Shared Key and policy-name names a service
SAS policy. The question selects mode flags, not a complete command; account,
blob, permissions, expiry, and other required context are outside that count.

The CLI guide states that the SAS becomes invalid when its signing key expires.
The [REST delegation reference](https://learn.microsoft.com/en-us/rest/api/storageservices/create-user-delegation-sas)
supports key/OAuth independence and why refreshing the issuer token does not
change an existing signature. The SAS overview supports the stored-policy
exclusion. These establish every key-expiry rationale without assuming automatic
key renewal or an account-key fallback.

The REST reference and CLI guide require generateUserDelegationKey at account,
resource-group, or subscription scope. The
[storage role definitions](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage)
show Delegator's action and lack of DataActions versus Data Reader's broader
reads when assigned at account scope. The
[Reader definition](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/general#reader)
checked earlier on October 3 provides management reads without delegation-key
generation. Together these support every delegator-scope rationale.

## Answer-set and acceptance review

For cli-user the two flags are joint mode components: remove login and the
as-user requirement is unmet; remove as-user and the command does not explicitly
request delegation signing. Replacing either with account-key or policy-name
does not select the required mode. Only the keyed pair qualifies. Each other
item has one qualifying choice under all specified boundaries.

There are no variants. The batch combines configuration choice, direct CLI
recognition, lifetime diagnosis, and permission diagnosis. Newer non-Blob user
delegation support is not used to expand the baseline questions. Stable IDs,
option IDs, families, and objectives are preserved. Build/check, 13 Node tests,
static-site links, ledger hashes, and whitespace checks validate the checkpoint.
This is author-led documentation review; no Azure operations were executed.
