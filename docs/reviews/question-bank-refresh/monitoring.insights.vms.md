# VM Insights and enhanced guest monitoring review

Topic: `monitoring.insights.vms`; objective: `mo-05`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-insights-vms.json.

| ID | Decision | Pattern / difficulty | Defect and key |
| --- | --- | --- | --- |
| mo-vm-guest | Revise, revision 2 | Applied collection configuration | Replace DNS/zero/deletion padding with complete source/destination paths; fix classic experience. Key `a`. |
| mo-vm-map | Revise, revision 2 | Applied deployment guidance | Compare plans distinguished by supported AMA performance collection and omitted deprecated feature. Key `b`. |
| mo-vm-destination | Revise, revision 2 | Foundation destination distinction | Compare plausible telemetry destinations; explicitly separate OpenTelemetry from classic. Key `c`. |

## Evidence and acceptance

[VM monitoring](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/monitor-vm),
[Enablement](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/vm-enable-monitoring),
and [Portal workflow](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/tutorial-enable-monitoring)
support host/guest distinction, AMA plus appropriate DCR association, and
Log Analytics classic versus Azure Monitor workspace OpenTelemetry destinations.
These exclude event-only/Syslog-only/platform-export alternatives from guest
memory collection and distinguish each destination candidate.

[Map notice](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/vminsights-maps)
explicitly deprecates Map/Dependency Agent, advises against new deployments,
and states legacy Log Analytics agent support has ended. Retirement is June
30, 2028; a future retirement date is not permission to recommend new Map
onboarding. Existing-map data and new-performance onboarding are separate.
The newer OpenTelemetry workflow is labeled supporting service detail in the
knowledge file; it is not asserted to be an additional April 2026 objective.

Every offered complete plan/destination is evaluated, with exactly one key
per item; no joint sets or variants. Actual Insights/enhanced-monitoring title
does not select collection sources, deprecated-feature plan, or workspace
type. Stable IDs/families remain. Author-led source review is distinct from
build/check, 13 tests, site links, hashes and whitespace validation. No
monitoring configuration, agent installation or Azure lab executed.
