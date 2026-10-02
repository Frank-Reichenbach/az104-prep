# Container resource sizing and replica scaling

Topic ID: compute.containers.scaling  
Objectives: co-16  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Distinguish allocation from replicas

ACI CPU and memory requests allocate resources to a container group. The group
allocation is based on its containers' requests; a higher per-container limit
can allow use of spare allocated group resources but does not create extra
group capacity. ACI does not provide Container Apps' built-in KEDA replica
scaling model.
[ACI resource model](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-container-groups).

For ACI, review CPU/memory and restart/OOM evidence, update the definition, and
follow the supported redeployment procedure. CPU, memory, and some other
properties require deleting and recreating the group rather than an in-place
update. Preserve external data and account for endpoint changes.
[ACI updates](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-update).

## Container Apps sizing

Container Apps allocates CPU/memory per replica. Valid combinations depend on
the Consumption or Dedicated workload profile. Check current combinations and
environment capacity rather than choosing arbitrary pairs.
[Container configuration](https://learn.microsoft.com/en-us/azure/container-apps/containers).

In the portal, edit the container allocation and create a revision. Configure
minimum and maximum replicas plus HTTP, TCP, or event-based rules under scaling.
For example, a queue worker can scale using queue length and an identity
authorized to read the scaling signal. Raising maximum replicas only permits
more replicas; a scaling trigger must still request them.
[Scale rules](https://learn.microsoft.com/en-us/azure/container-apps/scale-app).

CPU or memory rules cannot wake a revision from zero based on measurements
of nonexistent replicas. Use an appropriate external trigger for scale-to-zero,
or keep a nonzero minimum. If ingress is disabled and there is no custom rule,
a zero-minimum app can become unable to start itself. For latency-sensitive
workloads, weigh a nonzero minimum against idle cost.

## Implement, verify, and troubleshoot

Use app/container-group write permissions to change allocation. Grant the
scaler identity only necessary access to its event source; configuration rights
do not automatically grant data-plane access.

Set explicit bounds, deploy the revision, generate representative authorized
test traffic/events, and observe replica count, CPU/memory, throttling, and
scale events. Check trigger credentials, network reachability, revision traffic,
and capacity quotas when scaling fails. An OOM failure may need more memory
per replica rather than more replicas with the same insufficient allocation.

Scale-to-zero can remove app execution usage but does not remove independent
charges for logging, storage, networking, or dedicated environment capacity.
Deactivate unused revisions and clean up external test data deliberately.
See [Container Apps](apps.md) and [ACI](instances.md).

[Question data](../../../questions/compute/compute-containers-scaling.json).
