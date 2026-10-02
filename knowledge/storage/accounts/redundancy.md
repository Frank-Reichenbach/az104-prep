# Storage redundancy and failover planning

Topic ID: storage.accounts.redundancy  
Objectives: st-07  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

Choose redundancy from the failure you must survive and the acceptable
replication delay. Redundancy is not a substitute for protection against
accidental deletion.

| Option | Primary placement | Remote copy | Secondary reads before failover |
| --- | --- | --- | --- |
| LRS | One physical location | No | No |
| ZRS | Availability zones | No | No |
| GRS | Local replication | Asynchronous | No |
| RA-GRS | Local replication | Asynchronous | Yes, supported services |
| GZRS | Availability zones | Asynchronous | No |
| RA-GZRS | Availability zones | Asynchronous | Yes, supported services |

Microsoft recommends GZRS for workloads requiring both zonal resilience and
regional disaster recovery. Check account type, region, and service support:
an option available to Blob Storage is not automatically available to every
Azure Files configuration.
[Redundancy comparison](https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy).

## Configure and validate

With storage-account management permission, open **Data management →
Redundancy**, inspect the current option and available targets, choose the
supported destination, and save. Geo/read-access changes and zonal conversions
have different paths. For example, LRS → ZRS is a conversion; do not assume
every change is an immediate SKU update. Read the migration table for
constraints, completion status, and charges.
[Changing redundancy](https://learn.microsoft.com/en-us/azure/storage/common/redundancy-migration).

Validate the resulting SKU and conversion state, then test normal operations.
For RA-enabled Blob Storage, test a read through the secondary endpoint and
design the client to tolerate stale content or a missing recent blob.
The secondary is not a second writable primary.
[Application behavior](https://learn.microsoft.com/en-us/azure/storage/common/geo-redundant-design).

## Plan failover separately

Define a recovery point objective (acceptable data loss) and recovery time
objective (acceptable outage). Geo-replication is asynchronous: unplanned
failover can lose writes that did not reach the secondary. Inspect Last Sync
Time and service-specific failover support before deciding to proceed.
Planned and unplanned failovers have different guarantees and prerequisites.
[Disaster recovery planning](https://learn.microsoft.com/en-us/azure/storage/common/storage-disaster-recovery-guidance).

After an unplanned account failover, verify endpoint resolution, application
reads/writes, and the resulting redundancy configuration. Reestablish the
desired geo-protection; do not assume the former topology remains intact.
[Unplanned failover operation](https://learn.microsoft.com/en-us/azure/storage/common/storage-failover-customer-managed-unplanned).

Do not trigger production failover to test a study example. Record the chosen
redundancy and expected cost; geo-copy traffic, storage, and conversions can
add charges. Restore exercise settings only through a supported migration
path, and retain soft deletion/versioning as separate recovery controls.

[Question data](../../../questions/storage/storage-accounts-redundancy.json).
