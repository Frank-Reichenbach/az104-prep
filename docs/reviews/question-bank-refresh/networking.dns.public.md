# Public DNS zones, delegation, and records review

Topic: `networking.dns.public`; objective: `nw-11`. Verified: 2026-10-04.
Source: questions/networking/networking-dns-public.json.

| ID | Decision | Pattern / difficulty | Defect and key |
| --- | --- | --- | --- |
| nw-dns-delegate | Revise, revision 2 | Troubleshooting delegation trace | Replace unrelated private-link/NSG/mail choices with DNS changes; trace rules out a cached A answer as the cause. Key `a`. |
| nw-dns-apex | Revise, revision 2 | Applied complete record configuration | Specify Standard public IP, IPv4, automatic tracking, and prerequisites; compare four record sets. Key `b`. |
| nw-dns-ttl | Revise, revision 2 | Troubleshooting numeric cache lifetime | Replace implausible record rewriting/recreation distractors with competing expiry calculations. Key `c`. |

## Source evidence and acceptance

[Delegation](https://learn.microsoft.com/en-us/azure/dns/dns-delegate-domain-azure-dns)
supports the assigned four-server registrar change. Editing the previous
provider leaves delegation unchanged; a www child NS set cannot replace
parent delegation. [Zone records](https://learn.microsoft.com/en-us/azure/dns/dns-zones-records)
supports record types, required apex records, child NS records, and TTL
caching. The expiry calculation applies that cache lifetime to the supplied
09:00 observation; neither a later TTL reduction nor a record update resets
an existing cache entry. Resolver retention and no flush are explicit.

[Aliases](https://learn.microsoft.com/en-us/azure/dns/dns-alias) supports
Standard public IP resource linkage. Plain A lacks linkage, AAAA answers
the wrong address family, and CNAME conflicts with apex records. The question
does not require a dynamic Standard IP allocation or promise immediate
refresh of cached alias answers. Preview Traffic Manager alternatives are
outside this scenario and are not added as exam objectives.

Each item has one complete correct alternative; no joint sets or variants.
The actual public-DNS/delegation/records topic title does not identify the
specific delegation values, record configuration, or numeric expiry.
Stable question, option, and family IDs remain. This is author-led source
review; build/check, 13 tests, site links, hashes, and whitespace checks
validate artifacts separately. No DNS changes or Azure examples executed.
