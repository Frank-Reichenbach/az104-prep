# Blob versioning review

Topic: `storage.blobs.versioning`; objective: `st-17`.
Verified: 2026-10-03. Source: questions/storage/data-protection.json.
The Blob versioning label does not choose a support configuration, operation
outcome, recovery sequence, or cleanup policy.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| st-version-001 | Keep, revision 1 | Applied operation outcome | Current-to-previous versus all-version deletion, automatic promotion, and deletion prohibition are related and uniquely distinguish the Delete request without a version ID. Key `previous`. |
| st-version-002 | Revise, revision 2 | Troubleshooting support prerequisite | Add an observed enablement failure and stated satisfied prerequisites. Compare real namespace, API, account-type, and feature-coexistence explanations instead of tier/Reader workarounds. Key `unsupported`. |
| st-version-003 | Revise, revision 2 | Troubleshooting joint recovery steps | Add missing-current read evidence and original-name requirement. Compare real copy destinations and parent recovery instead of automatic promotion fiction. Keys `undelete`, `copy`. |
| st-version-004 | Keep, revision 1 | Applied retention design | Version-specific cleanup versus automatic quota cleanup, current-only tiering, and disablement purge are related lifecycle misconceptions. Key `lifecycle`. |

## Rationale evidence

The [versioning overview](https://learn.microsoft.com/en-us/azure/storage/blobs/versioning-overview)
supports every rationale in 001 through its Delete Blob behavior. Its supported
account types, namespace exclusion, API minimum, and recommendation to combine
versioning with soft delete support all alternatives in 002. These are
support constraints, not a preference for one account naming scheme.

For 003, the overview and
[version-aware restore guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-blob-manage)
document Undelete restoring retained versions without promoting one, followed
by copy to the base blob. Copy to a separate name changes the destination,
not the current version at the original name. The
[container overview](https://learn.microsoft.com/en-us/azure/storage/blobs/soft-delete-container-overview)
supports why restoring an undeleted parent is not the required version step.

For 004 the versioning overview explicitly distinguishes the recommendation
to stay below 1,000 versions from an enforced deletion limit, recommends
lifecycle cleanup, and states that disabling versioning preserves existing
versions. A current-only tier action does not delete previous versions;
[lifecycle policy structure](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-policy-structure)
was checked earlier on October 3 for separate current/previous-version actions.

## Answer-set and acceptance review

For 003 the sequence is necessary: removing Undelete leaves the requested
source soft-deleted; removing copy leaves no current blob. A different copy
destination does not satisfy the original-name requirement, and parent
restoration does not recover the versions. None of the other five pairs can
meet the complete goal. Each other item has exactly one qualifying choice.

No family variants exist. The batch combines operation interpretation,
support diagnosis, recovery sequencing, and retention management. IDs, option
IDs, families, and objectives remain stable. Build/check, 13 Node tests,
static-site links, review hashes, and whitespace checks validate the checkpoint.
Review is author-led documentation review; no Azure labs were executed.
