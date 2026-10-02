# Azure VM backup and restore operations

Topic ID: monitoring.backup.vm-restore

Objectives: mo-10

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Protect and inspect

Choose a supported VM, same-region Recovery Services vault, and suitable policy.
Enable protection, trigger an initial backup when appropriate, then inspect the
job and recovery point. Backup Contributor permissions cover backup management;
restore destinations need their own required resource permissions.
[Enrollment](https://learn.microsoft.com/en-us/azure/backup/backup-azure-arm-vms-prepare).
[Roles](https://learn.microsoft.com/en-us/azure/backup/backup-rbac-rs-vault).

Windows application consistency uses VSS; Linux application consistency requires
appropriate pre/post scripts. Crash-consistent protection captures on-disk state
and may need application recovery after restore. Inspect the actual point's
consistency rather than assuming every successful job is application-consistent.
[Consistency](https://learn.microsoft.com/en-us/azure/backup/backup-azure-vms-introduction).

## Restore

Open the protected VM item, choose recovery point, then a supported restore
mode. **Create new** restores a new VM. **Restore disks** allows custom VM
construction. **Replace existing** targets an existing supported VM; it cannot
restore a VM that no longer exists. Check disk encryption, network, region,
subscription, and staging requirements for the selected mode.
[Restore procedure](https://learn.microsoft.com/en-us/azure/backup/backup-azure-arm-restore-vms).

Example: restore a deleted study VM as a new VM in an isolated test network.
Check job success, disks, boot, guest data, application behavior, and permissions.
A completed restore job alone does not establish the app is usable.

## Limits and cleanup

Instant snapshot recovery and vaulted recovery have different data paths and
retention. Secondary-region restoration uses vaulted data, not local instant
snapshots. The restore page's Ultra Disk CRR exclusion conflicts with newer
vault-creation wording claiming support; confirm the current support matrix
before relying on that combination. It is not scored here.

Keep the source safe during verification; restoring existing disks is a change
to that source. Remove test VMs/disks/NICs after checking retained originals
and dependencies. Restoration and retained resources can incur costs.
See [policies](policies.md).

[Question data](../../../questions/monitoring/monitoring-backup-vm-restore.json).
