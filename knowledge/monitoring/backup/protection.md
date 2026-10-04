# Backup soft deletion and vault immutability

Topic ID: monitoring.backup.protection

Objectives: mo-07, mo-08

Verified: 2026-10-04
Status: documented; examples have not been executed in Azure.

## Two protections

Soft delete retains deleted backup data for a recovery period. Vault immutability
blocks deletion of vaulted recovery points during their applicable
immutability period. Neither is a substitute for checking restore usability.
[Soft-delete behavior](https://learn.microsoft.com/en-us/azure/backup/secure-by-default).
[Immutability](https://learn.microsoft.com/en-us/azure/backup/backup-azure-immutable-vault-concept).

## Configure and verify

With authorized vault-security operations, inspect soft-delete state/retention
and immutable-vault settings before enrollment. Current documented soft-delete
retention is 14 days by default, configurable up to 180 days. Retention at the
time of deletion governs that deleted item.

Enable immutability first to assess operational effects; locking it is
irreversible. Verify the intended state and immutability period. Policy-based
immutability follows backup retention. For supported specific-duration
immutability, retention can be reduced down to the configured immutable
duration; do not assume every retention reduction is blocked.
Immutability does not apply to operational backups of blobs/files/disks; do not
assume every vault-managed snapshot is immutable.
[Constraints](https://learn.microsoft.com/en-us/azure/backup/backup-azure-immutable-vault-concept).

## Documentation uncertainty

The secure-by-default page contains inconsistent rollout wording: its
introductory preview statement conflicts with a table listing Recovery Services
vault GA in all public/national regions. Backup vault rollout also varies by
region and API/client. Inspect the actual vault and current rollout matrix;
this bank does not score a universal ability to disable soft delete or a
universal immediate-delete behavior.
[Rollout and API details](https://learn.microsoft.com/en-us/azure/backup/secure-by-default).

Example: after accidental backup-item deletion, undelete the item within its
configured window, then restore or resume protection as supported. For a
locked immutable vault, do not plan cleanup by disabling immutability.
Longer soft-delete retention and retained backups can add costs.

Remove lab protection only after confirming retention and shared dependencies.
Azure examples here remain unexecuted. See
[Recovery Services vault](recovery-services-vault.md) and [Backup vault](backup-vault.md).

[Question data](../../../questions/monitoring/monitoring-backup-protection.json).
