# App Service certificates and TLS bindings review

Topic: `compute.app-service.tls`; objective: `co-20`.
Verified: 2026-10-04. Source: questions/compute/compute-app-service-tls.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-tls-binding | Revise, revision 2 | Troubleshooting hostname association | Supply supported tier/direct endpoint and compare binding, redirect, protocol, and wrong-host repairs. Reclassify observed fault. Key `a`. |
| co-tls-wildcard | Revise, revision 2 | Applied certificate constraints | Require trusted wildcard private certificate and binding; compare managed/default/public-only alternatives. Key `a`. |
| co-tls-sni | Revise, revision 2 | Foundation TLS selection distinction | Replace unrelated filesystem/DNS choices with competing certificate-selection mechanisms. Key `a`. |

## Evidence and acceptance

[TLS bindings](https://learn.microsoft.com/en-us/azure/app-service/configure-ssl-bindings)
documents supported tiers, mapped-host prerequisites, certificate selection,
SNI shared-IP behavior, and IP-based TLS. [Common settings](https://learn.microsoft.com/en-us/azure/app-service/configure-common)
distinguishes HTTPS Only and minimum TLS controls. These trace all hostname
repair rationales; neither a redirect nor protocol limit replaces the binding.
A binding for a different hostname fails the explicitly requested endpoint.

[Certificates](https://learn.microsoft.com/en-us/azure/app-service/configure-ssl-certificate)
documents PFX/private-key/chain requirements, wildcard exclusion for free
managed certificates, and public-certificate use in code rather than custom
domain security. Together with binding documentation it traces each wildcard
choice. First-level subdomains avoid implying wildcard coverage for an apex
or deeper hostname. Default platform coverage does not extend to this custom
domain. Public-access requirements for managed certificate issuance remain
conflicting in the knowledge file and are not scored here.

The SNI page describes hostname selection during TLS and the contrasting
IP-based binding. HTTP URL-path selection is excluded by handshake order;
client address is not the server name. These are protocol inferences from
the documented SNI mechanism, not additional App Service configuration modes.

One complete approach/assertion qualifies for each item. No joint sets or
variants; stable IDs/families remain. The title supplies the service context
without choosing a hostname association, wildcard source, or SNI mechanism.
Author-led source review is separate from build/check, 13 tests, site links,
hashes, and whitespace validation. No certificate or binding was deployed.
