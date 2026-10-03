# Network and application security groups review

Topic: `networking.security.nsg-asg`; objective: `nw-06`.
Reviewed: 2026-10-03. Source: questions/networking/networking-security-nsg-asg.json.
Displayed context identifies NSGs and ASGs without supplying a rule number,
membership boundary, or explanation of an existing SSH flow.

| Question | Decision | Pattern / difficulty | Defect and repair |
| --- | --- | --- | --- |
| nw-nsg-priority | Revise to 2 | Applied numeric configuration interpretation | Original alternatives mixed rule results and vague precedence claims. Now four named rule/action candidates; the earlier nonmatching port requires evaluating filters before priority. |
| nw-asg-membership | Revise to 2 | Foundation: recognize the membership boundary | Replaced padded yes/no choices and unrelated DNS/rule-count claims with same-VNet, peering, resource-group, and subscription candidates. |
| nw-nsg-state | Revise to 2 | Troubleshooting: explain old/new connection outcomes | Replaced UDP-only, NIC deletion, and SSH bypass claims with cache, per-IP permission, and traffic-direction misconceptions. Replaced the tautological correct explanation with flow-state reasoning. |

Each item keeps its ID, four stable option IDs, family, objective, and difficulty.
Each has a unique qualifying answer (`a`, `b`, and `c`, respectively); IDs are
not displayed answer letters. No new variants or questions were introduced.
The batch assesses three different decisions rather than repeated definitions.

## Source verification and option rationale mapping

- [NSG security rules and default rules](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview):
  all nw-nsg-priority options. Lower numbers are considered first, but filters
  must match. Rule 100 is for TCP 80; 200 first matches TCP 443. Later custom
  and default rules cannot determine the already matched flow's result.
- [ASG constraints](https://learn.microsoft.com/en-us/azure/virtual-network/application-security-groups):
  all nw-asg-membership options. The first member establishes the VNet for
  subsequent NICs. Shared organizational scopes or peering do not satisfy
  that boundary; a different subnet in the same VNet does.
- [NSG stateful rule evaluation](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview):
  all nw-nsg-state options. Established flows survive removal of their allow;
  newly initiated flows use the updated rules. Per-client permission and an
  outbound exception cannot account for this new inbound flow. The scenario
  explicitly shows applied effective rules, removing propagation uncertainty.
- [Filtering directions](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-group-how-it-works):
  confirms the directional distinction in nw-nsg-state/d's explanation.

All sources were read on October 3, 2026. No hard service constraint has been
recast as a recommendation. No conflicting documentation or unsupported SKU
assumption is used in a scored key. The root knowledge guide remains unchanged;
it already links these distinctions to the supporting pages.

## Acceptance and checkpoint

All four alternatives in each item were reviewed under its full scenario.
There is no second offered qualifying choice. Rationale lengths no longer
make the correct state explanation conspicuously detailed. This is an
author-led technical/style review, not an Azure lab or independent evaluation.
Build/check, 13 Node tests, static-site links, review hashes, and whitespace
checks validate the committed checkpoint separately from source correctness.
