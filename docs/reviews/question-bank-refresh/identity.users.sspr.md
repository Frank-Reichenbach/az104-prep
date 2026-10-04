# Self-service password reset review

Topic: `identity.users.sspr`; objective: `id-05`.
Verified: 2026-10-04. Source: questions/identity/identity-users-sspr.json.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| id-sspr-unregistered | Revise, revision 2 | Troubleshooting numeric policy interpretation | Supply one registered method versus two required; compare scope, entitlement, registration, and hybrid integration causes. Key `methods`. |
| id-sspr-writeback | Keep, revision 1 | Applied hybrid capability selection | Choices distinguish the reverse password path from hash synchronization, registration, and enablement. Key `writeback`. |
| id-sspr-method-policy | Revise, revision 2 | Foundation policy distinction | Specify email/phone and exclude security questions to avoid a documented exception. Key `current`. |

## Evidence and acceptance

[SSPR enablement](https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr)
supports the selected group, required method count, license prerequisites,
and registration. The
[troubleshooting guide](https://learn.microsoft.com/en-us/entra/identity/authentication/troubleshoot-sspr)
separates method, scope, license, and writeback errors. These support all
four diagnosis rationales; the first item expressly concerns a cloud-only
nonadministrator account.

[Writeback implementation](https://learn.microsoft.com/en-us/entra/identity/authentication/tutorial-enable-sspr-writeback)
supports sync configuration, on-premises permissions, and SSPR integration.
[Password hash synchronization](https://learn.microsoft.com/en-us/entra/identity/hybrid/connect/whatis-phs)
describes the on-premises-to-cloud direction. These support the retained
key and hash distractor; the enablement tutorial supports the distinction
between registration/eligibility and the writeback path for the remaining
two rationales. No scored content changed in the retained item.

[Authentication method management](https://learn.microsoft.com/en-us/entra/identity/authentication/concept-authentication-methods-manage)
supports the current policy and records a legacy security-question exception.
The tutorial's general deprecation statement and this exception remain
in tension. The knowledge file now records both; the scored item is limited
to email/phone. Policy permission, authentication requirements, and user
registration serve different functions, supporting the four policy choices.

Every item has one sufficient individual answer; no variants or joint sets
exist. The topic label does not supply a count, hybrid configuration, or policy.
The batch includes diagnosis, hybrid implementation, and a foundation
distinction. IDs/families are stable. Build/check, 13 tests, site links, hashes,
and whitespace checks validate this author-led checkpoint. No resets were run.
