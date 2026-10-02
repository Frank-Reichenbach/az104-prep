# Resizing virtual machines

Topic ID: compute.vms.resizing  
Objectives: co-09  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Decide from measurements

Use CPU, memory, disk throughput/IOPS, and network measurements to identify the
constraint. A larger VM does not fix an undersized disk by itself: both VM and
disk limits apply. Check image architecture, storage support, security type,
disk/NIC count, regional availability, and vCPU quotas for the target SKU.

A resize of a running VM restarts it. Some changes also require deallocation
because the current hardware cluster cannot supply the target size. If that
happens for a VM in an availability set, all VMs in the set may need deallocation.
Plan the service outage before making this change.
[Resize behavior](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/resize-vm).

## Implementation

With VM write and power-operation permissions, inspect candidates:

```sh
az vm list-vm-resize-options --resource-group rg-study --name vm-study --output table
```

In the portal use **VM → Availability + scale → Size**. For a planned,
compatible change using CLI:

```sh
az vm deallocate --resource-group rg-study --name vm-study
az vm resize --resource-group rg-study --name vm-study --size Standard_D4s_v5
az vm start --resource-group rg-study --name vm-study
az vm get-instance-view --resource-group rg-study --name vm-study
```

Deallocation does not guarantee capacity will be available when restarting.
Preserve durable data on managed disks and have a recovery plan.

## Verify and troubleshoot

Check the resize operation result, instance state, guest CPU/memory, and
application health. Current documentation warns that after a failed resize,
the VM model can display the requested size even while the VM still runs on
its previous allocation. Do not treat the configured size alone as proof of success.
[Resize verification](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/resize-vm).

Temporary-disk data can be lost during deallocation or host movement. Resizing
between sizes with and without temporary disks has OS-specific restrictions;
Windows needs a supported migration process. Check SCSI/NVMe compatibility
rather than assuming any listed SKU is a direct replacement.
[No-temporary-disk guidance](https://learn.microsoft.com/en-us/azure/virtual-machines/azure-vms-no-temp-disk).

Compare the new compute cost and performance after the change. Downsize only
after validating headroom. Remove any disposable migration disks or snapshots
after the retention decision. See [VM creation and billing](creation.md).

[Question data](../../../questions/compute/compute-vms-resizing.json).
