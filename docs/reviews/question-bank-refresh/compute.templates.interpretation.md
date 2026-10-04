# Reading ARM templates and Bicep review

Topic: `compute.templates.interpretation`; objective: `co-01`.
Verified: 2026-10-04. Source: questions/compute/compute-templates-interpretation.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-read-input-output | Keep, revision 1 | Foundation section distinction | Four relevant template elements; key `parameters`. |
| co-read-symbolic-name | Revise, revision 2 | Applied parameter/name interpretation | Add default, supplied value, symbolic name, and output label; compare resulting names. Key `property`. |
| co-read-dependency | Revise, revision 2 | Applied dependency interpretation | State three new resources and references; compare complete ordering candidates. Key `implicit`. |

## Evidence and acceptance

[ARM structure](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/syntax)
defines deployment inputs, internal variables, returned outputs, and the
contentVersion author marker. It traces all four retained option rationales.
The foundation wording and distractors remain sound without revision.

[Bicep file syntax](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/file)
defines parameter defaults and supplied inputs, symbolic references, resource
properties, and output declarations. Those distinctions trace each name
rationale: supplied vnet-prod controls name; network and deployedName are
identifiers; vnet-test is the unused default. This requires resolving supplied
configuration rather than identifying the name property from the stem.

[Bicep dependencies](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/resource-dependencies)
documents implicit property references and parallel deployment of independent
resources. This traces all ordering rationales: zone precedes app; neither
reverse ordering nor absent dependency is valid; unrelated store is not forced
after app. These are illustrative relationships, not an executable complete
template or a guarantee of simultaneous start times.

One individual section/value or complete ordering candidate qualifies per item.
No jointly required sets or variants. The shared displayed title identifies
the language/topic without supplying the section, resolved name, or dependency
graph. One foundation distinction and two applied configurations improve batch
variety. IDs/families remain stable. Author-led source review is separate from
build/check, 13 tests, site links, hash, and whitespace validation. No Azure
deployment or cloud validation was performed.
