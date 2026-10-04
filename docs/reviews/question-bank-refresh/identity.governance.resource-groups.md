# Resource group lifecycle and moves review

Topic: `identity.governance.resource-groups`; objective: `id-12`.
Verified: 2026-10-04. Source: questions/identity/identity-governance-resource-groups.json.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| id-rg-location | Revise, revision 2 | Foundation paired location state | Replace padded binary/name/nesting choices with four metadata/resource location mappings. Key `yes`. |
| id-rg-move-region | Keep, revision 1 | Applied management move interpretation | ID, physical region, membership, and cloning outcomes distinguish the move. Key `id`. |
| id-rg-delete | Revise, revision 2 | Foundation lifecycle behavior | Retain wording/options/key; change applied to foundation because this directly recognizes deletion behavior. Key `all`. |

## Evidence and acceptance

[Group management](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/manage-resource-groups-portal)
supports metadata location separate from contained-resource regions. This
traces all four location mappings; neither location changes by implication.
[Management moves](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription)
supports changing the resource ID without changing the Azure region.
[Resource Manager model](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/overview)
supports one group per resource. Together these disqualify region relocation,
dual membership, and copying in the retained move item.

[Group deletion](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/delete-resource-group)
describes deleting contained resources in dependency order. This supports the
deletion key and disqualifies label removal, default-group relocation, and
VM-only stop outcomes. The stem excludes deletion protections; the revision
changes only the reasoning-level label, not technical meaning or scoring.

The displayed topic title does not supply the mapping or outcome. Each item
has one qualifying complete candidate or individual outcome. No joint sets
or variants exist. The batch has two direct foundation distinctions and one
applied move interpretation; this accurately records its limited complexity.
IDs/families remain. Build/check, 13 tests, site links, hashes, and whitespace
checks validate this author-led checkpoint. No resources were moved or deleted.
