# Site Recovery production failover and recovery points

Topic ID: monitoring.recovery.failover

Objectives: mo-12

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Recovery-point decision

**Latest processed** uses a point already processed and avoids additional processing time; **Latest** processes received replication data before recovery, favoring a more recent point at a possible time cost. **Latest app-consistent** selects the most recent application-consistent point. Read point timestamps against the application's recovery objectives; none guarantees recovery of source writes that never reached the service. [Failover tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback).

## Implementation and verification

Check protected/healthy status, supported configuration, target capacity, and application/network dependencies. Run a [drill](test-failover.md) first when possible. Start Failover, choose a recovery point, and monitor the job. The optional source-shutdown setting attempts shutdown; failover can continue if shutdown fails. Include prevention of competing application writers in the operational runbook. [Failover tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback).

Verify the recovered VM and application before selecting **Commit**. Before committing, you can choose another available recovery point. Commit deletes the available Site Recovery recovery points for this VM and ends the ability to change that point. It is not an Azure Backup retention operation. [Failover tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback).

## Access, limitations, and next step

Use Site Recovery Operator for the recovery operations with required linked-resource access. Enabling replication needs broader operation-specific permissions. [RBAC requirements](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-role-based-linked-access-control).

Target compute placement and network settings require verification; replication health alone does not prove application availability. Actual failover provisions resources and incurs costs. This guide is an unexecuted example, not authorization to start an Azure failover. After commit, [reprotect and fail back](failback.md) when the primary region is ready. [Failover tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback).

[Question data](../../../questions/monitoring/monitoring-recovery-failover.json).
