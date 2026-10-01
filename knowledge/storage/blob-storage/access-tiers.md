# Blob access tiers

- Topic ID: `storage.blobs.access-tiers`
- Objective: `st-13`
- Verified: 2026-10-01
- Status: documented; commands not executed in Azure

## Choose by access pattern

For standard general-purpose v2 block blobs, compare retrieval urgency,
expected access frequency, and retention duration:

| Tier | Access behavior | Minimum billed duration relevant to early deletion |
| --- | --- | --- |
| Hot | Online; frequent use | No tier minimum |
| Cool | Online; infrequent use | 30 days |
| Cold | Online; rare use | 90 days |
| Archive | Offline; retrieval can take hours | 180 days |

These periods are billing considerations, not locks that prevent early
deletion. Cool and cold retain immediate access; archive requires rehydration.
The table is scoped to general-purpose v2, not every legacy account type.
[Tier behavior and billing](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview)

## Microsoft recommendations

Choose using expected total storage and access costs. A cooler tier's lower
capacity price can be outweighed by retrieval charges. Estimate read patterns;
upload directly into the suitable tier when the workload is known. Periodically
review actual usage before introducing automated transitions.
[Tier-selection recommendations](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-best-practices)

For example, if the only choices are cool and archive and a report must open
immediately, choose cool. This is a scenario decision, not a claim that cool is
always cheapest for every infrequently accessed dataset.

## Implementation

Use an existing standard general-purpose v2 account, an existing block blob,
and Entra data permissions such as Storage Blob Data Contributor. In the
Portal, open the blob and change its tier. In CLI:

```sh
az storage blob set-tier \
  --account-name <existing-account> \
  --container-name study-records \
  --name report.csv \
  --tier Cool \
  --auth-mode login

az storage blob show \
  --account-name <existing-account> \
  --container-name study-records \
  --name report.csv \
  --auth-mode login
```

Replace placeholders first. Inspect the returned access tier and whether it is
inferred from the account default. A blob with an explicit tier does not simply
follow a later account default change. [Set and inspect tiers](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-online-manage)

## Constraints and recovery

Archive is not an account default tier. Its redundancy support excludes ZRS,
GZRS, and RA-GZRS. A storage account using premium block blobs cannot tier that
data through the standard hot/cool/cold/archive workflow.
[Account and redundancy constraints](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview)

If an archived blob must be read, use a separate rehydration operation.
Lifecycle policies cannot rehydrate it. Inspect the operation's status before
assuming the bytes are available. [Lifecycle limitations](https://learn.microsoft.com/en-us/azure/storage/blobs/lifecycle-management-overview#known-issues-and-limitations)

For a failed tier change, check the blob type, account type, redundancy, and
data permissions before changing unrelated settings. Account networking can
also prevent the CLI from reaching the data endpoint.

## Costs and cleanup

Changing tiers can incur operations, retrieval, and early-deletion charges.
Do not switch between tiers repeatedly as a no-cost experiment. For a study
exercise, use a small disposable blob and understand the minimum-duration
charge before deleting it.
[Billing behavior](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-overview#pricing-and-billing)

Current documentation also describes smart tier. Treat that as supplementary
research for now; the initial questions target explicit tier selection and
lifecycle behavior. [Current tier guidance](https://learn.microsoft.com/en-us/azure/storage/blobs/access-tiers-best-practices)

## Exam distinctions

- Offline archive versus immediately readable cool/cold data.
- Minimum billed duration versus enforced retention.
- Account default versus explicit blob tier.
- Individual tier changes versus [lifecycle rules](lifecycle-management.md).

Practice: [source questions](../../../questions/storage/blob-storage.json).
