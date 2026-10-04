# Container Registry images and access review

Topic: `compute.containers.registry`; objective: `co-13`.
Verified: 2026-10-04. Source: questions/compute/compute-containers-registry.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-acr-abac | Revise, revision 2 | Applied role/mode configuration | Specify read-only repository access and working authentication/connectivity. Key `a`. |
| co-acr-digest | Keep, revision 1 | Foundation content identifier | Mutable tag and repository/container scope are not content identifiers. Key `a`. |
| co-acr-identity | Revise, revision 2 | Applied App Service pull configuration | Name service, identity, registry mode and pull-only constraint; compare complete configurations. Key `a`. |

## Evidence and acceptance

[Repository ABAC](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-rbac-abac-repository-permissions)
documents legacy roles not honored in ABAC mode, Repository Reader pull access,
repository conditions, separate catalog listing, and control-plane roles. These
trace all four role-gap rationales. A condition covering the named repository
is explicitly required; listing the known repository is not a prerequisite.
[Registry practices](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-best-practices)
distinguishes mutable tags and content digests. Repository names and management
containers cannot identify one image version, tracing the retained identifier
rationales alongside the registry/repository model.

[App Service custom containers](https://learn.microsoft.com/en-us/azure/app-service/configure-custom-container)
documents managed-identity image-pull configuration and role authorization.
[ACR role overview](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-rbac-built-in-roles-overview)
defines AcrPull/AcrPush and control/data separation.
[ACR authentication](https://learn.microsoft.com/en-us/azure/container-registry/container-registry-authentication)
documents admin credentials. These trace all service-configuration rationales:
managed identity with AcrPull meets both constraints; Reader lacks pull; admin
credentials store a password; AcrPush grants excluded write access. The stated
legacy registry mode is decisive and must not be generalized to ABAC mode.

One individual configuration or identifier qualifies per item. No joint sets
or variants. The topic label does not supply mode-specific roles, digest versus
mutable label, or App Service settings. Stable IDs/families remain. Build/check,
13 tests, site links, hashes, and whitespace validate this author-led review.
No registry, image push/pull, service, or access assignment was executed in Azure.
