# Container Instances groups and restart behavior review

Topic: `compute.containers.instances`; objective: `co-14`.
Verified: 2026-10-04. Source: questions/compute/compute-containers-instances.json.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| co-aci-localhost | Revise, revision 2 | Foundation local endpoint distinction | Supply both listener ports and exposed public port; compare runtime endpoints. Key `a`. |
| co-aci-onfailure | Revise, revision 2 | Applied policy/exit configuration | Compare restart policy and exit-code preservation, avoiding a fourth invented policy. Key `a`. |
| co-aci-persist | Revise, revision 2 | Applied durable storage configuration | Compare actual mounts/layers and external share retention. Key `a`. |

## Evidence and acceptance

[Container groups](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-container-groups)
documents shared localhost networking, exposed ports, and image versus running
container roles. It traces all endpoint rationales with the supplied ports:
8081 reaches the helper locally; public 8081 is unexposed; local 8080 is the app;
the registry is not a runtime helper endpoint.

[Restart policy](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-restart-policy)
documents OnFailure/Always and the current Never caveat. It traces all policy
rationales. The item asks which configuration explicitly requests failure
retries, not which name guarantees exactly-once execution. The Never caveat
is preserved rather than silently simplified. Mapping every exit to zero is
an explicit scenario behavior; it removes the OnFailure failure signal. No
retry-count or exactly-once guarantee is inferred.

[Azure Files mounts](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-volume-azure-files)
documents external persisted storage and local ephemeral limitations.
[emptyDir](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-volume-emptydir)
documents group-lifetime storage. Together they trace every persistence
rationale. Retention of the share is essential; a persistent service does not
preserve files after that service's storage is deliberately deleted.

Each complete configuration or endpoint is evaluated as a whole; one qualifies
per item. No jointly required sets or variants. The topic label does not supply
the port, policy/exit-code combination, or retained-storage configuration.
Stable IDs/families remain. Build/check, 13 tests, site links, hashes, and
whitespace validate this author-led checkpoint. No container, storage, or
application command was executed in Azure.
