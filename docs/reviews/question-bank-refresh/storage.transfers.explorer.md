# Storage Explorer connections and data management review

Topic: `storage.transfers.explorer`; objective: `st-10`.
Verified: 2026-10-03. Source: questions/storage/storage-transfers-explorer.json.
The rendered topic does not disclose attachment method, role, or detach scope.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| st-explorer-data-only | Revise, revision 2 | Applied constrained connection | Replace subscription Owner and display-label fiction with supported connection/discovery approaches; fix private status and no-new-grants/key constraints. Key `attach`. |
| st-explorer-reader-data | Revise, revision 2 | Troubleshooting permission repair | Replace tags, policy, and DNS administration with related management/data/delegation roles; isolate the observed data-permission failure. Key `data`. |
| st-explorer-detach | Keep, revision 1 | Foundation local/remote distinction | Local disconnect, data deletion, SAS revocation, and signing-key rotation are distinct lifecycle actions. Key `local`. |

## Rationale evidence

The [connection guide](https://learn.microsoft.com/en-us/azure/storage/storage-explorer/vs-azure-tools-storage-manage-with-storage-explorer)
documents direct Entra resource attachment, account name/key attachment, and
public container attachment. Its management/data distinction supports direct
URL access when discovery is unavailable. New management Reader violates the
explicit no-new-grant requirement; account-key attachment violates the key
constraint; public attachment cannot authorize this private resource.

The [Explorer troubleshooting guide](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-storage/blobs/alerts/storage-explorer-troubleshooting)
requires data Reader for downloads independently of management discovery.
The [Storage role definitions](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/storage)
distinguish Blob Data Reader, delegation-key generation, and Queue reads;
[management Reader](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/general#reader)
has no data actions. At container scope, a delegation grant neither supplies
OAuth Blob reads nor an account-level key-generation capability.

For detach, the troubleshooting guide repairs an unremovable SAS attachment by
removing its local-storage entry, establishing the local connection boundary.
Microsoft's [PST-upload procedure](https://learn.microsoft.com/en-us/purview/use-network-upload-to-import-pst-files)
also uses Detach to disconnect while uploaded data remains for import. The
Blob management guide treats remote deletion as a separate operation; the
troubleshooting guide treats SAS expiry/policy revocation and account-key
regeneration separately. The retained option rationales do not promise token
revocation or resource deletion as a side effect of local detachment.

## Acceptance

Each question has one qualifying choice. Every connection procedure is checked
against the stated constraints, and every role against the specified data
operation. No joint sets or variants exist. The batch retains applied,
troubleshooting, and foundation decisions. Stable IDs/families remain.
Build/check, 13 tests, site links, hashes, and whitespace checks validate the
author-led checkpoint; Storage Explorer was not used to change Azure resources.
