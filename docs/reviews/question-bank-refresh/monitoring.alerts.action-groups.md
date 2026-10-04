# Action groups and notification delivery review

Topic: `monitoring.alerts.action-groups`; objective: `mo-04`.
Verified: 2026-10-04. Sources: monitoring-alerts-action-groups.json and
the topic's reviewed-variants.json item.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-action-reuse | Revise, revision 2 | Foundation shared-reference outcome | Actual title supplied original feature answer. Compare which attached rules use an updated shared group. Key `a`. |
| mo-action-test | Revise, revision 2 | Applied verification choice | Replace imaginary scaling/storage effects with tests distinguished by real-rule coverage. Key `b`. |
| mo-action-no-message | Revise, revision 2 | Troubleshooting response-path checks | Replace fabricated recipient rewriting with collection/evaluation checks excluded by supplied Fired evidence. Keys `a`,`c`. |
| mo-action-test-failed-variant | Keep, revision 1 | Applied evidence interpretation | Failed sample provides no definitive real-threshold result; alternatives assert unsupported conclusions. Key `separate`. |

## Evidence and acceptance

[Action groups](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups)
supports reuse across rule types, updates, configured receivers, and sample
testing. [Alert overview](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview)
separates rule evaluation from action invocation. Both support successful
sample versus failed sample family reasoning: neither establishes real-rule
evaluation, and a failed delivery sample does not establish missing telemetry.
The revised main asks for real-condition plus delivery verification; payload
validation, repeated samples, or a CPU chart cover only parts of that goal.

[Processing rules](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules)
supports action-group suppression while retaining alert instances. In the
check-two item, attachment/receiver inspection and suppression inspection are
individually relevant response-path checks, not jointly sufficient repairs.
The correct Fired instance excludes the offered collection/evaluation checks
from the requested response-stage investigation. Exactly two offered checks
qualify; no claim that these exhaust all possible email-delivery failures.

Verified recipient wording avoids unconditional enforcement timing for newer
email OTP requirements. No notification is sent during this review. The
actual topic title does not choose affected rules, verification coverage,
checks, or inference. Stable IDs/families remain. Author-led source review
is separate from build/check, 13 tests, site links, hashes and whitespace checks.
