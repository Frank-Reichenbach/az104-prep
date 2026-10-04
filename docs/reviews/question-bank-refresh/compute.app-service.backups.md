# App Service backup configuration and restoration review

Topic: `compute.app-service.backups`; objective: `co-22`.
Verified: 2026-10-04. Source: questions/compute/compute-app-service-backups.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-web-backup-external | Revise, revision 2 | Applied protection scope | Compare app-only, custom, mount-configuration, and separate-share coverage against data recovery. Key `a`. |
| co-web-backup-restore | Revise, revision 2 | Applied constrained recovery test | Define serving-production constraint, supported slot, and isolated dependencies; remove artifact editing distractor. Key `a`. |
| co-web-backup-database | Keep, revision 1 | Applied current database protection | New October 2026 setup uses native SQL protection rather than removed new linked configuration, automatic app backup, or slot swap. Key `a`. |

## Evidence and acceptance

[Backup scope and restore](https://learn.microsoft.com/en-us/azure/app-service/manage-backup)
documents exclusion of custom-mounted Azure storage, custom backups sharing
that coverage, stopped restore targets, and restoration to another app/slot.
These establish the external-data key and reject app-only/custom/mount-only
recovery. Functional testing is an authoring inference about the stated
proof-of-working goal; metadata and file count do not demonstrate it. The
separate slot keeps the production target out of the restore operation.

The same page recommends native database protection and dates removal of
new linked SQL configurations to April 2026, while existing configurations
continue until March 2028. The retained item explicitly asks about a new
October 2026 setup; it does not claim all existing linked SQL backups stopped.
Its automatic-backup exclusion rejects the automatic-app choice, and a slot
swap changes app deployment rather than creating a database recovery point.
Those sections trace every retained rationale.

The page still presents generic linked-database creation instructions alongside
the dated removal schedule. The new-setup key follows the explicit deprecation
section; the older generic steps are not imported into the scored setup.
The 2028 date is a documented schedule, not a verified future outcome.

One complete protection/test approach qualifies per item; no joint sets or
variants. The title does not determine external coverage, target selection,
or new versus existing SQL configuration. Stable IDs/families remain.
Author-led source review is separate from build/check, 13 tests, site links,
hashes, and whitespace validation. No backup, restore, or slot operation ran.
