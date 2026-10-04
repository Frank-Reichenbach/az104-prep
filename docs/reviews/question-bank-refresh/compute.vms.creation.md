# Virtual machine provisioning and access review

Topic: `compute.vms.creation`; objective: `co-06`.
Verified: 2026-10-04. Source: questions/compute/compute-vms-creation.json.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| co-vm-private | Revise, revision 2 | Applied constrained access action | Establish workstation, routing, filtering, and authentication facts; compare plausible path attempts. Key `a`. |
| co-vm-stopped | Revise, revision 2 | Foundation power/billing distinction | State usage-based compute charges and retained disks; compare actual state actions. Key `a`. |
| co-vm-trusted | Revise, revision 2 | Foundation security feature comparison | Replace backup/replication distractors with related encryption and diagnostics. Keys `a`, `b`. |

## Evidence and acceptance

[Linux connection](https://learn.microsoft.com/en-us/azure/virtual-machines/linux-vm-connect)
documents private paths and guest authentication.
[VM roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/compute)
and [NSGs](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview)
distinguish management actions and traffic filtering from connectivity. These
trace all access rationales. The disconnected workstation has no private path;
neither credentials, a management role, nor a filter rule supplies it. The
scenario establishes working VPN reachability and permitted SSH after connecting.

[States/billing](https://learn.microsoft.com/en-us/azure/virtual-machines/states-billing)
documents allocated stopped/running billing, guest shutdown, and deallocation
with retained-resource costs. All four power-action rationales follow that state
table. The question excludes the implication that deallocation cancels every
cost or a reservation commitment by specifying usage-based allocation charges.

[Trusted Launch](https://learn.microsoft.com/en-us/azure/virtual-machines/trusted-launch)
defines Secure Boot and vTPM.
[Disk encryption](https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption-overview)
defines host encryption for data at rest;
[boot diagnostics](https://learn.microsoft.com/en-us/azure/virtual-machines/boot-diagnostics)
defines startup diagnostics. These trace the four feature rationales. Each key
is an individually qualifying feature; the requested two are not presented as
independent whole solutions. Neither other feature implements the specified
Trusted Launch settings. No variants.

The displayed provisioning/access title does not reveal the needed path,
power action, or security pair. One applied decision and two foundation
distinctions retain appropriate difficulty. Stable IDs/families remain.
Build/check, 13 tests, site links, hashes, and whitespace checks validate this
author-led review; no VM, role, network, or security setting was changed in Azure.
