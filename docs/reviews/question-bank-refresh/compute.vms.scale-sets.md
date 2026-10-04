# Virtual machine scale sets and autoscale review

Topic: `compute.vms.scale-sets`; objective: `co-12`.
Verified: 2026-10-04. Source: questions/compute/compute-vms-scale-sets.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-vmss-mode | Keep, revision 1 | Foundation immutable mode distinction | Distinct settings/actions cannot convert existing orchestration mode. Key `a`. |
| co-vmss-manual | Revise, revision 2 | Applied model/instance outcome | Specify Uniform and exclude other update mechanisms; compare complete image combinations. Key `a`. |
| co-vmss-scale | Revise, revision 2 | Applied jointly required rule pair | Remove redundant rule/profile components; define both exact directional rules. Keys `a`, `b`. |

## Evidence and acceptance

[Orchestration modes](https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-orchestration-modes)
documents mode selection at creation and inability to change it. Upgrade policy,
capacity, and resource-group membership are different settings, tracing all
retained mode rationales. No migration procedure is assumed by the wording.

[Upgrade policy](https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-upgrade-policy)
documents Manual behavior: existing instances need explicit updating; newly
created instances use the latest model. It traces every image-pair rationale.
Uniform scope and absence of separate automatic image updates avoid conflating
orchestration mode, model upgrades, and independent update mechanisms.

[Autoscale settings](https://learn.microsoft.com/en-us/azure/azure-monitor/autoscale/autoscale-understanding-settings)
defines metric windows/comparisons, count changes, profile bounds and cooldown.
[VMSS autoscale](https://learn.microsoft.com/en-us/azure/virtual-machine-scale-sets/virtual-machine-scale-sets-autoscale-overview)
documents the valid scaling profile prerequisite. These trace all four rule
rationales: `a` increases under high CPU, `b` decreases under low CPU; `c`, `d`
reverse the required directions. Both keys are necessary with no existing
rules: remove one and the matching direction is absent. No alternative pair
implements the specified policy. Thresholds are scenario examples, not defaults;
rules respect limits and cooldown rather than guaranteeing unbounded scaling.

One complete image candidate or immutable-mode statement qualifies. Autoscale
explicitly uses jointly required rules, not independent whole solutions.
No variants. The displayed title does not identify a mode conversion, image
pair, or correct metric/action mapping. Stable IDs/families remain. Build/check,
13 tests, site links, hashes, and whitespace validate this author-led checkpoint.
No scale set, instance update, or autoscale rule was created in Azure.
