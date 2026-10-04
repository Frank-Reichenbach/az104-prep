# Subscription administration and provider registration review

Topic: `identity.governance.subscriptions`; objective: `id-13`.
Verified: 2026-10-04. Source: questions/identity/identity-governance-subscriptions.json.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| id-sub-context | Keep, revision 1 | Foundation CLI context | Choices distinguish context selection from moves, directory association, and billing transfer. Key `context`. |
| id-sub-provider | Revise, revision 2 | Troubleshooting subscription/namespace | Compare provider actions and specify the deployment target. Key `register`. |
| id-sub-directory-transfer | Revise, revision 2 | Applied dependency recovery plan | Specify system-assigned identity and compare destination access plans rather than region/name transformations. Key `rbac`. |

## Evidence and acceptance

[CLI subscription management](https://learn.microsoft.com/en-us/cli/azure/manage-azure-subscriptions-azure-cli)
supports selecting the active context. It does not perform a resource move,
directory reassociation, or billing transfer, supporting all retained rationales.
[Provider registration](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/resource-providers-and-types)
supports subscription-specific namespace registration and its permission.
This traces all four provider choices: wrong namespace or subscription cannot
repair SubA's prerequisite; unregistering elsewhere does not register SubA.
Inspection does not imply that every region must finish before deployment.

[Directory transfer checklist](https://learn.microsoft.com/en-us/azure/role-based-access-control/transfer-subscription)
documents role-assignment loss, principal mapping, and disabling/reenabling
system-assigned identities. It separately addresses billing ownership. These
support every recovery-plan rationale: retaining the old directory dependencies,
reusing old principal IDs, or replacing resource permissions with billing roles
fails the destination-tenant goal. User-assigned identity repair is deliberately
outside this stem because its procedure differs.

The label does not select a command context, provider target, or recovery plan.
Every item has one sufficient individual solution/complete candidate. No joint
sets or variants exist. The batch has context recognition, diagnosis, and
dependency planning. IDs/families remain. Build/check, 13 tests, site links,
hashes, and whitespace checks validate this author-led checkpoint. No providers,
subscriptions, identities, or billing ownership were changed.
