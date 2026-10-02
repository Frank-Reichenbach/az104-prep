# Azure Bastion administrative access

Topic ID: networking.security.bastion

Objectives: nw-08

Verified: 2026-10-02
Status: documented; examples have not been executed in Azure.

## Purpose and choices

Bastion provides managed RDP/SSH access to VM private addresses. The target VM
does not need a public IP for this path. Choose the SKU for required features:
Standard supports native-client connections and host scaling; Premium adds
private-only deployment and session recording. Developer is a limited shared
offering, not a substitute for every dedicated deployment.
[Overview](https://learn.microsoft.com/en-us/azure/bastion/bastion-overview).

## Deploy a dedicated host

For a new Basic/Standard deployment, create the dedicated **AzureBastionSubnet**
with /26 or larger address space and no other workloads. Use a Standard static
public IP for the host. Developer and private-only deployments have different
public-IP requirements. Use authorized resource/network write and join
permissions during deployment.
[Settings](https://learn.microsoft.com/en-us/azure/bastion/configuration-settings).

If using NSGs, retain the documented Bastion control-plane, host communication,
and target access rules; allowing only TCP 443 everywhere is insufficient.
Permit Bastion-to-target RDP 3389 or SSH 22, or supported configured ports.
[NSG requirements](https://learn.microsoft.com/en-us/azure/bastion/bastion-nsg).

## Connect and verify

Open VM **Connect → Bastion**, select protocol and authentication, then connect.
For browser RDP, readers need access to the VM, NIC, and Bastion resources,
plus target-VNet read access for peered deployment. Guest login rights remain
separate; Entra login uses the appropriate VM login role.
[Connection procedure](https://learn.microsoft.com/en-us/azure/bastion/bastion-connect-vm-rdp-windows).

If connection fails, check SKU feature support, target reachability, guest
listener/login, and both NSG paths. Bastion does not replace the target guest's
authentication or grant administrator rights through Reader alone.
Delete a dedicated test host when finished if it is no longer needed; its
provisioned hours can incur charges. See [NSGs](nsg-asg.md).

[Question data](../../../questions/networking/networking-security-bastion.json).
