# App Service application deployment and configuration review

Topic: `compute.app-service.apps`; objective: `co-19`.
Verified: 2026-10-04. Source: questions/compute/compute-app-service-apps.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-web-zip | Revise, revision 2 | Applied package layout | Specify published output, default destination, and disabled build; compare realistic wrapping/source mistakes. Key `a`. |
| co-web-settings | Revise, revision 2 | Foundation runtime configuration | Replace unrelated OS/slot choices with restart, build, and delayed-application misconceptions. Key `a`. |
| co-web-managed | Revise, revision 2 | Troubleshooting authorization | Identify the token principal and target data operation; compare role/principal/scope assignments. Original generic failures were labeled applied. Key `a`. |

## Evidence and acceptance

[ZIP deployment](https://learn.microsoft.com/en-us/azure/app-service/deploy-zip)
documents packaging output contents without the enclosing directory, default
extraction into wwwroot, and build automation disabled by default. It traces
all four archive rationales, including the wwwroot-within-wwwroot mistake.
The stem avoids requiring the learner to guess a runtime-specific build step.

[App settings](https://learn.microsoft.com/en-us/azure/app-service/configure-common)
documents environment injection at startup and restart on settings edits.
It traces the key and all alternate application mechanisms. The question
keeps foundation difficulty because it asks direct service behavior.

[Managed identity](https://learn.microsoft.com/en-us/azure/app-service/overview-managed-identity)
documents tokens representing the app, separate target authorization, and
Website Contributor for app management. [Blob authorization](https://learn.microsoft.com/en-us/azure/storage/blobs/authorize-access-azure-active-directory)
and [role assignment](https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access)
document blob data roles, container scope, and management/data separation.
Together these trace the correct data role, insufficient Reader role, wrong
resource permission, and wrong principal. Token and network checks exclude
unrelated authentication/connectivity repairs; propagation can still delay
an actual newly granted role and is not promised instantaneous here.

Each offered complete configuration has one qualifying key; no joint sets
or variants. The displayed title does not supply an archive shape, restart
behavior, or role assignment. Stable IDs/families remain. Author-led review
is separate from build/check, 13 tests, site links, hashes, and whitespace
validation. No deployment or role grant was executed in Azure.
