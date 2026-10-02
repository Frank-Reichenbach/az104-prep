# Managed disk attachment, expansion, and performance

Topic ID: compute.vms.disks  
Objectives: co-10  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Select the disk

Keep persistent application data on managed data disks rather than a VM's local
temporary disk. Compare Standard HDD, Standard SSD, Premium SSD, Premium SSD v2,
and Ultra Disk against latency, capacity, throughput, and cost requirements.
Premium SSD v2 and Ultra Disk are data-disk options, not OS-disk choices; check
regional, zonal, and VM-size compatibility.
[Disk types](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types).

IOPS and throughput can be limited by either the disk or VM. Caching is a
workload decision: write-heavy paths may require no host caching, while eligible
read-heavy workloads can benefit from read-only caching. Do not assume
ReadWrite caching is safe for every database.
[Performance and caching](https://learn.microsoft.com/en-us/azure/virtual-machines/premium-storage-performance).

## Attach and initialize

With VM and disk write permissions, open **VM → Disks → Create and attach a new
disk**, choose its capacity/SKU and unused LUN, then save. Or:

```sh
az vm disk attach --resource-group rg-study --vm-name vm-study \
  --name data-study --new --size-gb 128 --sku StandardSSD_LRS
```

Inside the guest, identify the new disk by LUN/device information. For a new
empty disk, create the intended partition and filesystem, mount it, and configure
persistent mounting using a stable identifier such as UUID. On Windows,
initialize the disk and create/format a volume in Disk Management. Never format
a disk just because it is newly attached: an existing disk may contain data.
[Linux attachment and guest steps](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/add-disk).

## Expand and verify

Back up first. Check filesystem health and partition-table limits. Increase the
managed disk size in Azure; then grow the guest partition and filesystem using
the OS-specific process. Some data-disk expansions support online operation;
check the documented conditions rather than always assuming downtime is required.
Shrinking an existing managed disk is unsupported.
[Linux expansion](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/expand-disks);
[Windows disk management](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/tutorial-manage-data-disk).

Verify capacity both in Azure and in the mounted guest filesystem, then test
application reads/writes and inspect latency and throttling metrics. If the
guest still reports its old capacity, check rescan, partition, and filesystem
growth before changing the Azure size again.

A disk snapshot captures disk state; it is not automatically an application-
consistent backup of several disks together. Use an appropriate backup process
for coordinated recovery.
[Managed disk snapshots](https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview).

Detach only after stopping relevant writes and unmounting/offlining the volume.
Detached disks and retained snapshots remain billable; inspect delete options
and remove only disposable copies after verification.

[Question data](../../../questions/compute/compute-vms-disks.json).
