# Container Instances groups and restart behavior

Topic ID: compute.containers.instances  
Objectives: co-14  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Container-group boundary

Azure Container Instances (ACI) runs containers without administering VM hosts.
A container group shares scheduling, lifecycle, networking, and mounted volumes.
Containers within the group can communicate through localhost; public access
requires exposing the appropriate group and container ports. Multi-container
groups currently support Linux containers.
[Container groups](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-container-groups).

## Implementation

Choose the image, OS type, CPU/memory requests, restart policy, network, and
persistent storage before deployment. Use YAML for a container-group definition;
ARM/Bicep is useful when provisioning its dependencies together. The deployment
identity needs container-group write permission and access to any dependent
network/identity resources. Private image pulling separately needs registry
authorization; see [ACR access](registry.md).

Example one-container task:

```sh
az container create --resource-group rg-study --name job-study \
  --image mcr.microsoft.com/azuredocs/aci-wordcount:latest \
  --os-type Linux --cpu 1 --memory 1 --restart-policy OnFailure
az container show --resource-group rg-study --name job-study
az container logs --resource-group rg-study --name job-study
```

The Microsoft demonstration image is suitable for learning the lifecycle;
pin reviewed application images for reproducible operational deployments.
[ACI quickstart](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-quickstart).

## Restart policy and durable output

**Always** restarts terminated containers and is the default. **OnFailure**
restarts after a nonzero exit and leaves a successful task terminated.
Current Microsoft documentation states that **Never** guarantees no restart
after exit code zero, but the platform may still restart a container after a
nonzero exit. Do not design an exactly-once business process around the name
of that policy; make retries safe and persist completion state.
[Restart policies and caveat](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-restart-policy).

Write required output to external durable storage such as an appropriately
configured Azure Files mount. A container's writable layer is not a durable
archive across deletion/recreation.
[Azure Files mounts](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-volume-azure-files).

## Verify, troubleshoot, and cleanup

Inspect group provisioning, individual container events, exit codes, and logs.
Image-pull errors require checking registry access and image names; repeated
process exits require application/log analysis; a healthy process with an
unreachable endpoint requires port and network checks. Restart policy does not
increase replica count. Stop/delete disposable groups and remove unused storage
after retaining required results; compute allocation and external storage have
separate costs.

[Question data](../../../questions/compute/compute-containers-instances.json).
