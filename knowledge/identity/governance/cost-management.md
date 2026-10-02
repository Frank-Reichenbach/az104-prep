# Budgets, cost alerts, and Advisor

Topic ID: identity.governance.costs  
Objectives: id-14  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

A budget compares actual or forecast cost with a planned amount and triggers
configured notifications. It is not a real-time spending cap and does not
automatically stop Azure resources. Cost data and evaluations can lag usage.
[Budget behavior](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets).

## Set an actionable budget

Use access to the intended cost scope and permission to manage its budgets,
such as Cost Management Contributor at a supported Azure scope.

1. In **Cost Management**, select the intended subscription or resource group.
2. Inspect **Cost analysis** with the required period, currency, and filters.
3. Create a budget with a reset period, start/end dates, and amount based on
   that scope's expected usage.
4. Add actual and/or forecast thresholds, recipients, and supported action
   group integration. Review filters so unrelated workloads do not distort it.
5. Inspect the saved budget and alert configuration. Test notification routing
   through the supported action-group test facility, not by creating charges.
[Budget configuration](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets).

A forecast alert can warn before actual spend reaches the threshold.
Credit alerts and spending-quota alerts have different billing scopes and
eligibility; they are not alternate names for every budget alert.
[Cost alert types](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/cost-mgt-alerts-monitor-usage-spending).

## Use Advisor as a decision input

Open **Advisor → Cost**, inspect the affected resource and its utilization
evidence, then evaluate a recommendation against workload requirements.
Right-sizing or shutting down underused compute can reduce waste; reservations
or savings plans involve commitments and should fit stable usage.
A recommendation is not automatic approval to resize or buy.
[Advisor cost recommendations](https://learn.microsoft.com/en-us/azure/advisor/advisor-cost-recommendations).

After an approved optimization, verify application performance and compare
cost over a representative period. Distinguish realized savings from the
Advisor estimate. For unexpected costs, review scope, time range, tags,
resource IDs, retained disks/snapshots, and continuing commitments.

## Cleanup

Remove exercise budgets or temporary notification routes without disabling
production monitoring. A budget deletion does not delete resources or cancel
billing. This guide creates no paid resources or financial commitments.
Review existing billing agreements before treating a recommendation as a
purchase instruction.

[Question data](../../../questions/identity/identity-governance-costs.json).
