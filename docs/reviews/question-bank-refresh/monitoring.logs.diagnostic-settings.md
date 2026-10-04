# Resource logs and diagnostic settings review

Topic: `monitoring.logs.diagnostic-settings`; objective: `mo-02`.
Verified: 2026-10-04. Source: monitoring-logs-diagnostic-settings.json.

| ID | Decision | Pattern / difficulty | Defect and key |
| --- | --- | --- | --- |
| mo-log-default | Revise, revision 2 | Foundation source/destination configuration | Replace cosmetic/tag/DNS padding; actual title no longer answers a feature-selection question. Key `a`. |
| mo-log-two-workspaces | Revise, revision 2 | Applied complete export design | Replace NSG and comma-ID padding with destination replacement and wrong-source designs. Key `b`. |
| mo-log-guest | Revise, revision 2 | Applied guest/platform collection boundary | Replace yes/no padding with four collection paths and agent/connectivity prerequisites. Key `c`. |

## Evidence and acceptance

[Diagnostic settings](https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/diagnostic-settings)
supports categories, existing destinations, one destination per type, and
multiple settings (two fits the five-setting limit). It traces wrong category,
workspace, replacement, and metrics-only alternatives. [Resource logs](https://learn.microsoft.com/en-us/azure/azure-monitor/logs/resource-logs)
distinguishes resource operations from management-event Activity Log data.

[Syslog collection](https://learn.microsoft.com/en-us/azure/azure-monitor/vm/data-collection-syslog)
supports agent/DCR facility and level selection and the workspace destination.
Local daemon output is not workspace delivery. Neither platform metrics nor
Activity Log export configures guest Syslog. Future events exclude a claim
that creating a setting retrieves past uncollected logs. These questions do
not imply instantaneous ingestion or pre-existing destination tables.

One complete configuration meets each goal; no joint sets or variants.
Actual resource-log/diagnostic title does not select the category/destination,
two-workspace design, or guest path. Stable IDs/families remain. Author-led
technical review is distinct from build/check, 13 tests, site links, hash and
whitespace checks. No diagnostic export, agent, or Azure lab was executed.
