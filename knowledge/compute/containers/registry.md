# Container Registry images and access

Topic ID: compute.containers.registry  
Objectives: co-13  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Registry, repository, and image

Azure Container Registry (ACR) stores container images and related artifacts.
A repository groups image versions; a tag is a mutable label, while a digest
identifies particular image content. For reproducible deployments, track the
image digest or use a controlled immutable tagging process.
[Registry practices](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-best-practices).

## Create and publish

Choose a unique registry name and SKU appropriate to storage, performance,
networking, and replication needs. Registry creation permission is separate from
image data access. For an authorized study deployment:

```sh
az acr create --resource-group rg-study --name '<unique-registry-name>' --sku Basic
az acr show --resource-group rg-study --name '<unique-registry-name>' --query loginServer --output tsv
az acr login --name '<unique-registry-name>'
```

Use the returned login server in `docker tag` and `docker push`, for example
`<login-server>/study/web:v1`. Do not infer the exact hostname from the registry
name. Normal `az acr login` uses a local Docker client/daemon; other supported
token flows are available for environments without Docker.
[CLI quickstart](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-get-started-azure-cli);
[authentication](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-authentication).

## Authorize the workload

Prefer Entra identities and managed identities for supported Azure workloads
instead of sharing the registry admin credential. Assign only required image
permissions and verify the registry's role-assignment mode:

| Registry mode | Image pull | Image push/update |
| --- | --- | --- |
| RBAC Registry Permissions | AcrPull | AcrPush |
| RBAC Registry + ABAC Repository Permissions | Container Registry Repository Reader | Container Registry Repository Writer |

Legacy AcrPull/AcrPush assignments are not honored in ABAC mode. Repository
roles can use conditions to restrict repositories; catalog listing is a separate
permission. A registry control-plane role alone is not image access in that mode.
[ABAC permissions](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-rbac-abac-repository-permissions).

## Verify, troubleshoot, and cleanup

Test pushing as the publishing identity and pulling the exact image as the
runtime identity. Check repository/tag spelling, digest, role mode, conditions,
token freshness, DNS, and firewall/private connectivity. Successful login alone
does not prove permission to pull a repository.
[Access troubleshooting](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-troubleshoot-login-authn-authz).

Remove unused images only after checking running and rollback deployments;
deleting a tag is not the same as understanding all references to a manifest.
Registries and retained image storage can incur charges even when no container
is running. Delete an isolated lab registry when no longer needed.

[Question data](../../../questions/compute/compute-containers-registry.json).
