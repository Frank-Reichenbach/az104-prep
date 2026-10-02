# Site Recovery test failover and drill cleanup

Topic ID: monitoring.recovery.test-failover

Objectives: mo-12

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Implementation and verification

Microsoft recommends a disaster recovery drill before production failover. Check that the replicated VM is protected and healthy, then run **Test Failover** with a chosen recovery point and target network. Prefer a non-production network to avoid conflicts with production addressing and components. A drill does not replace production traffic cutover. [Drill tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-dr-drill).

**Example, not executed:** recover a replicated application VM into an isolated recovery VNet. Check VM state, sizing, selected subnet, application startup, and access from a test client. Record application-specific recovery time and recovered data, rather than treating a completed infrastructure job as proof of application recovery. [Drill tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-dr-drill).

## Cleanup and access

After testing, use **Cleanup test failover**, save observations in Notes, and select **Testing is complete** to remove the test VMs. Check the cleanup job and any separately created test resources; Azure compute/storage resources incur costs while provisioned. [Drill tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-dr-drill).

Site Recovery Operator is intended for failover/failback operations, including drills, rather than enabling or disabling replication. Resource access is checked as well: for example, the target VNet must be readable. Use the documented operation-specific permissions. [Site Recovery RBAC](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-role-based-linked-access-control).

## Constraints and misconceptions

A test VM's successful boot does not validate every application dependency. Plan test DNS and dependent services so a recovered VM does not accidentally write to production systems. The non-production-network recommendation supports this separation; network isolation must be designed for the actual application. [Drill tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-dr-drill).

Recovery-point choices have different purposes. Review their RTO/RPO implications before [production failover](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failover-failback). Do not delete protection or commit a production failover merely to end a drill.

[Question data](../../../questions/monitoring/monitoring-recovery-test-failover.json).
