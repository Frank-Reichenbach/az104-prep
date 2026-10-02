# Encryption at host for virtual machines

Topic ID: compute.vms.host-encryption  
Objectives: co-07  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## What it protects

Managed disks already use server-side encryption at rest. Encryption at host
extends protection to VM host storage, including temporary disks and disk caches,
and sends encrypted data to Storage. It does not replace TLS for application
traffic. Azure Disk Encryption uses guest BitLocker/dm-crypt and is a different
mechanism.
[Encryption choices](https://learn.microsoft.com/en-us/azure/virtual-machines/disk-encryption-overview).

Host encryption can use platform-managed or customer-managed keys for supported
disk paths; temporary disk encryption uses platform-managed keys. Selecting
customer-managed keys requires a disk encryption set and its Key Vault access,
not simply placing a key URL in a VM setting.
[Managed disk encryption](https://learn.microsoft.com/en-us/azure/virtual-machines/windows/disk-encryption).

## Implementation

1. Confirm VM size support and the subscription's **EncryptionAtHost** feature
   registration. Have subscription-level authorization if registration is needed.
2. Check compatibility: VMs that currently or previously used Azure Disk Encryption
   cannot simply enable host encryption. Review Ultra/Premium SSD v2 disk
   restrictions when applicable.
3. For a new VM, select **Encryption at host** under disk settings or use
   `az vm create --encryption-at-host` with the normal VM arguments.
4. For an existing supported VM, plan downtime, deallocate it, update the
   security profile, and start it:

```sh
az vm deallocate --resource-group rg-study --name vm-study
az vm update --resource-group rg-study --name vm-study --set securityProfile.encryptionAtHost=true
az vm start --resource-group rg-study --name vm-study
az vm show --resource-group rg-study --name vm-study --query securityProfile.encryptionAtHost
```

These steps require VM write and power-operation permissions. Customer-managed
key setup additionally needs appropriate key-management and role-assignment
permissions.
[CLI instructions and restrictions](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/disks-enable-host-based-encryption-cli).

## Verify and troubleshoot

Check the VM property, power state, and successful guest boot. Do not use the
ordinary managed-disk encryption indicator as proof that host encryption is on.
For unsupported-size errors, query supported SKUs; for feature errors, check
registration completion. Existing scale-set instances need deallocation and
reallocation after enabling the setting; a model change alone is insufficient.

Retain backups and assess downtime before changes. Deallocation can discard
temporary-disk data, so temporary storage must not hold the only copy of required
data. Revisit attached services and disk costs after a lab; host encryption does
not deallocate resources or provide backup.
See [VM provisioning](creation.md).

[Question data](../../../questions/compute/compute-vms-host-encryption.json).
