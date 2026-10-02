# App Service custom DNS names and ownership verification

Topic ID: compute.app-service.domains  
Objectives: co-21  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Records and application mapping

DNS directs clients to App Service; a hostname binding tells App Service which
app should serve that name. Both are required for a working custom hostname.
Microsoft recommends CNAME for a subdomain and A for a conventional zone apex.
Use the app's actual default hostname/IP from the portal instead of guessing it.
[Custom-domain procedure](https://learn.microsoft.com/en-us/azure/app-service/app-service-web-tutorial-custom-domain).

Ownership verification is separate from routing. Add the domain verification
TXT record shown by App Service: `asuid` for the apex or `asuid.www` for a
`www` hostname. Microsoft recommends retaining verification records to reduce
subdomain-takeover risk.

## Implementation

1. Use a supported paid tier and obtain permission to edit the public DNS zone.
   Website management rights do not grant access to a separate DNS provider.
2. Open **App → Custom domains → Add custom domain** and copy the routing and
   verification values.
3. At the authoritative DNS provider, create the required CNAME/A and TXT records.
   Allow for TTL caches and verify the records using `nslookup` or `dig`.
4. Validate ownership in App Service and add the hostname binding. CLI equivalent
   after configuring DNS:

```sh
az webapp config hostname add --resource-group rg-study \
  --webapp-name '<app-name>' --hostname www.example.com
```

5. Configure and test the [TLS binding](tls.md). DNS ownership verification does
   not issue or bind a certificate by itself.

For a live migration, use the verification TXT record to preconfigure the
hostname before changing traffic routing. Follow the migration procedure rather
than making an unplanned DNS cutover.
[Active-domain migration](https://learn.microsoft.com/en-us/azure/app-service/manage-custom-dns-migrate-domain).

## Verify and troubleshoot

Query the authoritative zone and the client resolver. Confirm routing, the
App Service hostname entry, and a successful request using the actual hostname.
A correct DNS address with an App Service 404 can indicate a missing/wrong
hostname binding. A certificate-name warning requires checking the TLS binding
and certificate coverage. Apex A records may need updates when the relevant
inbound address changes.

Domain registration and paid certificates can have separate charges. When
deleting an app, remove or redirect its DNS records as part of cleanup. A
dangling CNAME should not remain pointing at an abandoned cloud hostname.
[Takeover prevention](https://learn.microsoft.com/en-us/azure/security/fundamentals/subdomain-takeover).

[Question data](../../../questions/compute/compute-app-service-domains.json).
