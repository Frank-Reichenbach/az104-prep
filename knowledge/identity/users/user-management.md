# Entra user provisioning and properties

Topic ID: identity.users.management  
Objectives: id-01, id-02  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

An Entra user object represents an identity; it does not by itself grant access
to Azure resources or assign product licenses. Distinguish a cloud-created
account from an identity whose authoritative attributes synchronize from
on-premises Active Directory.
[User management model](https://learn.microsoft.com/en-us/entra/identity/users/directory-overview-user-model).

## Create and maintain a cloud user

Use User Administrator for ordinary user creation, applying Microsoft's
least-privilege guidance. Assigning an Entra administrator role is a separate
operation that can require Privileged Role Administrator; Azure subscription
Contributor is not the same directory role.

1. In **Entra admin center → Entra ID → Users**, select **New user → Create
   new user**.
2. Supply a unique user principal name (UPN) with a verified tenant domain,
   display name, and initial password settings.
3. Set needed job/contact fields and usage location. Review assignments and
   create the user without unnecessary directory privileges.
4. Record the object ID, verify the intended member/guest type, and test the
   intended sign-in flow with a disposable account.
[User creation procedure](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users).

For many users, use the portal's **Bulk create** CSV template, preserve its
required headers, validate the upload, and inspect each result. Protect the
temporary password data and delete the local exercise CSV after use.
[Bulk creation](https://learn.microsoft.com/en-us/entra/identity/users/users-bulk-add).

## Update properties at their source

Open a user's **Properties**, edit the appropriate fields, and save. A change
to department can affect dynamic group membership after processing; inspect
that downstream effect. Changing a display name does not intentionally create
a new user identity or change the object ID.

For synchronized attributes, make ordinary changes at their authoritative
on-premises source. Some cloud edits are possible in exceptional cases, but
Microsoft does not recommend treating those as the normal management path.
[Profile maintenance](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-user-profile-info).

Check audit logs, the current property value, and sync/provisioning errors.
A rejected UPN may reflect an unverified domain or duplicate name. Do not
confuse the user's display name, UPN, email address, and stable object ID.

## Cleanup and dependencies

Before deleting a test user, remove or inspect assigned access and licenses.
Deletion and restoration have directory-specific retention and dependent
service effects; blocking sign-in is a different action. Never delete a real
account merely to reset its profile.
[User lifecycle operations](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-create-delete-users).

Creating these notes provisions nothing. Licensed features and assigned
products require suitable subscriptions; ordinary object creation does not
justify purchasing additional licenses for an exercise.

[Question data](../../../questions/identity/identity-users-management.json).
