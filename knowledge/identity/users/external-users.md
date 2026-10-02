# External users and B2B collaboration

Topic ID: identity.users.external  
Objectives: id-04  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

B2B collaboration lets an external person use an existing identity to access
resources in a workforce tenant. The resource tenant holds a guest object and
controls its access. The invitation is an onboarding step, not automatic
subscription-wide permission.
[Guest invitation](https://learn.microsoft.com/en-us/entra/external-id/add-users-administrator).

## Invite and grant access

Use Guest Inviter or another authorized inviter, subject to the tenant's
external collaboration restrictions.

1. Open **Entra ID → Users → New user → Invite external user**.
2. Enter the intended external address, review identity information, and
   create the invitation. Do not create a new internal password account merely
   because the user is outside your organization.
3. Give the guest only the required group/application or Azure resource role.
4. Have the guest redeem the invitation with the expected identity, then verify
   the guest object and sign-in record.
[Invitation redemption](https://learn.microsoft.com/en-us/entra/external-id/redemption-experience).

For an exercise, use a controlled test identity; sending invitations is an
external communication and these notes do not send any.

## Configure collaboration boundaries

External collaboration settings govern who may invite and domain restrictions.
Cross-tenant access settings additionally govern inbound/outbound B2B access
for partner organizations, users/groups, and applications. These controls are
not interchangeable with the application's own authorization.
[Cross-tenant model](https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-overview).

With an appropriate security administrator, inspect **External Identities →
Cross-tenant access settings** and the partner's organizational settings.
Review both directions and any configured trust of the partner's MFA/device
claims. Trust is a configured policy choice, not an automatic property of
every guest.
[B2B settings procedure](https://learn.microsoft.com/en-us/entra/external-id/cross-tenant-access-settings-b2b-collaboration).

## Verify and troubleshoot

Test the actual resource, not only successful invitation redemption. A guest
may authenticate but lack the required app assignment or Azure RBAC role.
An allowed invitation domain also does not override a cross-tenant block.
Inspect sign-in logs and Conditional Access results before sending repeated
invitations.

The resource tenant's guest object does not generally make it authoritative
for the external identity's password. Guest/Member classification and identity
provider are separate concepts.
[User identity types](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users).

Remove temporary resource assignments and the test guest when finished.
For real partnerships, periodically review continuing need and applicable
External ID/licensed feature requirements; do not leave privileged guest
access indefinitely by default.

[Question data](../../../questions/identity/identity-users-external.json).
