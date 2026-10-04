# Managed disk attachment, expansion, and performance review

Topic: `compute.vms.disks`; objective: `co-10`.
Verified: 2026-10-04. Source: questions/compute/compute-vms-disks.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-disk-expand | Revise, revision 2 | Troubleshooting capacity layers | Supply detected block capacity and partition/filesystem evidence; compare remaining actions. Key `a`. |
| co-disk-os | Keep, revision 1 | Foundation disk-type suitability | Four relevant disk types; keys `a`, `b`. |
| co-disk-existing | Revise, revision 2 | Applied preservation/identification task | Specify LUN and unknown device layout; compare mounting preparation choices. Key `a`. |

## Evidence and acceptance

[Linux expansion](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/expand-disks)
separates Azure capacity, guest recognition, partition, and filesystem growth.
The stated 256 GiB block device isolates the remaining layers. This traces
growth, repeat Azure expansion, and repeat rescan rationales.
[VM resize](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/resize-vm)
concerns compute size, not extending the guest filesystem, tracing that option.
The observed mismatch makes this troubleshooting; OS-specific commands remain
outside the scored item because the filesystem/partition scheme is unspecified.

[Disk types](https://learn.microsoft.com/en-us/azure/virtual-machines/disks-types)
documents Ultra and Premium SSD v2 data-only constraints, with Premium SSD and
Standard SSD suitable for supported OS-disk configurations. It traces all four
retained rationales. Each key is an independently unsuitable disk type, not a
joint solution set. The title does not reveal the exact excluded disk types.

[Linux attachment](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/add-disk)
documents LUN/device identification, filesystem inspection, and new-disk
formatting. These trace safe identification, destructive initialization, and
unverified device-name rationales.
[Managed disks](https://learn.microsoft.com/en-us/azure/virtual-machines/managed-disks-overview)
distinguishes temporary local storage from managed data disks, tracing the last
choice. One preparation action qualifies under the preservation requirement.

No variants or jointly required answer sets. The batch combines one foundation
distinction, one applied preservation task, and one observed-failure diagnosis.
Stable IDs/families remain. Build/check, 13 tests, site links, hashes, and
whitespace checks validate this author-led checkpoint. No disk changes or
guest commands were executed in Azure.
