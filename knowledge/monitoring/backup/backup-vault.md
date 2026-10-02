# Backup vaults and workload identity permissions

Topic ID: monitoring.backup.backup-vault

Objectives: mo-08

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Distinguish vault types

A Microsoft.DataProtection Backup vault manages supported newer workloads such
as Azure Disk Backup and Blob backup. It is not interchangeable with a Recovery
Services vault used for Azure VM backup. Choose the workload first.
[Backup vault overview](https://learn.microsoft.com/en-us/azure/backup/backup-vault-overview).

## Create and authorize

Create the Backup vault in the appropriate region with vault write permissions.
Choose supported redundancy/security options and review its managed identity.
The human operator's permissions and the vault identity's permissions are
different. Creating a vault does not grant its identity rights to source data.
[Creation procedure](https://learn.microsoft.com/en-us/azure/backup/create-manage-backup-vault).

For a disk example, configure a policy and backup instance, then authorize
the vault identity on the source disk, snapshot resource group, and restore
target as the workload requires. Operational disk backups remain snapshots in
the subscription; they are not copied into vault storage. Consequently,
the vault's LRS/GRS setting does not make those snapshots geo-redundant.
[Disk architecture](https://learn.microsoft.com/en-us/azure/backup/disk-backup-overview).

## Verify and troubleshoot

Inspect backup-instance protection state and an actual recovery point/job.
If validation fails, check identity/role scope and workload/region support
rather than assigning broad permissions to every operator.
[Disk configuration](https://learn.microsoft.com/en-us/azure/backup/backup-azure-dataprotection-use-rest-api-backup-disks).

Example: protect one disk with operational snapshots, then restore to a test
disk using appropriate target permissions. This is crash-consistent disk
protection, not automatic whole-VM application recovery.

Review snapshot/vault retention and charges for the chosen workload. Cleanup
must remove or stop protection intentionally and respect soft-delete/dependency
requirements. Do not delete a shared snapshot resource group to retire one
backup instance.
See [Recovery Services vault](recovery-services-vault.md).

[Question data](../../../questions/monitoring/monitoring-backup-backup-vault.json).
