# Container resource sizing and replica scaling review

Topic: `compute.containers.scaling`; objective: `co-16`.
Verified: 2026-10-04. Source: questions/compute/compute-containers-scaling.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-scale-aci | Keep, revision 1 | Applied numeric allocation interpretation | Requests total two CPUs; a limit borrows within allocation. Key `a`. |
| co-scale-zero | Revise, revision 2 | Troubleshooting absent scale trigger | Require zero-idle behavior and compare actual rules/bounds. Key `a`. |
| co-scale-oom | Revise classification, revision 2 | Troubleshooting startup allocation | Sound repair/key `a`; observed allocation failure was labeled applied. |

## Evidence and acceptance

[ACI groups](https://learn.microsoft.com/en-us/azure/container-instances/container-instances-container-groups)
documents summing requests, limits permitting available group resources, and
the shared allocation boundary. It traces all retained allocation rationales:
a two-CPU limit cannot create replicas, reserve four CPUs, or give both
containers two CPUs simultaneously. Infrastructure consumes a small share;
the key says when available, not guaranteed two-CPU guest delivery.

[Container Apps scaling](https://learn.microsoft.com/en-us/azure/container-apps/scale-app)
documents external event rules, disabled-ingress/no-rule zero behavior, and
CPU/memory inability to scale from zero. It traces the queue-rule key and
CPU-only distractor. Its bounds establish that min 1 prevents zero and max 20
does not create a demand trigger. Existing queue permissions and capacity are
explicit; the item diagnoses missing configuration rather than guessing an
authentication fault. Each offered change is checked against both wake-up and
zero-idle requirements.

[Container configuration](https://learn.microsoft.com/en-us/azure/container-apps/containers)
documents per-container CPU/memory allocations and supported combinations.
The observed insufficient startup memory fixes the cause in the scenario;
increasing supported per-replica memory addresses it. Maximum count, minimum
count, and traffic distribution cannot enlarge each process's memory. Scaling
and revision documentation trace those remaining option rationales. The key
does not promise every arbitrary CPU/memory pair is supported.

The scale page's Bicep examples show maxReplicas 0/minReplicas 5 while adjacent
JSON and prose describe min 0/max 5. That inconsistent sample is not imported
or used as evidence for the scored bounds. The questions use documented prose,
limits, and valid configured bounds. No deployments verify the samples.

One individual assertion/change qualifies per item; no joint sets or variants.
The label does not resolve allocation arithmetic, a queue wake-up trigger, or
memory versus count repair. Stable IDs/families remain. Build/check, 13 tests,
site links, hashes, and whitespace validate this author-led checkpoint.
No container sizing, scale rule, or queue operation was executed in Azure.
