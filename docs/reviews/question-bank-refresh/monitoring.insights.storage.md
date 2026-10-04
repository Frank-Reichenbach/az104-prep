# Storage Insights performance and capacity review

Topic: `monitoring.insights.storage`; objective: `mo-05`. Verified: 2026-10-04.
Source: questions/monitoring/monitoring-insights-storage.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| mo-storage-color | Keep, revision 1 | Foundation display/service boundary | Workbook formatting changes visual classification, not SLA, alert-rule creation, or redundancy. Key `a`. |
| mo-storage-log-target | Revise, revision 2 | Applied destination configuration | Replace padded yes/no with four accounts differing by self-target, tier, or region. Key `b`. |
| mo-storage-no-agent | Revise, revision 2 | Foundation telemetry-source distinction | Replace padded yes/no with distinct platform, guest-counter, Syslog and log-parsing paths. Key `c`. |

## Evidence and acceptance

[Storage Insights](https://learn.microsoft.com/en-us/azure/storage/common/storage-insights-overview)
supports default platform metric collection and copied-workbook thresholds.
Every retained visual-setting rationale follows that presentation boundary;
changing a workbook does not change resource configuration or create an
alert. [Blob monitoring](https://learn.microsoft.com/en-us/azure/storage/blobs/monitor-blob-storage)
separates platform metrics from resource-log export and explains recursive
logging. [Diagnostic destinations](https://learn.microsoft.com/en-us/azure/azure-monitor/data-collection/diagnostic-settings)
supports same-region Standard destinations, Premium exclusion and self-target
restriction. The full correct account satisfies all three conditions.

Client guest counters and Syslog are different telemetry sources, and archived
operation-log parsing is not a prerequisite for built-in platform views.
No claim that every guest/operation detail is collected automatically is made.
Exactly one full alternative meets each question; no joint sets or variants.
Actual Storage Insights/performance/capacity title does not select a display
effect, destination account, or collection path. Stable IDs/families remain.
Author-led source review is separate from build/check, 13 tests, site links,
hashes and whitespace validation. No diagnostic export or Azure lab ran.
