# Site Recovery reprotection and failback review

Topic: `monitoring.recovery.failback`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-recovery-failback.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-reprotect-direction | Revise, revision 2 | Foundation direction/outcome | Replace Backup-vault deletion padding with disabled replication misconception. Key `d`. |
| mo-failback-ready | Revise, revision 2 | Applied prerequisite assertions | State independent checks, original VM shutdown given; replace destructive point deletion with incomplete-sync assumption. Key `a`, `c`. |
| mo-failback-protection | Keep, revision 1 | Applied protection next step | Primary execution plus required secondary recovery makes forward reprotection unique. Key `b`. |

## Evidence and acceptance

[Reprotection](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-how-to-reprotect)
requires committed failover and starts secondary-to-primary replication; it
does not immediately transfer production execution or disable protection.
[Failback](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-failback)
requires primary availability/access, healthy Protected state and completed
synchronization, with the original primary VM shut down. It then requires
primary-to-secondary reprotection after returning. These support every
direction, readiness and retained next-step rationale. Test cleanup is a
different workflow and cannot establish ongoing production replication.

The two readiness answers are independent true prerequisite assertions,
not an exhaustive pair sufficient by itself for failback. The original primary
VM shutdown is given. Known ambiguous target-region wording at the end of the
failback tutorial remains documented; the scored direction follows its explicit
introductory/next-step statements and the reprotection guide.

The direction and next-step items each have one complete answer. The readiness
item selects exactly two independent true assertions; no family variants occur. Every distractor fails a stated requirement or documented
behavior, as detailed above and in its rationale. The displayed topic title
(`Site Recovery reprotection and failback`) supplies context, not the requested
configuration, outcome or evidence distinction. Stable IDs and families remain.
The table records the reasoning level and necessary repairs; retained wording
is independently checked against the cited source within this author-led review.
Build/check, all 13 tests, static-site/internal links, ledger hashes and whitespace
checks validate structure and behavior separately from Azure technical review.
No Azure deployments, backups, restores, notifications or failovers were executed.
