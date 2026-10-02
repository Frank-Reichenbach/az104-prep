# Availability sets and availability zones

Topic ID: compute.vms.availability  
Objectives: co-11  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Choose the failure boundary

An availability set separates a group of VMs across fault domains and update
domains. Fault domains represent shared infrastructure failures; update domains
group VMs for planned maintenance. It does not replicate application data or
protect against application bugs.
[Availability sets](https://learn.microsoft.com/en-us/azure/virtual-machines/availability-set-overview).

Availability zones provide separation between datacenter infrastructure within
a region. A zonal VM occupies one chosen zone; it is not automatically copied
to every zone. Deploy multiple application instances across zones and make their
dependencies resilient to survive losing a zone. Microsoft recommends using
zones where supported for stronger infrastructure isolation.
[VM reliability](https://learn.microsoft.com/en-us/azure/reliability/reliability-virtual-machines).

## Implementation

For an availability set, create the set before its VMs, choose supported fault
and update domain counts, and select it during VM creation. Managed-disk fault
domain support varies by region; do not assume every region supports three.
For zonal placement, select a supported region/SKU and zone during VM creation,
then deploy peer instances in other zones. Check that disks and networking
support the design.

Use VM/availability-set write permissions and the necessary disk/network
permissions. Put a load balancer or another appropriate frontend before healthy
replicas, and configure application data replication separately. A single healthy
VM cannot serve traffic if its only required database or network dependency fails.
[Availability options](https://learn.microsoft.com/en-us/azure/virtual-machines/availability).

## Verify and troubleshoot

Inspect each VM's zone or availability-set membership and fault/update domain.
Check backend health, simulate application-instance failure in an authorized
test, and confirm remaining instances can serve traffic. A successful deployment
does not establish application failover behavior.

Up to 20 update domains are supported in an availability set. Planned maintenance
processes one update domain at a time, but the order need not be numerical.
Multiple VMs can share a domain; adding a VM does not create unlimited isolation.
[Domain behavior](https://learn.microsoft.com/en-us/azure/virtual-machines/availability-set-overview).

Availability sets and zones are local-region availability measures, not regional
disaster recovery. Backups and regional recovery remain separate requirements.
Extra instances, replicated data, and network traffic can increase costs.
Remove redundant lab instances only after considering the required failure
tolerance; see [VM moves](moves.md) before changing placement.

[Question data](../../../questions/compute/compute-vms-availability.json).
