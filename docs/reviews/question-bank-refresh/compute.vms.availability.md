# Availability sets and availability zones review

Topic: `compute.vms.availability`; objective: `co-11`.
Verified: 2026-10-04. Source: questions/compute/compute-vms-availability.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-avail-fault | Keep, revision 1 | Foundation failure/maintenance distinction | Correct domain/container roles; key `a`. |
| co-avail-zone | Revise, revision 2 | Applied complete resilience configuration | State stateless workload, resilient dependencies and frontend; compare placement and routing candidates. Key `a`. |
| co-avail-update | Keep, revision 1 | Applied numeric configuration interpretation | Seven VMs share five domains; maintenance sequencing is not numeric. Key `a`. |

## Evidence and acceptance

[Availability-set overview](https://learn.microsoft.com/en-us/azure/virtual-machines/availability-set-overview)
documents shared power/network fault domains, planned-maintenance update domains,
domain reuse, one-domain-at-a-time maintenance, and nonnumeric maintenance order.
These trace both domain keys and their domain-related distractors. Resource-group
and deployment containers do not define hardware fault-domain placement; this
distinction follows the documented availability-set model. The seven-versus-five
configuration requires counting rather than just recalling the domain name.

[VM reliability](https://learn.microsoft.com/en-us/azure/reliability/reliability-virtual-machines)
documents zonal placement and multiple-zone application resilience.
[Load balancer zones](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-standard-availability-zones)
documents zonal/zone-redundant frontends, health probing, and backend instances.
The load-balancer URL redirects to the current reliability article. The
availability-set overview's statement that each VM is deployed in multiple
datacenters is ambiguous beside the VM reliability article's explicit
single-zone placement. The scored architecture uses the explicit zonal model
and does not infer automatic VM replication from that overview sentence.
Together they trace every architecture rationale: the surviving backend must
be outside zone 1 and reachable through the surviving frontend. More backends
in zone 1, an unregistered zone 2 backend, or a frontend in failed zone 1 each
fails a specific requirement. Capacity and other dependencies are explicit
scenario assumptions, not assurances provided by VM placement alone.

One complete configuration or individual statement qualifies per item; no joint
sets or variants. Displayed context names both availability mechanisms without
choosing a failure domain, surviving architecture, or maintenance outcome.
Two sound questions retain wording, keys and revisions. Stable IDs/families
remain. Build/check, 13 tests, site links, hashes, and whitespace validation are
separate from this author-led source review. No resilience test or Azure
deployment was executed.
