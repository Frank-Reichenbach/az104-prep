# User and group license assignments review

Topic: `identity.users.licenses`; objective: `id-03`.
Verified: 2026-10-03. Source: questions/identity/identity-users-licenses.json.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| id-license-nested | Revise, revision 2 | Troubleshooting membership processing | Replace subscription-role and matching-name distractors with competing licensing causes; rule out capacity and unfinished processing. Key `direct`. |
| id-license-retained | Revise, revision 2 | Applied assignment-state interpretation | Replace permanent entitlement and resource-role claims with alternative assignment outcomes. Key `path`. |
| id-license-location | Revise, revision 2 | Troubleshooting profile correction | Compare four user properties and supply verified service-use location. Key `usage`. |

## Evidence and acceptance

[Group licensing](https://learn.microsoft.com/en-us/microsoft-365/admin/manage/manage-group-licenses?view=o365-worldwide)
supports direct membership, processing delays, capacity errors, and location
checks. For the nested item this covers all four rationales: membership is
decisive; ownership, seat shortage, and continued processing do not explain
the stated outcome. The old advanced-licensing URL redirects to this page.

[Assignment state](https://learn.microsoft.com/en-us/graph/api/resources/licenseassignmentstate?view=graph-rest-1.0)
distinguishes direct and group sources. The
[PowerShell examples](https://learn.microsoft.com/en-us/entra/identity/users/licensing-powershell-graph-examples)
inspect both paths and remove redundant direct assignments. All four outcome
rationales follow from retaining the active direct source while removing the
group source; no source is converted or restored by the other path.

[User properties](https://learn.microsoft.com/en-us/graph/api/resources/user?view=graph-rest-1.0)
separates usageLocation, country, preferredLanguage, and officeLocation. This
supports each profile-choice rationale. The observed error and verified
location justify correction; the question does not assert that a country
mismatch necessarily causes an error for every product. Reprocessing follows
the correction; changing unrelated fields cannot repair it.

Each question has one qualifying individual answer. The visible title supplies
context without selecting a membership rule, assignment outcome, or property.
The batch has two diagnoses and one state interpretation. No variants or joint
sets exist. Stable IDs/families are preserved. Build/check, 13 Node tests, site
links, review hashes, and whitespace checks validate the checkpoint. This is
author-led documentation review; no tenant operations were executed.
