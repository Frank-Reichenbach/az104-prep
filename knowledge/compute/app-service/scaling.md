# App Service scale up, scale out, and autoscale

Topic ID: compute.app-service.scaling  
Objectives: co-18  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Select the scaling method

Scale **up** changes the App Service plan SKU and its resources/features.
Scale **out** changes instance count. Under ordinary plan scaling, apps share
the capacity and scale together; per-app settings can limit placement but do
not turn a shared plan into independent compute.
[Scale up](https://learn.microsoft.com/en-us/azure/app-service/manage-scale-up);
[plan sharing](plans.md).

Azure Monitor autoscale uses configured metrics or schedules and applies to the
plan. App Service automatic scaling is a different feature: it responds to HTTP
traffic, has per-app settings, and is supported on eligible Premium v2–v4 plans.
Use autoscale for CPU-, memory-, or schedule-based rules. Only one scaling
method should be active for the plan.
[Automatic scaling comparison](https://learn.microsoft.com/en-us/azure/app-service/manage-automatic-scaling).

## Implementation

For manual scaling, open the app's **Scale up/out (App Service plan)** controls.
Choose a compatible SKU or instance count and review the estimated charges.
CLI examples:

```sh
az appservice plan update --resource-group rg-study --name plan-study --sku S2
az appservice plan update --resource-group rg-study --name plan-study --number-of-workers 2
```

For autoscale, choose a supported tier, set minimum/default/maximum capacity,
and add rules with measured thresholds, time windows, and cooldown. Pair
scale-out with a safe scale-in condition. Configure a schedule for predictable
busy periods. These are operational choices, not universal Microsoft thresholds.
[Autoscale guidance](https://learn.microsoft.com/en-us/azure/azure-monitor/autoscale/autoscale-best-practices).

For automatic HTTP scaling, configure always-ready capacity, app limits, and
maximum burst. Prewarmed workers are billable. Deployment-slot traffic does
not support this automatic scaling feature.
[Setup and limits](https://learn.microsoft.com/en-us/azure/app-service/manage-automatic-scaling).

## Permissions, verification, and troubleshooting

Plan scaling requires plan write permission; autoscale also needs
`Microsoft.Insights/autoscaleSettings` write access. Check SKU/region support,
quotas, and other apps' demand before resizing.

Measure request latency, worker count, CPU/memory, and scaling history under
representative traffic. If a rule does not fire, check its metric aggregation,
evaluation window, cooldown, and capacity bounds. Design session state and
background processing to tolerate multiple workers; a second worker does not
make local-only session data shared.

Scale back a lab and remove unwanted rules after testing. Review every app on
the shared plan before lowering capacity; otherwise a saving for one app can
cause failures in others.

[Question data](../../../questions/compute/compute-app-service-scaling.json).
