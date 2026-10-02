# Container Apps environments, ingress, and revisions

Topic ID: compute.containers.apps  
Objectives: co-15  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Resource relationships

A Container Apps environment is the boundary for a group of applications sharing
networking and operational configuration. A container app contains its image
configuration, ingress, secrets, and scale rules. A revision is an immutable
snapshot of revision-scoped configuration; replicas are running instances.
[Environments](https://learn.microsoft.com/en-us/azure/container-apps/environment);
[revisions](https://learn.microsoft.com/en-us/azure/container-apps/revisions).

## Implementation

1. Create or select an environment with the required region, network access,
   and workload profile. Use resource write permissions for the environment/app
   and required network dependencies.
2. Create the app using an image, CPU/memory allocation, and registry access.
   Configure a managed identity where supported and authorize it to pull the
   image; identity attachment alone does not grant access.
3. Enable ingress only if needed. Select external or internal ingress and
   set the target port to the port where the process actually listens.
4. Add application settings and secrets through the app configuration instead
   of baking secrets into the image. Configure startup, readiness, and liveness
   probes suitable for the application's startup and health behavior.
[Quickstart](https://learn.microsoft.com/en-us/azure/container-apps/get-started);
[ingress](https://learn.microsoft.com/en-us/azure/container-apps/ingress-how-to);
[probes](https://learn.microsoft.com/en-us/azure/container-apps/health-probes).

## Rollouts

Single revision mode activates the new revision when ready and shifts traffic;
a failed update should leave traffic on the previous revision. Multiple revision
mode allows active versions and traffic splitting. Use it for a controlled
canary, verify metrics, then increase traffic or return it to the prior revision.
An image or scale-rule change creates a revision. Ingress and secret-value
changes are app-scoped and do not create one; restart affected revisions when
they need to load updated secret values.
[Change scope](https://learn.microsoft.com/en-us/azure/container-apps/revisions).

## Verify and troubleshoot

Inspect provisioning and revision health, replica count, system/application logs,
probe results, and the app endpoint. Verify the target port before treating a
502 response as a registry problem. Check image pull roles and network access
when replicas never start. Validate the rollout using the exact revision and
traffic weights; updating an image tag in a registry alone is not a reliable
deployment workflow.

Use `az containerapp revision list --resource-group rg-study --name app-study`
to inspect revisions and the portal's log stream for startup errors. Private
ingress also needs a reachable network/DNS path.
[Managed identity](https://learn.microsoft.com/en-us/azure/container-apps/managed-identity).

Retained active revisions can consume resources. Deactivate unused versions only
after retaining a rollback path; remove isolated app/environment resources when
the lab ends. Logs, storage, and dedicated workload profiles can have charges
independent of active request traffic.

[Question data](../../../questions/compute/compute-containers-apps.json).
