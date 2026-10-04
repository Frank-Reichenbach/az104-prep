# Backup vaults and workload identity permissions review

Topic: `monitoring.backup.backup-vault`; objective: `mo-08`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-backup-backup-vault.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-bv-type | Revise, revision 2 | Foundation architecture mapping | Named-vault title supplied former answer; now distinguish management from snapshot placement. Key `a`. |
| mo-bv-identity | Revise, revision 2 | Troubleshooting permission boundary | Replace DNS/notification/name padding with principal and resource-scope mistakes. Key `b`. |
| mo-bv-operational | Revise, revision 2 | Applied resilience evidence | Replace padded binary and disk public-IP claim with distinct unsupported geo-protection conclusions. Key `c`. |

## Evidence and acceptance

[Disk architecture](https://learn.microsoft.com/en-us/azure/backup/disk-backup-overview)
places the backup instance in the Backup vault, operational snapshots in the
subscription, and requires the vault identity's own source/snapshot/restore
permissions. Vault redundancy does not apply to operational snapshots.
[Configuration](https://learn.microsoft.com/en-us/azure/backup/backup-azure-dataprotection-use-rest-api-backup-disks)
identifies source disk, snapshot resource group, vault identity and their
distinct permission scopes. These boundaries support every mapping and
permission rationale. No exact role name, snapshot redundancy or service-wide
disaster guarantee is inferred. The operator's access is explicitly adequate.

One complete answer per item; no variants or joint sets. The actual title
orients to vaults/identity but does not give the required placement mapping,
missing permission scope or unsupported resilience conclusion. IDs/families
and difficulty remain. Author-led source review is separate from build/check,
13 tests, site-link, hash and whitespace checks. No backups or restores ran.
