# Editing ARM templates safely review

Topic: `compute.templates.arm-editing`; objective: `co-02`.
Verified: 2026-10-04. Source: questions/compute/compute-templates-arm-editing.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-arm-param | Keep, revision 1 | Foundation parameter constraint | Four relevant properties; key `a`. |
| co-arm-incremental | Revise, revision 2 | Applied complete change comparison | Explicit property/resource preservation requirements and four mode/definition candidates. Key `a`. |
| co-arm-secure | Revise, revision 2 | Applied jointly required repair set | State all existing exposures and distinguish secure input handling from removing source/output leaks. Keys `a`, `b`. |

## Evidence and acceptance

[ARM parameters](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/parameters)
documents allowedValues rejection, defaultValue fallback, descriptive metadata,
length constraints, and secure parameter history behavior. These support all
retained constraint rationales and the secure-input/parameter-name rationales.
Length alone cannot identify the specified two SKU strings.

[Deployment modes](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/deployment-modes)
distinguishes resource omission from properties omitted on redeclared resources.
Its incremental/complete behavior traces each mode/definition candidate.
Complete mode cannot meet the stated preservation requirement; restoring the
non-default property addresses the separate definition problem. The stem makes
no universal assertion about deletion of every child resource type.

[ARM outputs](https://learn.microsoft.com/en-us/azure/azure-resource-manager/templates/outputs)
documents that ordinary outputs are recorded in history and warns against
returning secrets. Combined with secure parameter guidance, it traces both
correct repair rationales and the renamed-output distractor. A literal default
is visible source text regardless of parameter type. The exact pair is necessary:
removing `a` leaves an ordinary recorded input; removing `b` leaves literal
source and output exposures. Neither naming change substitutes for either
repair. `b` groups removal of two existing exposures into one offered change;
it does not claim to solve the whole goal independently.

One complete mode/definition candidate qualifies; the security item explicitly
uses jointly required components. No variants. The displayed title supplies
neither a property/mode choice nor a security repair set. The foundation item
is retained and the two applied items require configuration reasoning. Stable
IDs/families remain. Build/check, 13 tests, site links, hashes, and whitespace
checks validate this author-led checkpoint. No Azure deployment was run.
