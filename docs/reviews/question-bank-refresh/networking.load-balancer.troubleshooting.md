# Load Balancer probes and connectivity diagnosis review

Topic: `networking.load-balancer.troubleshooting`; objective: `nw-13`.
Verified: 2026-10-04. Source: networking-load-balancer-troubleshooting.json.

| ID | Decision | Pattern / difficulty | Defect and key |
| --- | --- | --- | --- |
| nw-lb-http-probe | Revise, revision 2 | Troubleshooting constrained repair | Compare health-path, timing, TCP substitution and threshold changes; preserve application readiness. Key `a`. |
| nw-lb-probe-tag | Revise, revision 2 | Applied source/priority/port mapping | Original was recall mislabeled applied and title supplied tag name. Full rule decision removes clue. Key `b`. |
| nw-lb-healthy-block | Revise, revision 2 | Troubleshooting diagnostic stage | Replace destructive/unrelated padding with plausible checks distinguished by port and failed stage. Key `c`. |

## Evidence and acceptance

[Health probes](https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-custom-probe-overview)
supports HTTP 200, explicit non-200 failure regardless of timeout threshold,
TCP-only checks, independent probe ports, and the IPv4 probe source tag.
Interval/threshold changes retain the failed response; TCP substitution loses
the stated readiness requirement. [NSG rules](https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview)
supports lower-number-first ordering. The rule alternatives fail specific
source, priority, or destination-port conditions.

[Inbound troubleshooting](https://learn.microsoft.com/en-us/troubleshoot/azure/load-balancer/troubleshoot-common-problems/no-inbound-connectivity-standard-external-load-balancers)
supports checking client-path rules, filters and listeners separately from
probe health. TLS inspection is later than the supplied failed TCP stage;
DNS is excluded by the direct verified-IP test. These exclusions come from
the scenario and protocol ordering, not a claim that TLS or DNS never fail.
A guessed dedicated backend troubleshooting URL was unavailable; no
claim depends on them. The accessible inbound troubleshooting page linked from the common index is used.

Each question has one complete correct change/check; no joint sets/variants.
The actual probe/diagnosis title does not select a rule, health response, or
diagnostic path. Stable IDs/families remain. Author-led source review is
separate from build/check, 13 tests, site links, hashes and whitespace checks.
No probe, traffic test, or Azure networking change was executed.
