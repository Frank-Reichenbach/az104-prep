# Resource tags and tag governance

Topic ID: identity.governance.tags  
Objectives: id-11  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Tags are key/value metadata for ownership, environment, and cost grouping.
They do not grant access. Resource-group and subscription tags do not
automatically appear on child resources. Tag values are case-sensitive;
standardize values such as Production versus production.
[Tag behavior](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources).

## Apply tags without losing existing metadata

Use write permission on the resource or suitable Microsoft.Resources/tags
permission. Tag Contributor supports tag operations through the tags API;
portal support can differ from the underlying resource's normal write flow.

1. Define a small shared vocabulary, for example Environment, CostCenter,
   and ServiceOwner. Do not put secrets or sensitive personal data in tags.
2. Inspect existing resource tags and resource-type support.
3. Merge the intended changes and read them back.

```sh
az tag update --resource-id '<resource-id>' --operation Merge \
  --tags Environment=Training CostCenter=Learning
az tag list --resource-id '<resource-id>'
```

Merge preserves unrelated keys but replaces the value for a matching key.
`az tag create` and the Replace operation replace the complete tag collection.
[CLI tag operations](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources-cli).

## Enforce and propagate deliberately

Assign a suitable Azure Policy to require a tag or copy a value from a parent.
A Modify policy plus remediation can update existing eligible resources.
First verify that the parent has the intended value and that the policy's
scope/effect matches the resource types.
[Tag policies](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-policies).

Check both resource properties and cost reports. Cost Management tag
inheritance affects cost data and is distinct from physically copying tags
onto the resource. Do not use a cost report's inherited value as proof that
the resource itself was modified.
[Cost tag inheritance](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/enable-tag-inheritance).

## Limits and cleanup

Not every resource supports tags or the same limits. The general maximum is
50 pairs per resource, group, or subscription, with documented exceptions;
management groups do not support tags. Check the current type-specific
requirements when updates fail.
[Tag restrictions](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/tag-resources).

Record existing values and restore only those changed by an exercise. Do not
clear all tags to remove one test key. Tagging itself is metadata management,
but incorrect tags can distort chargeback reports or trigger automation.

[Question data](../../../questions/identity/identity-governance-tags.json).
