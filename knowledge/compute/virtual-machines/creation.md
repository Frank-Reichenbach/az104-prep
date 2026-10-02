# Virtual machine provisioning and access

Topic ID: compute.vms.creation  
Objectives: co-06  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Plan the VM

Select the subscription, region, image, security type, size, availability placement,
OS disk, and network together. Image architecture and generation must match the
chosen size and security features. Check regional capacity and both regional and
VM-family vCPU quotas. Prefer SSH keys for Linux and restricted management paths
instead of unrestricted public SSH/RDP.
[Linux creation](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/quick-create-cli);
[VM quotas](https://learn.microsoft.com/en-us/azure/virtual-machines/quotas).

Trusted Launch uses security features such as Secure Boot and vTPM on supported
Generation 2 VMs. Check image and size support rather than treating every image
as interchangeable.
[Trusted Launch](https://learn.microsoft.com/en-us/azure/virtual-machines/trusted-launch).

## Implementation

In the portal, create a VM and review **Basics**, **Disks**, **Networking**,
**Management**, and **Monitoring**. Choose no public IP if private access through
Bastion or connected networks is available. Select an existing subnet and verify
its routes, NSGs, DNS, and explicit outbound connectivity.

CLI sketch using a preconfigured subnet and an existing SSH public key:

```sh
az vm create --resource-group rg-study --name vm-study \
  --image Ubuntu2204 --size Standard_D2s_v5 --admin-username azureuser \
  --ssh-key-values ~/.ssh/id_ed25519.pub \
  --vnet-name vnet-study --subnet apps --public-ip-address "" --nsg ""
az vm get-instance-view --resource-group rg-study --name vm-study
```

The subnet's NSG must already provide the intended filtering; the empty NSG option
does not create a replacement security policy. A private VM needs a reachable
management path. New networks must not rely on implicit outbound access; provide
a supported explicit method when updates or downloads need Internet connectivity.
[Network setup](https://learn.microsoft.com/en-us/azure/virtual-machines/linux/create-cli-complete);
[default outbound changes](https://learn.microsoft.com/en-us/azure/virtual-network/ip-services/default-outbound-access).

## Permissions and checks

The identity needs VM writes plus permissions for NICs, disks, and network
attachment. Virtual Machine Contributor does not grant unrestricted network
administration or guest sign-in. Guest credentials or separately configured Entra
login roles still matter.
[VM roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles/compute).

Verify provisioning state, instance power state, boot diagnostics, effective
network rules, and an actual authenticated guest connection. For a timeout,
separate routing, NSGs, guest firewall, and service-listener checks from password
or SSH-key failures. Restrict source networks for any temporary management rule.

## Costs and cleanup

Guest shutdown can leave a VM **Stopped (allocated)** and still billed for compute.
Use Azure deallocation to release compute allocation. Disks and other retained
resources can still incur charges. Review each resource's delete options before
deleting the VM; remove disposable disks, NICs, and IPs deliberately.
[States and billing](https://learn.microsoft.com/en-us/azure/virtual-machines/states-billing).

[Question data](../../../questions/compute/compute-vms-creation.json).
