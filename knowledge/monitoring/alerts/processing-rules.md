# Alert processing rules and maintenance suppression

Topic ID: monitoring.alerts.processing

Objectives: mo-04

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Process fired alerts

An alert processing rule adds or suppresses action groups on matching fired
alerts. It does not replace the condition-evaluating alert rule. Scheduled
suppression can leave incident evidence visible while stopping notifications.
Processing rules do not affect Azure Service Health alerts.
[Rule behavior](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules).

## Implement

With authorized Microsoft.AlertsManagement/actionRules operations, open
**Monitor → Alerts → Alert processing rules → Create**. Select resource,
resource-group, or subscription scope within the rule's subscription. Apply
filters, choose add-action-groups or suppression, and configure schedule/time
zone. Verify the rule is enabled.
[Creation procedure](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules).

Example: suppress a study VM's notifications during a maintenance window
without disabling alert evaluation for other machines. Use the narrow intended
scope; a broad subscription scope may suppress unrelated alerts.
For supported platform-fired alerts such as Azure Backup, processing rules can
attach action groups even where the source does not offer direct attachment.
[Action integration](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups).

## Verify and troubleshoot

Confirm a matching alert fires during the scheduled window and inspect action
suppression. Test outside the window too. Check filters, schedule time zone,
scope, and all matching processing rules when behavior is unexpected.
If suppression and action-group addition both match, suppression takes priority.
[Multiple-rule handling](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules).

Do not treat suppression as resolution or acknowledgement. Remove expired
one-time rules and check recurring windows periodically. Downstream actions
and notifications can still have their own costs and limits.
See [alert rules](rules.md) and [action groups](action-groups.md).

[Question data](../../../questions/monitoring/monitoring-alerts-processing.json).
