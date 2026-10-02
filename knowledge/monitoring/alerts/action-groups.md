# Action groups and notification delivery

Topic ID: monitoring.alerts.action-groups

Objectives: mo-04

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Reusable responses

An action group defines notification recipients and automated actions. Multiple
alert rules can reuse it. It does not define the signal threshold or collect
telemetry. Supported actions include email and integrations such as webhooks,
Logic Apps, Functions, or automation.
[Action group model](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups).

## Implement and test

With appropriate action-group write/test permissions, open **Monitor → Alerts
→ Action groups → Create**. Choose name, short display name, enabled state,
notifications, and actions. Validate recipients and downstream endpoint
authentication. Save before running the portal's test with a sample alert type.
Recipient confirmation/validation and delivery throttles can affect notifications.
[Create/test procedure](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/action-groups).

Attach the group to the alert rule or an applicable processing rule. Use a
common alert schema where the receiver supports it, then validate the
receiver's payload parsing. A group test checks the selected response path;
it does not establish that the real resource condition will trigger the rule.
[Alert components](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-overview).

## Verify and troubleshoot

Inspect the alert instance, rule's action groups, enabled state, recipient
validation, service limits, and downstream delivery result. If an alert fired
without a notification, inspect processing-rule suppression as well. Test with
controlled recipients to avoid unnecessary messages during a lab.
[Action handling](https://learn.microsoft.com/en-us/azure/azure-monitor/alerts/alerts-processing-rules).

Example: reuse one operations group for CPU and log alerts, then verify each
receiver can interpret their payload. Automated actions may incur downstream
service costs or change resources; define those actions intentionally.
Remove unused test recipients/groups after detaching their rules.
See [alert evaluation](rules.md).

[Question data](../../../questions/monitoring/monitoring-alerts-action-groups.json).
