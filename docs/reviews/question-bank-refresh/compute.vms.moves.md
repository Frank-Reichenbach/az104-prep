# Moving VMs between scopes and regions review

Topic: `compute.vms.moves`; objective: `co-08`.
Verified: 2026-10-04. Source: questions/compute/compute-vms-moves.json.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| co-move-region | Revise, revision 2 | Foundation location distinction | Compare complete VM/group location pairs instead of replication and name-derived regions. Key `a`. |
| co-move-tenant | Revise, revision 2 | Applied move requirements | State concrete dependencies; compare individual requirements and unsupported dependency split. Keys `a`, `b`. |
| co-move-id | Revise, revision 2 | Troubleshooting stale scope reference | Supply error, completed move, actual location and granted access; compare specific script changes. Key `a`. |

## Evidence and acceptance

[ARM resource moves](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription)
documents unchanged physical location, independent resource-group metadata
location, same-tenant cross-subscription moves, and resource ID changes. These
trace all four location-pair rationales and the tenant/metadata requirements.
[VM move limitations](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-limitations/virtual-machines-move-limitations)
requires virtual network and dependent resources together across subscriptions,
tracing both dependency assertions. The two correct statements are individual
requirements, not a promise that they exhaust all move prerequisites.

The ARM ID includes subscription, resource group, provider/type, and resource
name. With a completed same-subscription move and confirmed access, replacing
the resource group addresses the stale request. A new token, guest hostname,
or different subscription cannot repair that segment. These four rationales
follow the documented ID model plus explicit facts; they do not claim every
NotFound error indicates a move or permission checks are unnecessary generally.

One complete pair or script repair qualifies. The requirements item explicitly
uses individual statements; no joint sets or variants. Topic context names
scope/region moves without resolving the location pair, prerequisites, or ID
repair. One foundation distinction, one applied requirements assessment, and
one observed-failure diagnosis now carry appropriate labels. Stable IDs/families
remain. Build/check, 13 tests, site links, hashes, and whitespace validation are
separate from this author-led source review. No Azure move was executed.
