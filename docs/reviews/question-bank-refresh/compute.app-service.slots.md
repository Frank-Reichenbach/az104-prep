# App Service deployment slots and swaps review

Topic: `compute.app-service.slots`; objective: `co-24`.
Verified: 2026-10-04. Source: questions/compute/compute-app-service-slots.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-slot-sticky | Revise, revision 2 | Applied two-setting mapping | Define environment-specific connection versus release-specific ordinary setting; compare all flag combinations. Key `a`. |
| co-slot-identity | Keep, revision 1 | Foundation swap scope | Identity stays; content/framework follow the release; not every ordinary unmarked setting stays. Key `a`. |
| co-slot-rollback | Revise, revision 2 | Applied code/database state mapping | Replace exaggerated automatic-recovery distractors with four complete version/schema states. Key `a`. |

## Evidence and acceptance

[Slot swap behavior](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots)
documents sticky app settings/connection strings, swappable framework/content,
unswapped identities, and swap-back recovery of the previous release. Its
exceptions are explicitly excluded for the two custom settings in the mapping
item. All four flag configurations are checked against both requirements;
only the keyed combination preserves the connection and moves the label.
Retained identity rationales follow the documented swap table, including the
qualification about ordinary-setting exceptions.

The rollback item applies that documented app swap scope to a separately
mutated database: no database recovery operation or application migration is
part of the stated swap-back. Thus the earlier code returns while the new
external schema remains. This is an explicit administrative inference, not
a promise that every version 1 app works against schema 2. The three other
complete states fail the code outcome, schema outcome, or both.

One complete mapping/assertion qualifies per item; no joint sets or variants.
The displayed title identifies the workflow without answering either mapping
or the identity/content distinction. Stable IDs/families remain. Author-led
source review is separate from build/check, 13 tests, site links, hashes, and
whitespace validation. No swap or database operation was executed in Azure.
