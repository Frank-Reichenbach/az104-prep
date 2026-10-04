# Container Apps environments, ingress, and revisions review

Topic: `compute.containers.apps`; objective: `co-15`.
Verified: 2026-10-04. Source: questions/compute/compute-containers-apps.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-aca-revision | Keep, revision 1 | Foundation change-scope distinction | Four relevant app changes; image template creates revision. Key `a`. |
| co-aca-canary | Revise, revision 2 | Applied complete mode/weight configuration | Replace padded mode selection with four mode/traffic candidates. Key `a`. |
| co-aca-port | Revise, revision 2 | Troubleshooting observed ingress mismatch | Specify healthy/current revision, bound listener and reached frontend; compare settings. Key `a`. |

## Evidence and acceptance

[Revisions](https://learn.microsoft.com/en-us/azure/container-apps/revisions)
documents image template versus application-scoped secrets and ingress changes.
[Managed identity](https://learn.microsoft.com/en-us/azure/container-apps/managed-identity)
documents identity changes without revision creation. These trace all retained
change-scope rationales; updating a secret can require revision restart but does
not itself create one.

[Traffic splitting](https://learn.microsoft.com/en-us/azure/container-apps/traffic-splitting)
and revisions document multiple-active mode and traffic weights. Together they
trace all four canary rationales: the requested two active versions require
Multiple, and new receives 10 with old receiving 90. Reversed or zero weights
fail the numeric requirement. Both revisions' health is an explicit fact.

[Ingress configuration](https://learn.microsoft.com/en-us/azure/container-apps/ingress-how-to)
documents targetPort and allowInsecure. It traces target-port correction and
the distinction between client HTTP allowance and container forwarding.
[Scaling](https://learn.microsoft.com/en-us/azure/container-apps/scale-app)
defines replica counts, which do not replace ingress port selection. Traffic
splitting supports the already-100% distractor; that change cannot fix targetPort.
The failing request plus healthy listener/configuration evidence makes this
troubleshooting, and binding to all interfaces eliminates loopback-only ambiguity.

One complete configuration or individual change qualifies per item. No joint
sets or variants. The shared title orients revision/ingress work without
selecting an exact change, mode/weight combination, or repair setting. Stable
IDs/families remain. Build/check, 13 tests, site links, hashes, and whitespace
validation are separate from this author-led technical review. No Container
App, revision rollout, or ingress change was executed in Azure.
