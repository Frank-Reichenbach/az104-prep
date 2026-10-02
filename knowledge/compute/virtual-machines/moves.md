# Moving VMs between scopes and regions

Topic ID: compute.vms.moves  
Objectives: co-08  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Choose the operation

| Requirement | Administrative approach |
| --- | --- |
| New resource group, same region | ARM resource move with dependency validation |
| New subscription, same tenant and region | ARM move after checking support, dependencies, and quotas |
| New Azure region | A regional relocation workflow, such as Azure Resource Mover |
| Different Entra tenant | No direct cross-tenant ARM resource move |

Changing a resource group does not relocate the VM physically. Its resource ID
changes, so scripts and external references may need updates.
[ARM moves](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-resource-group-and-subscription).

## Move implementation

Inventory the VM, NICs, disks, virtual network, availability set, public IPs,
extensions, encryption dependencies, and backup configuration. Confirm target
provider registration, quotas, Policy, and role access. The operator needs move
permission on the source group and write permission on the destination group.

In the portal choose **Move** from the resource group's resource list, select
the destination, include required dependencies, and run validation before
confirming. Cross-subscription VM moves require moving the virtual network and
its dependent resources together. VMs in an availability set cannot be moved
individually. Marketplace plans, encryption, Backup, and scheduled patching have
additional restrictions or preparation steps.
[VM move limitations](https://learn.microsoft.com/en-us/azure/azure-resource-manager/management/move-limitations/virtual-machines-move-limitations).

During an ordinary ARM scope move, resource-group management operations are
locked while existing resources generally continue running. Scenario-specific
preparation may still require downtime. Do not assume every VM configuration
supports an online move.

## Regional relocation

With Azure Resource Mover, add the VM and dependencies to a move collection,
resolve dependencies, review destination settings, prepare replication, initiate
the move, validate the destination, and commit or discard the initiated move as
appropriate. Review downtime and target network addressing before cutover.
A regional move can need new IP addresses, DNS changes, and target capacity.
[Regional VM tutorial](https://learn.microsoft.com/en-us/azure/resource-mover/tutorial-move-region-virtual-machines).

## Verify and clean up

Confirm the VM starts, network paths work, monitoring and backup remain configured,
and resource-ID references and access assignments are correct at the new scope.
Inherited access changes with the resource group or subscription. Retain source
resources until the destination is accepted, then explicitly remove unneeded
sources and replication artifacts; do not assume a regional move removes every
billable source resource. Never delete the original data before validation.
See [resource group administration](../../identity/governance/resource-groups.md).

[Question data](../../../questions/compute/compute-vms-moves.json).
