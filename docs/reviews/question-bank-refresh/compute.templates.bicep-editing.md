# Editing Bicep parameters, resources, and modules review

Topic: `compute.templates.bicep-editing`; objective: `co-03`.
Verified: 2026-10-04. Source: questions/compute/compute-templates-bicep-editing.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-bicep-refactor | Revise evidence only, revision 2 | Applied refactor outcome | Sound wording/key `a`; replace tangential source list with direct declaration/update evidence. |
| co-bicep-build | Revise evidence only, revision 2 | Foundation compilation boundary | Sound wording/key `a`; attach CLI, deployment-permission, and capacity evidence. |
| co-bicep-existing | Revise, revision 2 | Applied cross-scope configuration interpretation | Supply target/actual groups, name, explicit scope, and property read. Keys `a`, `b`. |

## Evidence and acceptance

[Resource declarations](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/resource-declaration)
distinguishes symbolic identifiers from deployed names.
[Deployment modes](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-modes)
describes updates to resources identified by their declaration. Together they
support all refactor rationales: unchanged type/name/scope keeps identity;
symbol changes do not rename, delete, or select a deployment scope/history name.
No meaning or key change was needed, but evidence repair receives a revision.

[Bicep CLI build](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-cli)
establishes JSON compilation and diagnostics.
[Deployment workflow](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-cli)
requires target permissions and separates Azure operations from compilation.
[Allocation failures](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/allocation-failure)
documents capacity-dependent Azure VM allocation.
These trace compile-success, permission, and capacity rationales. Policy
evaluation of resource requests is an Azure operation, not compilation; this
follows the documented separation. The retained foundation question has four
relevant checks; its evidence list was inadequate before this review.

[Existing resources](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/existing-resource)
documents no redeployment and cross-group scope. It supports reference behavior,
rg-network selection, and no provisioning/fallback. Deployment permissions
support the remaining rationale: the reference grants no access. Each of the
two keyed assertions is independently true; neither is offered as an entire
repair solution. No additional assertion qualifies. No variants.

The topic label does not resolve the refactor outcome, build boundary, or
cross-group lookup. The batch combines refactor interpretation, a foundation
distinction, and two applied assertions. Stable IDs/families remain.
Author-led evidence is separate from build/check, 13 tests, site links, hashes,
and whitespace validation. No Bicep deployment or Azure lookup was executed.
