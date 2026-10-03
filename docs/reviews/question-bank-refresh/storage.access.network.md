# Storage firewalls and network access review

Topic: `storage.access.network`; objective: `st-01`.
Verified: 2026-10-03. Source: questions/storage/storage-access-network.json.
The module does not disclose the correct rule, default setting, required
component set, or management/data distinction.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| st-net-sas-denied | Revise, revision 2 | Troubleshooting network denial | State on-premises/non-Azure public IPv4 scope so an IP rule is supported; keep related SAS/key/expiry alternatives. Key `rule`. |
| st-net-default-allow | Revise, revision 2 | Troubleshooting configuration repair | Replace subnet Reader, TLS, and redundancy choices with real default-access, IP-rule, and Private Link actions. Preserve the existing service-endpoint path explicitly. Key `deny`. |
| st-net-subnet-requirements | Revise, revision 2 | Applied joint network configuration | Add same-region, public-endpoint, authorization, and initial-state facts. Replace anonymous access with IP-rule/subnet-identity confusion. Keys `endpoint`, `rule`. |
| st-net-arm-data | Revise, revision 2 | Foundation plane distinction | Replace archive-only filtering and automatic portal SAS fiction with real management/data and SAS/firewall misconceptions. Key `planes`. |

## Rationale evidence

The [firewall overview](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security)
supports all sas-denied choices: valid authorization still needs a network path,
public egress IP rules permit on-premises clients, and extra SAS permissions or
duration do not override network filtering. The
[limitations guide](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-limitations)
supports the non-Azure/public-IPv4 qualification and excludes private RFC 1918
ranges from IP rules.

For default-allow, [default access configuration](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-set-default-access)
states that rules restrict access only with defaultAction Deny. The
[private endpoint guide](https://learn.microsoft.com/en-us/azure/storage/common/storage-private-endpoints)
states that creating Private Link does not close the public endpoint and
distinguishes it from the public service-endpoint path. The limitations page
notes surviving resource-instance/trusted-service exceptions when public access
is disabled; this question explicitly excludes those exceptions.

For subnet-requirements, the overview and
[virtual network rule procedure](https://learn.microsoft.com/en-us/azure/storage/common/storage-network-security-virtual-networks)
require both a Storage service endpoint and an allowed subnet. Microsoft.Storage
is the stated same-region endpoint. The private endpoint guide establishes a
different path, and the limitations page disqualifies the private-range IP rule.

For arm-data, the limitations guide directly excludes control-plane operations
from the storage firewall, while the overview separates network permission
from data authorization and disallows SAS firewall bypass. These support every
correct and wrong plane/credential assertion. No account-tier exception is
invented and no general private-endpoint-only promise relies on shorthand.

## Answer-set and acceptance review

For subnet-requirements remove the endpoint and the specified path lacks its
service identity; remove the account rule and default Deny does not admit the
subnet. Private Link does not substitute for the required service-endpoint
path; an IP rule for the private range cannot authorize it. No other pair of
the four choices qualifies. Each other question has one qualifying choice.

There are no variants. The batch includes two observed failures, a joint
configuration, and a foundation distinction. Stable IDs and families remain.
Build/check, 13 Node tests, static-site links, ledger hashes, and whitespace
checks validate the checkpoint. Source review is author-led; no Azure network
settings were changed and no Azure labs were executed.
