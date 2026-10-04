# Private endpoints, approval, and DNS review

Topic: `networking.security.private-endpoints`; objective: `nw-10`.
Verified: 2026-10-04. Source: questions/networking/networking-security-private-endpoints.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| nw-pe-public | Revise, revision 2 | Applied public/private access boundary | Replace padded yes/no with changes distinguishing network access, anonymous access, IP allocation, and approval. Key `b`. |
| nw-pe-dns | Revise, revision 2 | Troubleshooting missing client zone link | Specify resolver, correct record, peering, and missing client link; compare complete DNS changes. Key `a`. |
| nw-pe-subresource | Keep, revision 1 | Foundation target subresource | Blob endpoint does not supply file SMB path; add file endpoint and configuration. Key `c`. |

## Evidence and acceptance

[Storage private endpoints](https://learn.microsoft.com/en-us/azure/storage/common/storage-private-endpoints)
documents independent public network controls, per-subresource endpoints,
normal service hostname use, and DNS. It traces the public-network key,
approval/allocation misconceptions, and each retained file-path rationale:
DNS renaming and a blob role cannot change the endpoint target, and a blob
endpoint is not an SMB proxy. [Anonymous access](https://learn.microsoft.com/en-us/azure/storage/blobs/anonymous-read-access-prevent)
distinguishes blocking anonymous reads from blocking all public network access.

[Private endpoint DNS](https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-dns)
documents client resolution through zone links/resolvers and the blob/file
zone mapping. It traces all DNS changes: adding the client-VNet link exposes
the correct record; wrong subresource zone, public-address replacement, or
link removal cannot provide the missing private lookup. Peering connectivity
does not automatically give the client Azure-provided DNS access to a zone
linked only to the hub. The specific resolver assumption excludes a custom
forwarder that might already supply that path.

One complete change/assertion meets each goal. No joint sets or variants.
The rendered title supplies context without identifying the correct network
control, client link, or file subresource. Stable IDs/families remain.
Author-led source review is separate from build/check, 13 tests, site links,
hashes, and whitespace validation. No private endpoint or DNS change ran.
