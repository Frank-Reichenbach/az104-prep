# Alert processing rules and maintenance suppression review

Topic: `monitoring.alerts.processing`; objective: `mo-04`. Verified: 2026-10-04.
Sources: monitoring-alerts-processing.json and relevant reviewed-variants.json item.

| ID | Decision | Pattern / difficulty | Defect and key |
| --- | --- | --- | --- |
| mo-processing-maintenance | Revise, revision 2 | Applied scope/action/schedule configuration | Topic label supplied feature answer; compare complete configurations preserving another VM. Key `a`. |
| mo-processing-scope | Revise, revision 2 | Foundation supported target scope | Replace yes/no padding with four plausible scope candidates. Key `b`. |
| mo-processing-service-health | Revise, revision 2 | Applied two-source outcome mapping | Replace padded yes/no with VM versus Service Health handling under an effective rule. Key `c`. |
| mo-processing-weekly-variant | Revise, revision 2 | Applied recurring schedule | Replace disabling/deleting/collection padding with four schedules. Friday recurrence versus main one-time window is decisive. Key `suppress`. |

## Evidence and acceptance

[Processing rules](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules)
supports suppression versus group addition, resource/group/subscription scopes
within the same subscription, one-time/recurring scheduling and time zones,
retained Fired instances, and Service Health exclusion. It traces every option:
shared-group scope affects the other VM; adding groups is not suppression;
wrong time/day misses maintenance; one-time fails future recurrence; daily
violates Friday-only scope. Cross-subscription and management-group targets
are outside supported direct scope, while a different storage resource group
does not constrain targets in the same subscription.

For the two-source mapping, matching suppression affects VM metric alerts,
not Service Health; all other offered mappings misapply one or both rules.
Effective configuration is explicit where timing matters; creating a rule
does not imply instant effect (documentation allows propagation delay).
No suppressed notification is assumed to replay at the end of the window.

One complete configuration/mapping meets each goal. Both family variants
retain scheduled suppression while independently testing their one-time versus
recurring requirement. No joint sets. Real topic title does not supply scope,
action, time/day, or source outcome. Stable IDs/families remain. Author-led
source review is separate from build/check, 13 tests, site links, hashes and
whitespace checks. No processing rules, notifications or Azure labs executed.
