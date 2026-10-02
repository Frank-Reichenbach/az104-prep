# Azure Files backup and item recovery

Topic ID: monitoring.backup.files-restore

Objectives: mo-10

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Choose protection tier

Azure Files backup supports snapshot and vaulted protection workflows through
a Recovery Services vault. Snapshot points remain in the source account;
vaulted backup adds a separate copy and its own retention. Do not assume vault
replication protects snapshot-only data.
[Files backup](https://learn.microsoft.com/en-us/azure/backup/backup-azure-files).

## Configure and verify

With backup-management and storage discovery/configuration permissions, choose
Azure Files in the vault's backup flow. Select a supported account in the vault
region, shares, policy/tier, schedule, and retention. Review existing account
registration before attempting a different vault.
[Enrollment procedure](https://learn.microsoft.com/en-us/azure/backup/backup-azure-files).

Trigger a backup, inspect the job, then verify recovery points. For recovery,
select the point, full-share or item-level operation, original or supported
alternate destination, and skip/overwrite conflict behavior.
[Restore procedure](https://learn.microsoft.com/en-us/azure/backup/restore-afs).

## Restore verification and limits

Example: restore an accidentally deleted folder into a test folder on an
alternate share, keeping the live source intact. Verify files, permissions,
content, and application use before a production overwrite. Existing files
at an original destination can be skipped or overwritten according to the
chosen option.
[Recovery choices](https://learn.microsoft.com/en-us/azure/backup/restore-afs).

Check the current support matrix for account/share protocols, tier, network,
and destination constraints. A full-share backup is not a license to restore
to any arbitrary account or region. Snapshot and vaulted retention/charges
differ. Remove test restore contents once verified; retain recovery points
according to the policy.

See [share snapshots](../../storage/azure-files/snapshots.md),
[share soft deletion](../../storage/azure-files/soft-delete.md), and
[vault configuration](recovery-services-vault.md). Native share soft deletion
and backup-item soft deletion are different protection layers.

[Question data](../../../questions/monitoring/monitoring-backup-files-restore.json).
