# Site Recovery reprotection and failback

Topic ID: monitoring.recovery.failback

Objectives: mo-12

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Reverse replication before returning

After [production failover](failover.md) is committed, **Re-Protect** reverses replication from the secondary region to the primary. Check primary-region availability and permissions, review reverse-direction settings, and monitor initial synchronization followed by replication of changes. Reprotect does not immediately return production execution to the primary region. [Reprotection tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback).

## Implementation and verification

**Example, not executed:** after the primary region is available again, reprotect the recovered VM toward the primary. Wait for healthy/protected state and completed synchronization. Verify that the original primary-region VM is shut down before failback; the tutorial explains that an active original VM can prevent disk synchronization and fail the operation. Then run failover in the secondary-to-primary direction using an appropriate point. [Failback tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failback).

Verify primary application health and traffic routing, finish the failover workflow, and reprotect from primary to secondary to restore disaster recovery coverage. Observe actual replication direction and job results rather than assuming failback automatically restores ongoing protection. [Failback tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failback); [commit/reprotection workflow](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback).

## Permissions and limitations

Recovery-operation rights alone do not establish access to all linked resources. Reprotection validates the relevant compute, network, storage, and other permissions in the destination; consult the operation-specific table. [RBAC requirements](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-role-based-linked-access-control).

Reverse replication and recovery consume Azure resources. Plan a maintenance window, data validation, DNS/traffic cutover, and cleanup verification. The tutorial distinguishes cleanup behavior for managed and unmanaged disks; do not indiscriminately delete recovery resources before protection is re-established. [Failback tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failback).

The failback tutorial's final reprotection section refers to reviewing primary-region settings while describing primary-to-secondary protection. Treat that wording as ambiguous: explicitly verify the actual source/target direction in the operation and use the [reprotection workflow](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback). No scored question depends on that inconsistent wording.

[Question data](../../../questions/monitoring/monitoring-recovery-failback.json).
