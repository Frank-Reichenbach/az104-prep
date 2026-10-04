# Site Recovery replication for Azure virtual machines review

Topic: `monitoring.recovery.replication`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-recovery-replication.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-replication-cache | Revise, revision 2 | Foundation placement | Replace report-region/temporary-disk padding with source, target, vault and scope misconceptions. Key `b`. |
| mo-replication-permissions | Revise, revision 2 | Applied scope planning | Replace auto-Owner/encryption padding; require linked-resource authorization before enrollment. Key `a`. |
| mo-replication-network | Keep, revision 1 | Troubleshooting recommended connectivity | Restrictive NSG, changing service IPs and separate Storage firewall review make key `c` unique. |

## Evidence and acceptance

[Replication tutorial](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-tutorial-enable-replication)
and [networking](https://learn.microsoft.com/en-us/azure/site-recovery/azure-to-azure-about-networking)
place cache storage in the source region. Networking recommends service-tag
outbound HTTPS rules instead of hard-coded addresses, separately reviews Storage
firewall access, and excludes authenticated proxies. Inbound RDP does not supply
those outbound dependencies. These support every retained networking rationale
and cache placement alternative. [RBAC](https://learn.microsoft.com/en-us/azure/site-recovery/site-recovery-role-based-linked-access-control)
requires operation permissions on linked resources and distinguishes Contributor
from Reader. Vault scope cannot extend to unrelated source/target resources.

Service tags are Microsoft's recommendation for changing service addresses,
not proof of a successful replication configuration. The networking answer is
one complete design, not independently sufficient settings scored as a joint set.
Source/target access and support must still be verified in an actual deployment.

Each item has exactly one complete answer; no joint sets or family variants
occur in this topic. Every distractor fails a stated requirement or documented
behavior, as detailed above and in its rationale. The displayed topic title
(`Site Recovery replication for Azure virtual machines`) supplies context, not the requested
configuration, outcome or evidence distinction. Stable IDs and families remain.
The table records the reasoning level and necessary repairs; retained wording
is independently checked against the cited source within this author-led review.
Build/check, all 13 tests, static-site/internal links, ledger hashes and whitespace
checks validate structure and behavior separately from Azure technical review.
No Azure deployments, backups, restores, notifications or failovers were executed.
