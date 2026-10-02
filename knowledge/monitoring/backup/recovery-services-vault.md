# Recovery Services vault configuration

Topic ID: monitoring.backup.recovery-vault

Objectives: mo-07

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Select the vault

Recovery Services vaults support Azure VM backup and other supported recovery
workloads, including Azure Site Recovery. They differ from Microsoft.DataProtection
Backup vaults. For Azure VM backup, choose a vault in the VM's region.
[Creation](https://learn.microsoft.com/en-us/azure/backup/backup-create-recovery-services-vault).

## Configure before protection

Use authorized vault creation/configuration permissions; Backup Contributor
provides backup management but is not universal permission on every restore
target. Create the vault, then review redundancy, security, and encryption
before adding protected items.
[Backup RBAC](https://learn.microsoft.com/en-us/azure/backup/backup-rbac-rs-vault).

Choose LRS, ZRS where supported, or GRS for the required resilience. Storage
replication cannot simply be changed after configuring backup. Cross Region
Restore requires GRS and supported workloads/regions; merely selecting GRS
does not guarantee every workload supports user-initiated secondary restore.
[Vault settings](https://learn.microsoft.com/en-us/azure/backup/backup-create-recovery-services-vault).

## Verify and limitations

Inspect region, backup configuration, identity, encryption, and protection
state. For customer-managed encryption, configure identity/key access and
required Key Vault protection before protected items. Default platform-managed
encryption requires no supplied key.

Microsoft recommends reviewing defaults before backup. Enable/retain applicable
soft-delete protection and consider immutability against premature recovery
point deletion. Locking immutability makes that setting irreversible.
[Immutable vault](https://learn.microsoft.com/en-us/azure/backup/backup-azure-immutable-vault-concept).

Example: provision a regional VM backup vault with GRS and review Cross Region
Restore requirements before enrolling the VM. Backups/vault storage can incur
costs even while the source VM is stopped. Cleanup must respect retention,
protected items, ASR dependencies, and soft-deletion behavior; do not treat vault
deletion as a routine way to change redundancy.
See [storage redundancy](../../storage/accounts/redundancy.md).

[Question data](../../../questions/monitoring/monitoring-backup-recovery-vault.json).
