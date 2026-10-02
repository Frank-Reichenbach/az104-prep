# Entra groups and dynamic membership

Topic ID: identity.groups.management  
Objectives: id-01, id-02  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Use groups to manage sets of identities. A security group supports access
assignments; a Microsoft 365 group also supports collaboration services.
Assigned membership is maintained explicitly. Dynamic membership derives
members from supported user or device attributes.
[Group administration](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups).

## Create an assigned group

Use Groups Administrator for ordinary group administration, or an authorized
owner for supported existing-group operations. Role-assignable groups have
additional restrictions; do not enable that capability for a routine access
group.

1. In **Entra ID → Groups → All groups**, select **New group**.
2. Choose Security, enter a meaningful name/description, and select Assigned.
3. Add accountable owners and the intended members; create and record its ID.
4. Reopen Properties and Members to verify the saved description, ownership,
   and membership. Renaming the group does not replace its object ID.
[Group setup](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups).

## Configure a dynamic user group

Verify license entitlement: user-based dynamic membership requires an eligible
license for every unique user covered, not one license for the administrator.
Choose **Dynamic User**, then enter a rule such as:

```text
(user.department -eq "Operations") -and (user.accountEnabled -eq true)
```

Control who can modify the attributes that drive access. A user-editable
attribute is a poor basis for privileged membership. Device and user rules are
different membership types and cannot be mixed into one dynamic group.
[Rule syntax and prerequisites](https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership).

Validate the rule against representative matching and nonmatching users, save,
and inspect processing status. Membership evaluation is asynchronous.
Use the group's rule editor to change eligibility; manually adding an
exception is not how a dynamic membership group is maintained.
[Rule validation and processing](https://learn.microsoft.com/en-us/entra/identity/users/groups-create-rule).

## Verify downstream access

Confirm membership has processed before troubleshooting an application or
Azure role assignment. A correct membership rule does not automatically
configure a product license or resource role: those are separate group
assignments. For synchronized groups, respect the authoritative management
source.

Before deleting an exercise group, inspect its role, license, and application
assignments; deletion affects their users. Remove temporary assignments first.
Dynamic membership is a licensed feature; these examples do not acquire
licenses or create tenant objects.

[Question data](../../../questions/identity/identity-groups-management.json).
