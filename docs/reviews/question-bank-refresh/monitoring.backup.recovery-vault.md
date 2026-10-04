# Recovery Services vault configuration review

Topic: `monitoring.backup.recovery-vault`; objective: `mo-07`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-backup-recovery-vault.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-rsv-region | Revise, revision 2 | Foundation placement distinction | Replace matching-name/global padding with paired-region and resource-group misconceptions. Key `a`. |
| mo-rsv-redundancy | Revise, revision 2 | Applied configuration sequence | Define empty GRS vault and required LRS; compare ordinary timing and source/restore setting mistakes. Key `b`. |
| mo-rsv-crr | Revise, revision 2 | Applied complete configuration | Replace recall plus public-IP padding with redundancy and restore-feature combinations. Key `c`. |

## Evidence and acceptance

[Vault creation/configuration](https://learn.microsoft.com/en-us/azure/backup/backup-create-recovery-services-vault)
requires same-region VM enrollment, disables ordinary redundancy modification
after backup configuration, and requires GRS plus enabled Cross Region Restore
for supported secondary paired-region restores. Resource-group location does
not replace the enrollment constraint. Source disk and restore options do not
set vault replication. ZRS remains regional; Cross Subscription Restore changes
subscription scope, not the secondary-region capability. These documented
boundaries support every alternative. Workload and region support are explicit;
the question does not promise immediate availability or zero data loss.

Each item has one complete alternative; no joint sets or variants. The actual
vault-configuration title supplies no location, sequence or restore setting.
IDs/families and appropriate difficulty levels remain. Workarounds involving
new vaults/data deletion are outside the stated ordinary change sequence.
Author-led technical review is separate from build/check, 13 tests, site-link,
hash and whitespace checks. No Azure vault or restore was executed.
