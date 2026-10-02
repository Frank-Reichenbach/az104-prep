# Storage Insights performance and capacity

Topic ID: monitoring.insights.storage

Objectives: mo-05

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Examine service behavior

Storage Insights combines capacity, availability, transaction, error, and
latency views. Open storage account **Monitoring → Insights**, or the broader
Azure Monitor storage view. Choose accounts and time range, then drill into a
specific service/API/response type. Reading metrics requires corresponding
resource monitoring permissions.
[Storage Insights](https://learn.microsoft.com/en-us/azure/storage/common/storage-insights-overview).

## Implement and verify

Platform metrics are available without a guest agent. For per-request analysis,
configure the storage subservice's diagnostic categories and Log Analytics
destination; inspect the matching resource-specific table. The account and its
blob service have different metric namespaces.
[Blob monitoring](https://learn.microsoft.com/en-us/azure/storage/blobs/monitor-blob-storage).

Example: investigate rising end-to-end latency alongside server latency and
transaction errors. Split by API/response type to avoid mixing unrelated
operations. A large difference between latency measures is a clue for further
network/client investigation, not proof of one root cause.
[Performance workbook](https://learn.microsoft.com/en-us/azure/storage/common/storage-insights-overview).

## Limits and troubleshooting

A workbook color threshold is a visual setting; changing it does not change
service behavior or create an alert rule. Save customizations as a separate
workbook and verify its selected scope/time range.
[Customization](https://learn.microsoft.com/en-us/azure/storage/common/storage-insights-overview).

If details are absent, check the chosen namespace, dimensions, collection,
workspace, and generated requests. Blob resource logs cannot archive into the
same monitored storage account because recursive logging would result. Set
retention at the destination; a storage lifecycle policy can expire archived
logs.
[Destination limits](https://learn.microsoft.com/en-us/azure/storage/blobs/monitor-blob-storage).

Review workbook-sharing permissions and ingestion costs. Remove temporary
diagnostics/exports after use. See [diagnostic settings](../logs/diagnostic-settings.md).

[Question data](../../../questions/monitoring/monitoring-insights-storage.json).
