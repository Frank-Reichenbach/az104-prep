# Entra groups and dynamic membership review

Topic: `identity.groups.management`; objectives: `id-01`, `id-02`.
Verified: 2026-10-03. Source: questions/identity/identity-groups-management.json.

| ID | Decision | Pattern / difficulty | Reason and key |
| --- | --- | --- | --- |
| id-group-dynamic-department | Revise, revision 2 | Applied rule interpretation | The displayed dynamic-membership label revealed the old feature selection. Compare four valid rules within that feature instead. Key `dynamic`. |
| id-group-dynamic-exception | Revise, revision 2 | Troubleshooting membership rejection | Retain dynamic membership and compare rule review, ownership, validation, and Graph operations instead of renaming/subscription roles. Key `rule`. |
| id-group-license | Keep, revision 1 | Foundation license-count distinction | All choices express relevant licensing misconceptions; unique-user coverage is the documented measure. Key `users`. |
| id-group-properties | Revise, revision 2 | Foundation property/identity distinction | Replace user-UPN and tenant migration with actual group property/replacement actions; preserve the required ID. Key `edit`. |

## Evidence and acceptance

The [dynamic rule reference](https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-membership)
supports user.department, accountEnabled, equality/inequality, and AND/OR.
Only the keyed rule admits enabled Operations users while excluding disabled
Operations users and enabled users from another department. Manual additions
cannot override computed eligibility. The same reference requires sufficient
eligible licenses for 120 unique users, not memberships, groups, or just the
administrator; it does not require assigning each member a license individually.
The retained licensing wording concerns coverage, not assignment mechanics.

The [group management guide](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-manage-groups)
separates owners, members, and editable description/name properties while
preserving object ID. [Rule validation](https://learn.microsoft.com/en-us/entra/identity/users/groups-dynamic-rule-validation)
tests eligibility rather than forcing membership. The dynamic rule reference's
service-wide prohibition on manual additions disqualifies using the
[Graph add-member operation](https://learn.microsoft.com/en-us/graph/api/group-post-members?view=graph-rest-1.0)
as a portal bypass; that API page does not separately enumerate the dynamic
restriction. These support each repair-choice rationale.
The [Graph group schema](https://learn.microsoft.com/en-us/graph/api/resources/group?view=graph-rest-1.0)
distinguishes description/displayName and the read-only unique ID; replacement
or duplicate groups cannot retain the original object reference.

Each item has one qualifying complete choice. No joint sets or variants exist.
The shared label now orients all four questions without supplying their keys.
The batch includes rule interpretation, observed-failure diagnosis, and two
foundation distinctions. Stable IDs/families remain. Build/check, 13 tests, site
links, hashes, and whitespace checks validate this author-led checkpoint.
No Entra groups or licenses were changed.
