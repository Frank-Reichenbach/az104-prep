# Site Recovery test failover and drill cleanup review

Topic: `monitoring.recovery.test-failover`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-recovery-test-failover.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-drill-network | Revise, revision 2 | Applied network design | Make continued production and isolation decisive; replace offline/no-network padding. Key `b`. |
| mo-drill-cleanup | Revise, revision 2 | Foundation workflow outcome | Topic title named former workflow answer; now test deletion, protection and reverse-copy distinctions. Key `a`. |
| mo-drill-role | Revise, revision 2 | Applied permission comparison | Replace unrelated Blob reader with plausible broader Owner assignment. Key `c`. |

## Evidence and acceptance

[Azure drill](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-dr-drill)
documents target-region non-production networking and confirmed cleanup of test
VMs. [Test-failover guidance](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-test-failover-to-azure)
explains ongoing replication, production-network conflict risks, and loss of
test changes without replication back. These support all network and cleanup
alternatives. [Recovery RBAC](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-role-based-linked-access-control)
distinguishes Reader, Operator and Contributor. Owner is disqualified by its
broader permissions rather than by inability to perform recovery.

Linked-resource read access is explicitly supplied in the role question.
An isolated VNet still requires application-specific test dependencies; the
question does not claim that any newly created VNet guarantees safe app writes.

Each item has exactly one complete answer; no joint sets or family variants
occur in this topic. Every distractor fails a stated requirement or documented
behavior, as detailed above and in its rationale. The displayed topic title
(`Site Recovery test failover and drill cleanup`) supplies context, not the requested
configuration, outcome or evidence distinction. Stable IDs and families remain.
The table records the reasoning level and necessary repairs; retained wording
is independently checked against the cited source within this author-led review.
Build/check, all 13 tests, static-site/internal links, ledger hashes and whitespace
checks validate structure and behavior separately from Azure technical review.
No Azure deployments, backups, restores, notifications or failovers were executed.
