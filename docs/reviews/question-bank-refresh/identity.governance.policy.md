# Azure Policy assignments and remediation review

Topic: `identity.governance.policy`; objective: `id-09`.
Verified: 2026-10-04. Source: questions/identity/identity-governance-policy.json.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| id-policy-audit-deny | Keep, revision 1 | Applied effect selection | Reporting without blocking or corrective changes uniquely selects the offered effect. Key `audit`. |
| id-policy-remediation | Revise, revision 2 | Troubleshooting existing-resource correction | Confirm authorized managed identity and compare evaluation, permissions, effect change, and remediation actions. Key `task`. |
| id-policy-removal | Revise, revision 2 | Foundation deployed-resource lifecycle | Replace role/deny conversions with diagnostic deletion, category, and destination outcomes; state no external cleanup. Key `remain`. |

## Evidence and acceptance

[Audit](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-audit),
[Deny](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-deny),
[Modify](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-modify),
and [DeployIfNotExists](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-deploy-if-not-exists)
support each retained effect rationale. The effects overview records their
purposes; the region scenario requires observation rather than mutation.

Modify documents that existing-resource evaluation marks noncompliance without
editing resources. The
[remediation procedure](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/remediate-resources)
documents execution by the assignment identity. These support the remediation,
rescan, and administrator-permission choices. Audit supports the effect-change
distractor. Only the remediation task meets the scenario's correction goal.

DeployIfNotExists deploys a related resource. The
[policy assignment delete API](https://learn.microsoft.com/en-us/rest/api/policy-authorization/policy-assignments/delete?view=rest-policy-authorization-2026-06-01)
deletes the assignment; the
[diagnostic setting delete API](https://learn.microsoft.com/en-us/rest/api/monitor/diagnostic-settings/delete?view=rest-monitor-2021-05-01-preview)
targets the diagnostic resource separately. The conclusion about preserving
diagnostic configuration is an inference from those distinct resource
lifecycles and the explicit absence of cleanup or configuration changes.
Neither source states that removing this assignment disables categories or
clears destinations. The distractors would require separate setting changes.

The real topic title supplies neither the selected effect nor the corrective
action or lifecycle outcome. Each item has one qualifying individual answer.
No variants or joint sets exist. The batch includes effect selection,
diagnosis, and lifecycle distinction. Stable IDs/families remain. Build/check,
13 tests, site links, hashes, and whitespace checks validate this author-led
checkpoint. No remediation deployments were run.
