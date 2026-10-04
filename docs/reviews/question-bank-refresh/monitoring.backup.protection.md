# Backup soft deletion and vault immutability review

Topic: `monitoring.backup.protection`; objectives: `mo-07`, `mo-08`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-backup-protection.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-protection-locked | Revise, revision 2 | Applied permitted operation | Replace padded binary with retention-preserving retirement; explicitly policy-based immutability. Key `a`. |
| mo-protection-soft | Revise, revision 2 | Foundation protection distinction | Replace zero-cost/current-state padding with deletion blocking, geography and capture misconceptions. Key `b`. |
| mo-protection-operational | Revise, revision 2 | Applied protection evidence | Replace binary/name padding with tier, SKU and location interpretations. Key `c`. |

## Evidence and acceptance

[Immutability](https://learn.microsoft.com/en-us/azure/backup/backup-azure-immutable-vault-concept)
permits stop-with-retained-data, makes locked state irreversible, blocks early
deletion under policy-based protection, and excludes operational backups.
These support all locked/operational options. The source now also documents
specific-duration immutability: retention reduction may be allowed above that
duration. The scenario explicitly uses policy-based protection; knowledge
wording is narrowed accordingly rather than scoring a universal restriction.
[Soft delete](https://learn.microsoft.com/en-us/azure/backup/secure-by-default)
supports post-deletion recovery within retention, distinct from deletion
blocking, geographic replication and capturing new changes. Rollout wording
conflicts remain documented in knowledge and are not scored.

Every item has one complete alternative; no joint sets or variants. The actual
title names both protections but does not identify allowed operations, purpose
or operational-tier coverage. IDs/families and difficulty remain. Review is
author-led, separate from build/check, 13 tests, site links, hashes and whitespace
checks. No vault changes, deletions or Azure recoveries were executed.
