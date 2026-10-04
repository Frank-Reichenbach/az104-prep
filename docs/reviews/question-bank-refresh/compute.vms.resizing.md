# Resizing virtual machines review

Topic: `compute.vms.resizing`; objective: `co-09`.
Verified: 2026-10-04. Source: questions/compute/compute-vms-resizing.json.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| co-resize-restart | Revise, revision 2 | Foundation restart/allocation distinction | Compare restart and cluster-deallocation expectations. Key `a`. |
| co-resize-set | Revise, revision 2 | Applied outage/placement plan | Specify two set members and target availability; compare allocation plans. Key `a`. |
| co-resize-proof | Revise, revision 2 | Troubleshooting failed operation | Compare evidence sets instead of assumptions about erased disks or history deletion. Key `a`. |

## Evidence and acceptance

[Resize guidance](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/resize-vm)
documents running-VM restart, deallocation for a size unavailable on the current
cluster, and deallocating all availability-set members in that case. These
trace all restart/deallocation and placement-plan rationales.
The page's availability-set CLI sample uses scale-set commands, unlike its
availability-set prose and PowerShell example. That sample is not treated as
a verified availability-set procedure and is not imported into scored content.
[States/billing](https://learn.microsoft.com/en-us/azure/virtual-machines/states-billing)
distinguishes guest shutdown from deallocation, tracing the allocated guest-off
distractor. Regional availability and quota are explicit prerequisites; no plan
claims deallocation guarantees subsequent physical capacity.

Resize guidance warns that the model can display a requested size after a
failed resize while the running VM retains its previous allocation. This traces
the operation/guest-evidence key and model-only distractor. A size listing,
quota check, or earlier creation record cannot prove the later allocation;
these are scenario-derived evidence distinctions, not separate service limits.
The observed failed operation makes this troubleshooting rather than applied.

Each complete expectation, plan, or evidence candidate is evaluated as a whole;
one qualifies per item. No joint sets or variants. The displayed resizing title
does not choose a restart requirement, set-wide outage plan, or proof of actual
allocation. One foundation distinction, one applied plan, and one diagnostic
choice supply different reasoning. Stable IDs/families remain. Build/check,
13 tests, site links, hashes, and whitespace validate this author-led checkpoint.
No resize, restart, or deallocation was performed in Azure.
