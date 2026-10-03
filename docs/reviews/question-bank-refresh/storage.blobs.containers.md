# Blob containers review

Topic: `storage.blobs.containers`; objective: `st-12`.
Source review: 2026-10-03. Seven questions across
questions/storage/blob-storage.json and the container entries in
questions/storage/reviewed-variants.json (use the ledger for actual paths).
Displayed module: Storage → Blob containers. No label reveals an answer.

## Decisions

Four questions were revised to revision 2; three sound questions retain
revision 1 with refreshed verification dates. Stable question, option, family,
and objective IDs are preserved.

| Question | Result | Pattern / reasoning | Finding or acceptance |
| --- | --- | --- | --- |
| st-container-001 | Revise | Applied setting precedence | Explicitly ordinary container and propagated change; replace restart fiction with anonymous Blob-level versus listing and old/new object misconceptions. |
| st-container-002 | Revise | Troubleshooting authorization failure | Add the observed creation error to justify troubleshooting; keep least-privileged role key and related scope/role alternatives. |
| st-container-003 | Keep | Foundation access boundary | Private container still needs authorization; other choices confuse account permission, listing, or upload time. |
| st-container-004 | Keep | Applied CLI parameter selection | Four real related CLI parameters; exactly login meets the explicit Entra requirement. |
| st-container-005 | Revise | Applied joint-role configuration | Specify reports container scope and no management/data writes; replace unrelated Billing Reader with Contributor. Reader + Blob Data Reader is the unique required pair. |
| st-container-anonymous-level-variant | Keep | Foundation supported anonymous operation | Blob level allows known-URL reads, not enumeration or writes. The changed container access level is a meaningful family variant. |
| st-container-key-mode-variant | Revise | Applied credential/configuration selection | Avoid four auth-mode values when only login/key are valid. Compare valid login, supplied-key, missing-key, and SAS configurations; absence of environment values and listKeys permission disambiguates lookup failure. |

## Rationale evidence

- [Anonymous configuration](https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-configure):
  all options for 001, 003, anonymous-level-variant. Account/container settings
  control requests; propagation can take 30 seconds. Static websites are a
  separate exception, so 001 explicitly uses an ordinary container.
- [Create Container permissions](https://learn.microsoft.com/en-us/rest/api/storageservices/create-container#authorization):
  the containers/write operation and least-privileged Data Contributor key in
  002. Account scope includes creation of a new child container.
- [Role assignment guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access):
  portal visibility plus data access in 005; role scope and separation in 002.
- [CLI authorization](https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-data-operations-cli):
  every option in 004 and the key-mode variant; explicit login/key,
  key retrieval without a supplied key, environment values, and SAS selection.
- [Container CLI reference](https://learn.microsoft.com/en-us/cli/azure/storage/container?view=azure-cli-latest):
  validity of the offered authorization parameters.
- [Storage role definitions](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage):
  Data Contributor/Owner differences in 002 and Blob/Queue Data Reader
  operations in 005.
- [Contributor definition](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/privileged#contributor)
  and [Reader definition](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/general#reader):
  management writes versus read-only resource visibility in 005. Contributor
  has no blob DataActions; supplied keys would be a separate access method.

## Answer and variant review

Final keys: 001 `account-blocks`; 002 `data-contributor`; 003 `denied`;
004 `login`; 005 `reader` + `blob-reader`; anonymous-level variant `read`;
key-mode variant `key`. All single-answer choices were checked independently.

For 005 the two assignments are jointly required. Removing account Reader
loses portal management visibility; removing Blob Data Reader loses blob
read authorization. Of the six offered pairs, only this pair meets both
requirements without writes. Queue Data Reader cannot substitute for blob
access; every pair containing Contributor violates the management boundary.

The anonymous-access family changes Private to Blob and changes the supported
operation. The CLI family changes the required authorization from Entra to a
supplied account key. Both variants were checked independently, including
every distractor. The mix includes direct distinctions, settings precedence,
authorization diagnosis, CLI selection, and a joint-role configuration.

Repository build/check, 13 Node tests, static-site links, review hashes, and
whitespace checks validate the checkpoint. These are author-led technical
reviews; no Azure examples were executed. Automated checks establish structure
and app behavior, not Azure correctness.
