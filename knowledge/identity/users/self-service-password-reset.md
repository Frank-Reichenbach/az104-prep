# Self-service password reset

Topic ID: identity.users.sspr  
Objectives: id-05  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Self-service password reset (SSPR) lets eligible users prove their identity and
reset a forgotten password. Enablement, registration, permitted methods, and
licensing must all align. Microsoft recommends piloting with a selected group
before broader rollout.
[Deployment planning](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-deploy).

## Configure a cloud-user pilot

Use Authentication Policy Administrator for the cloud policy setup, a
nonadministrator test user, a pilot group, and the appropriate licenses.

1. In **Entra ID → Password reset → Properties**, select **Selected**, choose
   the pilot group, and save.
2. Configure permitted recovery authentication methods through the current
   **Authentication methods policy**. Legacy MFA/SSPR method management was
   deprecated; do not implement a new setup from an old legacy-method screen.
3. Configure the required number of methods, registration/reconfirmation
   behavior, notifications, and help-desk contact information.
4. Have the pilot user register enough supported methods in Security info.
[Enablement tutorial](https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr),
[authentication method policies](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage).

Use a private browser session to test the password-reset flow. Verify the new
password works and inspect audit events. An enabled user without sufficient
registered permitted methods cannot complete the reset. Administrator accounts
have separate stronger reset behavior; do not use one to represent an ordinary
user's pilot experience.
[SSPR troubleshooting](https://learn.microsoft.com/en-us/entra/identity/authentication/troubleshoot-sspr).

## Add hybrid password writeback

Password hash synchronization sends password-derived information toward Entra;
it does not implement cloud-to-AD password reset. Hybrid reset requires a
supported Connect Sync or cloud sync writeback configuration and the required
on-premises account permissions.

With Hybrid Identity Administrator and the necessary on-premises privileges,
enable the sync system's writeback capability, then configure **Password reset
→ On-premises integration → Write back passwords**. Test a disposable
synchronized user's reset against on-premises policy and verify on-premises
sign-in with the new password.
[Writeback implementation](https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback).

Cloud password change, forgotten-password reset, and hybrid writeback have
different license entitlements. Check the current feature table; do not assume
every free tenant includes hybrid writeback.
[SSPR licensing](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-sspr-licensing).

After testing, remove the disposable user/group or revert only pilot settings.
Keep production recovery methods and writeback dependencies intact. License
requirements are planning information; no subscription is purchased here.

[Question data](../../../questions/identity/identity-users-sspr.json).
