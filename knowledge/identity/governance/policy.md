# Azure Policy assignments and remediation

Topic ID: identity.governance.policy  
Objectives: id-09  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Azure Policy evaluates resource configuration against rules. A definition
contains the rule; an initiative groups definitions; an assignment applies
one at a scope with parameters. RBAC answers who may act, while Policy can
constrain the resulting configuration.
[Policy concepts](https://learn.microsoft.com/en-us/azure/governance/policy/overview).

Choose an effect deliberately: Audit reports a violation, Deny rejects a
noncompliant request, Modify changes supported properties, and
DeployIfNotExists can deploy required related configuration. A compliance
scan does not automatically repair every old resource.
[Policy effects](https://learn.microsoft.com/en-us/azure/governance/policy/concepts/effect-basics).

## Assign and evaluate

Use Resource Policy Contributor or another role permitting policy assignments.
Remediation also needs an assignment identity and appropriate resource
permissions; assigning those permissions requires separate access authority.

1. Open **Policy → Assignments → Assign policy**.
2. Choose a pilot resource group and the intended built-in definition.
3. Set parameters, exclusions, and a useful noncompliance message. For example,
   choose an allowed-locations policy and specify the intended region list.
4. Review enforcement mode before saving. Use staged evaluation to understand
   impact before production enforcement.
5. Inspect **Compliance**, then test a permitted configuration and a deliberately
   noncompliant request in the disposable scope.
[Assignment procedure](https://learn.microsoft.com/en-us/azure/governance/policy/assign-policy-portal),
[safe rollout](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/policy-safe-deployment-practices).

## Remediate existing resources

For a suitable Modify or DeployIfNotExists assignment, configure its managed
identity and grant only the roles required by the definition. Create a
remediation task for existing noncompliant resources, then inspect its
deployments and failures. The identity performs those corrective actions;
the resource owner's ordinary data credential is not used.
[Remediation procedure](https://learn.microsoft.com/en-us/azure/governance/policy/how-to/remediate-resources).

If remediation fails, inspect identity permissions, policy parameters,
deployment errors, and conflicting locks or policies. A Deny assignment can
report an existing noncompliant resource without deleting it. An exemption is
a recorded exception; scope exclusions remove items from that assignment's
evaluation and should not be used as an unexplained workaround.

## Verify and remove an exercise

Check the actual resource properties after remediation, not just the task
starting. Removing a policy assignment stops that assignment's enforcement;
it does not undo resources/settings already deployed or modified. Remove
exercise remediation grants and disposable artifacts separately. Corrective
deployments can create billable resources, so these examples are not executed.

[Question data](../../../questions/identity/identity-governance-policy.json).
