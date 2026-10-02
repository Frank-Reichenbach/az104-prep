# Virtual machine scale sets and autoscale

Topic ID: compute.vms.scale-sets  
Objectives: co-12  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Orchestration and application design

A VM scale set manages a group of VM instances. Microsoft recommends Flexible
orchestration for new deployments; it uses standard Azure VMs and supports
mixed VM types and individual VM administration. Uniform orchestration manages
instances through scale-set VM APIs. Choose the orchestration mode at creation;
it cannot be changed on an existing set.
[Mode comparison](https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-orchestration-modes).

Build instances from a repeatable image/configuration and keep durable shared
state outside disposable instance disks. A scaling profile specifies how new
instances are created and is required for autoscale. Configure load balancing
and working health checks; adding instances alone does not prove they can serve
requests.
[Autoscale overview](https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-autoscale-overview).

## Implementation

Create the scale set in the portal with an explicit orchestration mode, image,
size, zones, network, instance count, upgrade policy, and management credentials.
Use VM/scale-set and dependent network permissions; autoscale configuration
requires permissions on `Microsoft.Insights/autoscaleSettings`.

Under **Scaling**, configure minimum, default, and maximum instances. For
example, a study policy might add an instance after average CPU exceeds 70%
for ten minutes and remove one after CPU stays below 30% for ten minutes.
Those thresholds are examples, not Microsoft defaults. Add cooldown and test
both directions to avoid repeated oscillation. Quotas and capacity still apply.
A manual capacity change uses:

```sh
az vmss scale --resource-group rg-study --name vmss-study --new-capacity 3
```

## Updating instances

Manual upgrade policy leaves existing instances unchanged until explicitly
upgraded; new instances use the latest model. Rolling updates apply changes in
batches with health controls. Automatic policy does not guarantee update order
or protect against all instances being taken down together.
[Upgrade policies](https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-upgrade-policy).

Some older migration/tutorial pages still state that Flexible lacks upgrade
policies. Current orchestration and upgrade-policy setup documentation list
support. Use the current feature matrix and supported API/tool version; do not
generalize an older tutorial limitation.
[Current setup](https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-set-upgrade-policy).

## Verify and cleanup

Inspect instance provisioning, backend health, model/update state, autoscale
run history, and observed count under load. Investigate missing metrics,
capacity limits, cooldown, and minimum/maximum bounds when scaling does not
occur. Protect critical instances from inappropriate scale-in and design work
to drain safely. More instances cost more; scale back a lab and remove its
autoscale setting, frontend, disks, and instances when no longer needed.

[Question data](../../../questions/compute/compute-vms-scale-sets.json).
