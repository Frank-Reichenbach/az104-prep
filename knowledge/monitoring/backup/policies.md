# Backup schedules, retention, and policy selection

Topic ID: monitoring.backup.policies

Objectives: mo-09

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Separate schedule and retention

Schedule determines when recovery points are created. Retention determines
how long selected points remain. Recovery point objective (RPO) describes
tolerable data loss; recovery time objective (RTO) describes tolerable recovery
time. More frequent backups do not by themselves prove a particular RTO.
[VM backup process](https://learn.microsoft.com/en-us/azure/backup/backup-azure-vms-introduction).

## Configure

With backup-policy write permissions, open the vault's **Backup policies**,
select the workload and supported policy subtype, then set schedule/time zone
and retention. Associate the policy with protected items. Review dependencies
before editing a policy shared by multiple resources.
[VM policy procedure](https://learn.microsoft.com/en-us/azure/backup/backup-azure-arm-vms-prepare).

For Azure VM multiple daily backups, Enhanced policy supports schedules as
frequent as four hours. Snapshot/instant-restore retention and vaulted retention
are different. Permitted snapshot retention depends on frequency; not every
hourly configuration supports the headline 30-day maximum.
[Enhanced policy](https://learn.microsoft.com/en-us/azure/backup/backup-azure-vms-enhanced-policy).

## Verify and constraints

Inspect actual successful jobs and available recovery points after enrollment.
A configured schedule is not evidence of successful backups. Review app/crash
consistency and restore support for the workload.

Enhanced → Standard conversion is not supported. The Enhanced-policy page
contains stale later text saying Standard → Enhanced migration and Standard
Trusted Launch backup are impossible, while its current introductory notes
describe newer support. This bank does not score a universal statement on those
conflicting details.
[Policy documentation](https://learn.microsoft.com/en-us/azure/backup/backup-azure-vms-enhanced-policy).

Example: choose a four-hour VM schedule for the required recovery-point
frequency, then verify snapshots and vaulted points meet retention needs.
Shortening retention may remove recovery points and can be blocked by
immutability. Keep [vault protection](protection.md) in view.
Long retention and frequent snapshots can increase costs; retire policies only
after checking their protected items.

[Question data](../../../questions/monitoring/monitoring-backup-policies.json).
