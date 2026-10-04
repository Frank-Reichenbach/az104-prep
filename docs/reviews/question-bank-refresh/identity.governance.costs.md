# Budgets, cost alerts, and Advisor review

Topic: `identity.governance.costs`; objective: `id-14`.
Verified: 2026-10-04. Source: questions/identity/identity-governance-costs.json.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| id-budget-not-cap | Revise, revision 2 | Foundation alert/control distinction | Compare notification outcomes instead of subscription deletion and universal stopping. Key `continue`. |
| id-budget-forecast | Revise, revision 2 | Applied numeric threshold interpretation | Supply currency, period, actual/forecast values, and four notification configurations. Key `forecast`. |
| id-advisor-rightsize | Revise, revision 2 | Applied recommendation assessment | Identify a peak absent from the observation window; compare assessment evidence instead of reckless action choices. Key `review`. |

## Evidence and acceptance

[Budget tutorial](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets)
supports notification without resource/billing control and actual versus
forecast evaluation. This traces all alert-outcome and threshold rationales.
Arithmetic is scenario-derived: 110% forecast exceeds 100% but not 120%;
60% actual meets neither offered actual threshold. The question concerns the
condition at evaluation, not an immediate delivery guarantee.

[Advisor right-sizing](https://learn.microsoft.com/en-us/azure/advisor/advisor-cost-recommendations)
describes an observed utilization lookback, CPU/memory analysis, and validating
recommendations against workload needs. The excluded month-end peak is a
scenario fact; the necessity of reviewing it follows from the incomplete
sample. Reusing that sample, budget comparisons, and reservation prices do not
establish capacity for the stated peak. These trace all four assessment
rationales without implying Advisor approves every operational change.

One individual outcome/configuration/assessment qualifies per item. No joint
sets or variants exist. The displayed title does not select a threshold type
and percentage or an evidence assessment. The batch includes a foundation
distinction, numeric configuration, and recommendation reasoning. IDs/families
remain. Build/check, 13 tests, site links, hashes, and whitespace checks validate
this author-led checkpoint. No budgets, compute, or commitments were changed.
