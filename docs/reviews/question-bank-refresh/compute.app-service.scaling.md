# App Service scale up, scale out, and autoscale review

Topic: `compute.app-service.scaling`; objective: `co-18`.
Verified: 2026-10-04. Source: questions/compute/compute-app-service-scaling.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-web-scale-up | Keep, revision 1 | Foundation scaling distinction | Required per-worker memory and higher-tier features distinguish SKU change from count/slots/bounds. Key `a`. |
| co-web-schedule | Revise, revision 2 | Applied recurring configuration | Replace mechanism recall with complete weekday/time/count mappings, including return to baseline. Key `a`. |
| co-web-autolimits | Revise, revision 2 | Applied cost and compatibility assertions | Define allocated buffer and a slot load test; remove Free-plan distractor and qualify billing timing. Keys `a`, `b`. |

## Evidence and acceptance

[Scale up](https://learn.microsoft.com/en-us/azure/app-service/manage-scale-up)
traces the retained distinction: a SKU changes per-worker resources/features;
worker count does not. [Hosting plans](https://learn.microsoft.com/en-us/azure/app-service/overview-hosting-plans)
traces slot sharing, so a slot does not increase per-worker memory. Increasing
an autoscale bound alone does not change the SKU. Sources were rechecked for
the retained question as well as the revisions.

[Common autoscale patterns](https://learn.microsoft.com/en-us/azure/azure-monitor/autoscale/autoscale-common-scale-patterns)
documents recurring schedule profiles and the explicit return profile.
[Best practices](https://learn.microsoft.com/en-us/azure/azure-monitor/autoscale/autoscale-best-practices)
documents inclusive capacity bounds; equal min/max fixes instance count.
The answer uses fixed min/default/max for each profile, UTC, weekday
recurrence, and both transition times. Wrong complete mappings respectively
reverse capacity, include weekends, or fail to lower evening capacity.
The schedule is a required configuration, not a guarantee of instantaneous
physical scale completion at the exact timestamp.

[Automatic scaling](https://learn.microsoft.com/en-us/azure/app-service/manage-automatic-scaling)
documents Premium v3 eligibility, slot-traffic exclusion, and allocation-based
buffer billing. Its FAQ says no buffer is allocated in the described idle
case, so the stem explicitly supplies an allocated prewarmed instance.
It traces both true statements and both opposite misconceptions. Exactly
two individual assertions qualify; neither is a jointly required component.

No variants or ID/family changes. The rendered title names several scaling
methods without supplying the capacity mapping or cost/compatibility answers.
Author-led technical review is separate from build/check, 13 tests, site links,
hash checks, and whitespace validation. No Azure scaling was executed.
