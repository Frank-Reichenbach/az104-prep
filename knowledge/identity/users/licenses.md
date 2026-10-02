# User and group license assignments

Topic ID: identity.users.licenses  
Objectives: id-03  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

License assignment enables purchased product/service entitlements. It does not
grant Azure subscription administration. Current user/group assignment workflows
are in the **Microsoft 365 admin center**; older screenshots showing Entra's
license-assignment UI can be outdated.
[Current administration workflow](https://learn.microsoft.com/en-us/entra/fundamentals/license-users-groups).

## Assign and inspect

Use License Administrator for this task, enough available product seats, and
correct user usage locations. Choose direct assignment for an individual case
or group assignment for a maintained population.

1. Open **Billing → Licenses** in the Microsoft 365 admin center.
2. Select the product and assign it to the intended user or group.
3. Choose the required service plans, respecting dependencies.
4. Inspect assignment processing, effective service plans, and **Errors &
   Issues**. A saved assignment does not prove every user received the product.
[Group licensing](https://learn.microsoft.com/en-us/entra/identity/users/licensing-group-advanced).

Set usage location during onboarding. This identifies where a service will
be used and must permit the selected product; an address or office field is
not a substitute. Group licensing applies to direct user members, not users
reachable only through nested groups.
[Limitations and location guidance](https://learn.microsoft.com/en-us/entra/identity/users/licensing-group-advanced).

## Diagnose errors and duplicate paths

For insufficient capacity, resolve seat availability before reprocessing.
For service conflicts or dependencies, reconcile the assigned plans. Correct
an invalid location from authoritative information, then retry. Do not change
the user's country arbitrarily to bypass product availability.
[License error handling](https://learn.microsoft.com/en-us/entra/fundamentals/license-users-groups).

A user can receive the same product through multiple assignment paths.
Removing one group path does not remove a remaining direct assignment or
another group's entitlement. Inspect assignment state before transitioning
from direct to group-based management. Microsoft provides Graph PowerShell
examples to identify and remove redundant direct assignments.
[Assignment-state examples](https://learn.microsoft.com/en-us/entra/identity/users/licensing-powershell-graph-examples).

Verify with a disposable user's effective assignment and an intended service
sign-in. Preserve needed data before unassigning real licenses; service access
and retention effects depend on the product. Remove only the exercise
assignment, not the purchased subscription. These notes neither purchase
licenses nor change a tenant.

[Question data](../../../questions/identity/identity-users-licenses.json).
