# Blob soft deletion review

Topic: `storage.blobs.soft-delete`; objective: `st-14`.
Verified: 2026-10-03. Source: questions/storage/data-protection.json.
Displayed context is Blob soft deletion; decisions concern configuration,
retention outcomes, and recovery steps within that service.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| st-blob-delete-001 | Revise, revision 2 | Applied duration interpretation | Replace indefinite versioning retention with a related original-duration/restarted-clock misconception. Key `original`. |
| st-blob-delete-002 | Revise, revision 2 | Applied joint configuration | Replace unrelated tier/anonymous choices with real Blob service properties and inactive retention policies. Explicit versioning restriction closes the alternative recovery path. Keys `blob`, `container`. |
| st-blob-delete-003 | Revise, revision 2 | Troubleshooting next recovery step | Replace tier and forced-rollback fiction with actual recovery actions applied to the wrong scope, repeated stage, or destination. Key `copy`. |
| st-blob-delete-004 | Revise, revision 2 | Applied disablement outcome | Replace automatic archiving with an expiry-clock suspension misconception. Key `retain`. |

## Rationale evidence

The [blob overview](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-overview)
supports every option in 001 and 004: the deletion starts the retention clock,
later changes do not retroactively change existing windows, and disabling the
feature leaves existing objects recoverable until original expiry. It also
supports the scope boundary and disabled-versioning assumptions in 002.

For 002, [blob enablement](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-enable)
and [container enablement](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-enable)
document the policy names, enabled flags, and duration properties. The
[container overview](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview)
establishes that container recovery does not recover an individually deleted
blob in an undeleted parent. The blob overview explains the different
versioning mechanism. An inactive policy does not activate protection merely
because it has a configured duration.

For 003, [restoration guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-manage)
and the blob overview document Undelete followed by snapshot promotion/copy.
The overview explicitly permits copying to a new blob, which does not satisfy
the original-current-content requirement. The container overview supports the
wrong-scope Restore Container rationale. These are behavior constraints, not
cost or architecture recommendations.

## Answer-set and acceptance checks

For 002 the two keyed properties are jointly necessary: remove blob protection
and an individually deleted blob is unprotected; remove container protection
and the whole-container deletion is unrecoverable. None of the other five
offered pairs satisfies both scopes and the disabled-versioning constraint.
Normal deletes remain possible. All other questions have one qualifying
answer under the stated namespace, versioning, and retention facts.

There are no variants. The batch covers time/configuration interpretation,
joint enablement, observed recovery behavior, and disablement; no unrelated
company context is added. All existing stable IDs and families are retained.
Build/check, 13 Node tests, static-site links, review hashes, and whitespace
checks validate the checkpoint. Review is author-led; no Azure labs were run.
