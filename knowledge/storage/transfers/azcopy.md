# AzCopy transfers and synchronization

Topic ID: storage.transfers.azcopy  
Objectives: st-10  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

AzCopy v10 moves data to, from, and between supported Azure Storage endpoints.
Use Entra authorization where supported; a SAS is another option with
permissions on the required source and destination. Management Contributor
alone is not an Entra Blob data role.
[AzCopy introduction](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10).

## Copy a directory into Blob Storage

Install AzCopy, provide an existing destination container, allow the client's
network path, and assign the identity Storage Blob Data Contributor at the
necessary destination scope. A source download normally needs Blob Data Reader.
For an interactive Blob upload:

```sh
azcopy login --tenant-id '<tenant-id>'
azcopy copy './exercise-data' \
  'https://<account>.blob.core.windows.net/<container>' --recursive=true
azcopy jobs list
azcopy jobs show '<job-id>'
```

Check whether the desired result includes the source directory itself or only
its contents before transferring a large tree. Verify names, byte counts, and
a downloaded sample rather than just the process starting.
[Upload examples](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-blobs-upload).

## Choose copy or sync deliberately

Sync is one-way: source changes drive destination state. By default it compares
names and modification times; clock accuracy matters. Hash comparison is
available for supported cases. Destination-only objects are deleted only when
the deletion option requests it. Before enabling deletion, protect data with
soft deletion and preview the affected namespace.

Microsoft suggests copy with `--overwrite=ifSourceNewer` when deletion is
unneeded, avoiding sync's extra indexing work.
[Sync behavior and recommendations](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-blobs-synchronize).

## Recover a failed transfer

Inspect job status and failed transfers, fix permission, expiry, or network
errors, then resume the existing job. Job plans identify outstanding work;
they do not automatically include files added after the original enumeration.
SAS tokens are not retained in the plan, so SAS-based resumes need fresh valid
credentials. Do not expose them in shared logs or command transcripts.
[Logs and resuming jobs](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-configure).

Azure Files transfer authentication and supported copy/sync endpoint pairs
differ from Blob scenarios. In particular, copy support between services does
not prove sync supports that same pair.
[Files transfers](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-files).

Account for request, retrieval, and egress charges; synchronization scans can
also cost money. After the exercise, remove only its destination objects and
temporary roles, sign out with `azcopy logout`, and retain redacted diagnostic
information if needed.

[Question data](../../../questions/storage/storage-transfers-azcopy.json).
