# App Service plan creation and compute sharing review

Topic: `compute.app-service.plans`; objective: `co-17`.
Verified: 2026-10-04. Source: questions/compute/compute-app-service-plans.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-plan-sharing | Revise, revision 2 | Foundation worker-allocation mapping | Replace unrelated lifecycle/region distractors with competing worker relationships; state per-app scaling disabled. Key `a`. |
| co-plan-separate | Revise, revision 2 | Applied deployment constraint | Require separate worker pools and independent plan capacity, comparing actual hosting configurations. Key `a`. |
| co-plan-cost | Revise, revision 2 | Troubleshooting retained capacity billing | Original lower-tier option could reduce rather than stop charges. Observe an explicitly retained empty paid plan and select deletion. Key `a`. |

## Evidence and acceptance

[Hosting plans](https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans)
documents shared plan workers for apps and slots, dedicated compute at plan
level, per-app scaling, and separate plans for compute isolation. Those
sections trace every allocation rationale and the separate-plan key. Resource
groups organize resources rather than replace the selected hosting plan;
scale-out adds shared capacity. The deployment item creates a new app; it
does not depend on whether an existing app can be moved between webspaces.

[Plan management](https://learn.microsoft.com/en-us/azure/app-service/app-service-plan-manage)
and [cost management](https://learn.microsoft.com/en-us/azure/app-service/overview-manage-costs)
document charges for retained empty paid plans, deletion or Free tier to avoid
them, and billing per allocated instance. Hosting plans identifies Basic as
paid dedicated compute. Together these trace the billing key and all wrong
options: fewer workers/lower paid tier still cost, and disabling autoscale
does not deallocate the existing workers.

The management page says deleting the last app deletes its plan by default;
the costs page describes a plan continuing after deleting all apps. The
scored scenario explicitly retains the plan and observes the allocation;
it does not score an unconditional claim about automatic plan deletion.
Other services and reservations are outside the stated pay-as-you-go plan
compute goal. Deleting resources here is a proposed answer, not an executed
operation.

Each complete configuration/action is evaluated against the stated goal;
exactly one qualifies. No joint sets or variants. The displayed plan title
does not identify the correct worker mapping, deployment boundary, or billing
repair. Stable IDs/families remain. Author-led source review is separate from
build/check, 13 tests, site links, hashes, and whitespace checks. No Azure
operations were executed.
