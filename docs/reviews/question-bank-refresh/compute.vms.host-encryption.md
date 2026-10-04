# Encryption at host for virtual machines review

Topic: `compute.vms.host-encryption`; objective: `co-07`.
Verified: 2026-10-04. Source: questions/compute/compute-vms-host-encryption.json.

| ID | Decision | Pattern / difficulty | Repair and key |
| --- | --- | --- | --- |
| co-host-scope | Revise, revision 2 | Foundation protection scope | Replace title-revealed feature selection with its coverage and key boundary. Key `a`. |
| co-host-ade | Revise, revision 2 | Applied eligibility assessment | Establish disabled ADE, valid size and registered feature; compare relevant prerequisite changes. Key `a`. |
| co-host-confirm | Revise, revision 2 | Foundation verification property | Replace unrelated SSH/backup choices with security properties and correct difficulty. Key `a`. |

## Evidence and acceptance

[Encryption overview](https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption-overview)
and [host-encryption CLI](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/disks-enable-host-based-encryption-cli)
document temporary/cache coverage, managed-disk distinction, key configuration,
and the queried VM property. They trace scope choices and verification choices
`a`, `b`. Host storage protection is not an application TLS configuration.
The CLI explicitly says temporary disks use platform-managed keys, eliminating
the customer-managed-key prerequisite distractor.

The CLI's restriction covers current or past ADE use. Deallocation, extension
removal, and disk encryption sets do not erase that condition; these trace
all eligibility rationales under the stated history. The separate
[ADE migration guide](https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption-migrate)
provides a new-VM migration path, consistent with excluding direct enablement
on the same VM. No claim that ADE workloads can never migrate, and no migration
script is executed or scored.

[Trusted Launch](https://learn.microsoft.com/en-us/azure/virtual-machines/trusted-launch)
documents Secure Boot and vTPM, tracing verification distractors `c`, `d`.
The exact VM property remains the verification key; property recall is
foundation rather than applied reasoning. Each question has one individually
qualifying answer; no joint sets or variants. The displayed title now orients
coverage/eligibility/verification without naming the feature-selection answer.
Stable IDs/families remain. Build/check, 13 tests, site links, hashes, and
whitespace checks validate this author-led checkpoint. No Azure VM was changed.
