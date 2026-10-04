# Azure Bastion administrative access review

Topic: `networking.security.bastion`; objective: `nw-08`.
Verified: 2026-10-04. Source: questions/networking/networking-security-bastion.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| nw-bastion-subnet | Keep, revision 1 | Foundation deployment requirement | New Standard host needs dedicated AzureBastionSubnet /26 or larger. Key `a`. |
| nw-bastion-target | Revise, revision 2 | Applied target-side NSG rule | Fix sufficient-path ambiguity with exact private-only/scoped source and RDP port requirements. Key `b`. |
| nw-bastion-reader | Revise, revision 2 | Troubleshooting guest authorization | Replace padded yes/no alternatives with concrete authorization scopes and a defined password-based guest failure. Key `c`. |

## Evidence and acceptance

[Configuration](https://learn.microsoft.com/en-us/azure/bastion/configuration-settings)
documents subnet name, size, dedication, and legacy /27 distinction, tracing
all retained subnet rationales. [Overview](https://learn.microsoft.com/en-us/azure/bastion/bastion-overview)
documents private target access without a VM public IP. [Bastion NSGs](https://learn.microsoft.com/en-us/azure/bastion/bastion-nsg)
distinguishes browser TLS 443 from target RDP 3389 and subnet-source rules.
These trace each target rule: Internet is the wrong source, 443 the wrong
guest port, and VirtualNetwork broader than the mandated Bastion-only range.

[Browser RDP](https://learn.microsoft.com/en-us/azure/bastion/bastion-connect-vm-rdp-windows)
separates Azure resource reads from guest credentials/login permissions. It
traces the guest key and explains why broader Reader scopes cannot authorize
the supplied local account. The stated local-password method avoids mixing
this decision with Entra VM login roles or a different authentication setup.
Guest sign-in policy still determines actual permitted accounts; no automatic
guest administrator grant is implied by Reader or the Bastion SKU.

Exactly one complete rule/change or assertion meets each scenario. No joint
sets or variants. The displayed Bastion title does not give subnet size,
traffic source/port, or guest authorization. Stable IDs/families remain.
Author-led source review is separate from build/check, 13 tests, site links,
hashes, and whitespace validation. No host, rule, or guest permission changed.
