# Site Recovery replication for Azure virtual machines

Topic ID: monitoring.recovery.replication

Objectives: mo-11

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Purpose and implementation

Site Recovery prepares another region to recover an Azure VM. Enable replication through a Recovery Services vault, select the source VM and target region, and review target compute, disks, network, and replication policy. The Mobility service extension captures changes; a cache storage account in the source region participates in transferring those changes to the recovery region. This is disaster recovery, not a replacement for retained backups. [Replication tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-enable-replication).

**Example, not executed:** protect a supported VM in region A for recovery in region B. Check supported OS/disk configurations and target quota first. Configure the recovery VNet/subnet and VM sizing, enable replication, and wait for initial synchronization before scheduling a drill. [Replication tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-enable-replication).

## Connectivity and permissions

Microsoft recommends service tags rather than hard-coded service IP lists when NSGs restrict outbound replication connectivity. Permit the documented HTTPS dependencies, including source-region Storage and authentication/recovery services. Review cache-storage firewall access separately; an NSG allowance does not grant storage firewall access. Authenticated proxies are unsupported. [Networking guidance](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-about-networking).

Site Recovery Contributor manages recovery operations but cannot create/delete a vault or assign roles. Enabling replication also requires permissions on linked compute, network, storage, and any relevant encryption/automation resources; assigning only a vault role does not establish access everywhere. [RBAC requirements](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-role-based-linked-access-control).

## Verification and limitations

Inspect the replicated item's health, replication status, and recovery points. Verify the target network, sizing, quota, and application dependencies in a [test failover](test-failover.md). A healthy replication status does not prove that DNS, application authentication, or traffic routing will work after recovery. [Replication tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-enable-replication); [networking guidance](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-about-networking).

Replication consumes storage and service resources. Review costs and the retention policy before a real deployment; this repository has not enabled Azure replication. Recovery replication and [backup policies](../backup/policies.md) address different recovery needs.

[Question data](../../../questions/monitoring/monitoring-recovery-replication.json).
