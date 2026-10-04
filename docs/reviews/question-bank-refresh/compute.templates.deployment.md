# Validating and deploying ARM and Bicep review

Topic: `compute.templates.deployment`; objective: `co-04`.
Verified: 2026-10-04. Source: questions/compute/compute-templates-deployment.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-deploy-scope | Revise classification, revision 2 | Foundation command/scope distinction | Wording/key `a` remain; direct scope recall was labeled applied. |
| co-deploy-preview | Keep, revision 1 | Foundation operation comparison | Current-state preview differs from creation, history removal, and compilation. Key `a`. |
| co-deploy-rbac | Revise, revision 2 | Troubleshooting denied operation | State the failing operation/error/scope and compare nearby authorization actions. Key `a`. |

## Evidence and acceptance

[Bicep deployment CLI](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-cli)
documents group/subscription/management-group/tenant commands and applying
deployments. All four scope rationales trace to its command mapping.
[What-if](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-what-if)
documents comparison without applying resource changes.
[Bicep CLI build](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-cli)
documents compilation to JSON.
[History deletion](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-history-deletions)
documents removal of deployment records. These distinguish all preview options:
creation applies changes regardless of history name; removal is not a proposed
resource comparison; compilation is not an Azure-state comparison. No change
was needed to the preview wording, key, or explanations.

[Privileged built-in roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/privileged)
shows Contributor exclusions and separate role assignment/definition actions.
[Assignments through templates](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-template)
requires roleAssignments/write at assignment scope. Both trace each permission
rationale; read, definition write, and assignment delete do not grant assignment
create. The observed AuthorizationFailed and successful VM operation make this
troubleshooting, not just a generic permission question. No role condition or
deny assignment creates an alternative cause under the explicit facts.

One individual command/operation/action qualifies per item; no joint sets or
variants. The displayed topic label does not reveal the required scope command,
preview operation, or exact authorization action. This topic contains two
foundation distinctions and one troubleshooting decision; it does not pretend
the original scope recall requires applied reasoning. Stable IDs/families remain.
Build/check, 13 tests, site links, hashes, and whitespace checks validate this
author-led checkpoint. No Azure deployment or role grant was executed.
