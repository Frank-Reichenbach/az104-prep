# Service endpoints and subnet authorization review

Topic: `networking.security.service-endpoints`; objective: `nw-09`.
Verified: 2026-10-04. Source: questions/networking/networking-security-service-endpoints.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| nw-se-two-sides | Revise, revision 2 | Applied account network configuration | Specify public-endpoint/subnet-only goal and no exceptions; compare complete network modes/rules. Key `a`. |
| nw-se-private | Keep, revision 1 | Foundation endpoint distinction | Classic endpoint extends subnet identity while retaining the public service endpoint. Key `b`. |
| nw-se-auth | Revise, revision 2 | Troubleshooting missing data role | Replace padded yes/no with role/principal/network repairs and verified token/path. Key `c`. |

## Evidence and acceptance

[Service endpoints](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-service-endpoints-overview)
documents subnet identity, unchanged public service endpoint, separate service
rules, and on-premises identity limits. [Restriction procedure](https://learn.microsoft.com/en-us/azure/virtual-network/tutorial-restrict-network-access-to-resources)
and [storage VNet rules](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-virtual-networks)
trace all account configurations: selected networks plus the client subnet
works, disabled public access blocks this model, all networks is not subnet-only,
and a different subnet rule omits the client. The retained item rejects private
IP allocation, automatic data roles, and VPN inheritance independently.

[Blob authorization](https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-access-azure-active-directory)
and [role assignment](https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access)
trace the data-role key and wrong management role/principal. Network-rule
repetition does not grant token data authorization. Newly assigned roles can
take time to propagate; the selected repair does not promise instant recovery.

Exactly one complete configuration/repair or assertion qualifies per item.
No joint sets or variants. Classic service endpoints avoid importing the
standard service endpoint preview as an exam requirement. The displayed title
does not select the account access mode, public/private behavior, or token
principal authorization. Stable IDs/families remain. Author-led review is
separate from build/check, 13 tests, site links, hashes, and whitespace validation.
No endpoint, account firewall, or role assignment was changed in Azure.
