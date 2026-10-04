# Exporting templates and decompiling Bicep review

Topic: `compute.templates.export`; objective: `co-05`.
Verified: 2026-10-04. Source: questions/compute/compute-templates-export.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-export-current | Keep, revision 1 | Applied drift/export choice | Manual change selects current-state export rather than original artifacts. Key `a`. |
| co-export-convert | Keep, revision 1 | Foundation conversion command | Distinct conversion/build/deploy/preview operations. Key `a`. |
| co-export-review | Revise, revision 2 | Applied jointly required repairs | Replace generic checks versus assumptions with two concrete export defects and edits. Keys `a`, `b`. |

## Evidence and acceptance

[CLI export](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/export-template-cli)
distinguishes current-state export from historical templates and documents
missing password parameters plus hard-coded properties needing adaptation.
It supports current versus original template/input rationales and both concrete
reuse defects. Recompiling original source cannot discover subsequent changes;
that follows the compilation operation documented by
[Bicep CLI](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/bicep-cli).
[Decompilation](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/decompile)
documents ARM JSON conversion and possible manual repairs. Alongside CLI build,
[deployment](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-cli),
and [what-if](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/deploy-what-if),
it traces all conversion-command rationales. The displayed decompiling label
orients the command question without supplying its syntax.

[ARM parameters](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/parameters)
documents secure handling and referencing supplied values. An unused subnet
parameter cannot replace a literal property; this is a configuration inference.
Deployment naming is separate from resource properties. These trace all four
repair rationales. The pair `a`, `b` is sufficient under the stated other-correct
configuration: remove `a` and password input remains missing; remove `b` and the
old subnet remains referenced. `c` and `d` cannot replace either required edit.
No claim that either edit alone solves both problems. No variants.

Two sound items are retained, including their keys and revisions. The revised
item states a joint set and concrete environment constraints. Topic context
does not reveal the export source or repair set. Stable IDs/families remain.
Build/check, 13 tests, site links, hashes, and whitespace validate this
author-led review; no export, deployment, or Azure changes were executed.
