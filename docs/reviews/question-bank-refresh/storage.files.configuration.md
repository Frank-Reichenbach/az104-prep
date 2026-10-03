# Azure file share provisioning and configuration review

Topic: `storage.files.configuration`; objective: `st-11`.
Verified: 2026-10-03. Source: questions/storage/storage-files-configuration.json.
The rendered title reveals no protocol boundary, port, or billing combination.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| st-files-protocol | Revise, revision 2 | Foundation protocol boundary | Fix supported account scope; replace Blob-tier distraction with per-account/per-share confusion. Key `single`. |
| st-files-port | Keep, revision 1 | Troubleshooting mount connectivity | DNS succeeds but SMB connection fails; four real remote-service ports distinguish the required path. Key `smb`. |
| st-files-provisioned-v2 | Revise, revision 2 | Applied complete deployment candidates | Compare billing/account-kind pairs; replace Blob Hot and a fictional v1-only account rule. Key `v2`. |

## Rationale evidence

The [Files planning guide](https://learn.microsoft.com/en-us/azure/storage/files/storage-files-planning)
permits separate SMB/NFS shares in a supported account but not dual protocols
on one share. [Blob NFS documentation](https://learn.microsoft.com/en-us/azure/storage/blobs/network-file-system-protocol-support)
describes a different service/protocol capability, not an SMB Files extension.
The [Windows mounting guide](https://learn.microsoft.com/en-us/azure/storage/files/storage-how-to-use-files-windows)
requires TCP 445; management HTTPS does not establish that connection. The
[Azure Files connectivity protocol table](https://learn.microsoft.com/en-us/troubleshoot/azure/azure-storage/files/connectivity/files-troubleshoot)
also distinguishes SMB from REST connectivity. The RDP/SSH choices describe
other remote protocols and cannot supply an SMB connection to this endpoint.

The [classic share creation guide](https://learn.microsoft.com/en-us/azure/storage/files/create-classic-file-share)
recommends provisioned v2 where supported and pairs it with FileStorage, while
pay-as-you-go uses StorageV2. The
[share modification guide](https://learn.microsoft.com/en-us/azure/storage/files/modify-file-share)
distinguishes independent v2 capacity/performance controls from v1's
capacity-linked performance. These establish each candidate's account-kind
and performance disqualifier. Current provisioned-v2 guidance is used rather
than treating FileStorage as v1-only or premium-only. The newer top-level
Microsoft.FileShares model remains supplementary and outside this classic item.

## Acceptance

Each question selects one complete answer. Only the per-share protocol
boundary, TCP 445 path, and FileStorage/provisioned-v2 combination qualify in
their respective scenarios. No joint sets or variants exist. The batch retains
foundation, observed-failure diagnostic, and applied configuration reasoning.
IDs/families remain. Build/check, 13 tests, site links, hashes, and whitespace
checks validate the author-led checkpoint. No Azure shares were provisioned.
