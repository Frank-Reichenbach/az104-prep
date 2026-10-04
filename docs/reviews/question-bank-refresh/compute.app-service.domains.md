# App Service custom DNS names and ownership verification review

Topic: `compute.app-service.domains`; objective: `co-21`.
Verified: 2026-10-04. Source: questions/compute/compute-app-service-domains.json.

| ID | Decision | Pattern / difficulty | Finding and key |
| --- | --- | --- | --- |
| co-domain-cname | Keep, revision 1 | Foundation routing record distinction | Hostname-following subdomain route uniquely selects CNAME. Key `a`. |
| co-domain-txt | Revise, revision 2 | Foundation verification record mapping | The title supplies ownership as a purpose; ask for the exact record name/value instead. Key `a`. |
| co-domain-binding | Revise, revision 2 | Troubleshooting missing mapping | Verify routing/ownership and contrast correct hostname/target with apex, slot, and TXT-only changes. Reclassify observed fault. Key `a`. |

## Evidence and acceptance

[Custom-domain setup](https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain)
documents the recommended CNAME for subdomains, domain verification TXT,
separate hostname validation/addition, and later certificate binding. It
traces retained CNAME behavior and all revised verification/mapping rationales.
Its recommendation does not mean an A record can never route a subdomain.
The answer requires hostname following rather than a fixed address.

[Takeover prevention](https://learn.microsoft.com/en-us/azure/security/fundamentals/subdomain-takeover)
documents the verification-ID protection and dangling routing risk. Together
with setup these trace the TXT verification ID. The exact record mapping
distinguishes apex/subdomain names and routing/verification values. A hostname entry matches
the requested name and target app/slot; an apex entry cannot register www.

The 404 item supplies positive DNS/client verification and the absent app
mapping. It does not treat every 404 as proof of one cause: setup also lists
cached IP and changed IP-binding addresses. Its selected repair addresses
the stated missing association rather than promising resolution of all app
faults. Supported tier and successful default endpoint avoid hidden runtime
or tier guesses. These mapping consequences are configuration inferences
from the documented exact-hostname addition procedure.

Exactly one assertion or complete change qualifies per item. No joint sets
or variants; stable IDs/families remain. The displayed title does not select
a routing record, TXT name/value, or exact hostname/target repair. Author-led
review is separate from build/check, 13 tests, site links, hashes, and whitespace
validation. No DNS changes or hostname registrations were executed.
