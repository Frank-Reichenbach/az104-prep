# User-defined routes and next hops review

Topic: `networking.vnets.routes`; objective: `nw-04`.
Verified: 2026-10-04. Sources: questions/networking/networking-vnets-routes.json
and questions/networking/reviewed-variants.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| nw-route-prefix | Keep, revision 1 | Applied prefix interpretation | /16 VNet route beats /0 appliance UDR. Key `a`. |
| nw-route-association | Revise, revision 2 | Troubleshooting unapplied table | Observed unchanged routes require the source subnet association; replace disk/service-tag distractors. Key `b`. |
| nw-route-forward | Revise, revision 2 | Troubleshooting joint forwarding repair | State both disabled settings and verified paths; eliminate irrelevant DNS/public-allocation choices. Keys `a`, `c`. |
| nw-route-specific-variant | Keep, revision 1 | Applied changed-prefix interpretation | /24 appliance UDR beats /16 VNet route. Key `appliance`. |

## Evidence and acceptance

[Routing](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview)
documents longest-prefix selection, system routing, UDR associations, and
Azure NIC plus guest forwarding. [Route-table management](https://learn.microsoft.com/en-us/azure/virtual-network/manage-route-table)
documents applying the table to subnets. These trace every option: a source
association changes the workload routes; firewall-subnet association, group
move, or NSG attachment cannot substitute for it.

The forwarding key needs both platform permission and guest routing. Removing
either leaves that explicitly disabled forwarding boundary in place. Enabling
the source VM NIC does not enable the firewall NIC; bypassing the firewall
violates the goal. No other offered pair meets the constraint. Guest policy,
reachability, and return route are explicit rather than implied by a UDR.

Both retained prefix items independently evaluate the exact destination and
all next hops. The variant changes the decisive appliance prefix from /0 to
/24, which changes the selected path while preserving the longest-match
principle. Neither scores all UDRs always winning, outside-subnet Internet
routing, absent-custom-route dropping, or duplicated packets. The scenarios
exclude service-endpoint route exceptions by naming the active candidates.

Exactly one next hop/association qualifies in single-answer items; the repair
requires the unique two-setting set. Stable IDs/families remain; the app still
selects one family member per quiz. The title supplies context rather than
the selected prefix, association, or forwarding boundary. Author-led source
review is separate from build/check, 13 tests, site links, hashes, and whitespace
validation. No routes or forwarding settings were changed in Azure.
