# Resource tags and tag governance review

Topic: `identity.governance.tags`; objective: `id-11`.
Verified: 2026-10-04. Source: questions/identity/identity-governance-tags.json.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| id-tag-inheritance | Revise, revision 2 | Foundation paired tag state | Replace padded yes/no and creator-role claims with group/VM tag states. Key `no`. |
| id-tag-merge | Revise, revision 2 | Applied CLI completion | Compare four complete commands and a targeted Delete operation; specify variable and existing keys. Key `merge`. |
| id-tag-policy-existing | Keep, revision 1 | Applied population update | Modify plus remediation updates resource tags; Audit, billing inheritance, and parent tagging cannot supply that mutation. Key `modify`. |

## Evidence and acceptance

[Tag behavior](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources)
supports the absent default inheritance and separate parent/resource metadata.
This traces all four paired-state rationales: no copy, transfer, or parent
removal occurs in the stated deployment.
[CLI operations](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources-cli)
supports Merge, Create, Replace, and selective Delete semantics. This traces
all command rationales; only Merge adds the new key while preserving the old.

[Tag policies](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-policies)
and [Modify remediation](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-modify)
support the retained key. [Audit](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-audit)
reports without editing. [Cost inheritance](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/enable-tag-inheritance)
affects usage records, not resource tags. Tag behavior disqualifies automatic
parent propagation. These trace all retained option rationales.

Each item has one qualifying complete candidate or individual solution.
No joint sets or variants exist. The topic label supplies neither a state,
operation, nor population-update mechanism. The batch includes a foundation
distinction and two implementation decisions. IDs/families remain. Build/check,
13 tests, site links, hashes, and whitespace checks validate this author-led
checkpoint. Commands are examples and were not executed against Azure.
