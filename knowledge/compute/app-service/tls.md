# App Service certificates and TLS bindings

Topic ID: compute.app-service.tls  
Objectives: co-20  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Certificate and binding

The default Azure hostname has platform-managed HTTPS. A custom hostname needs
a certificate covering that name and a TLS binding connecting it to the app.
Uploading a certificate alone does not create the binding. SNI TLS allows
hostnames to share an IP; IP-based TLS has additional address and billing
considerations.
[TLS bindings](https://learn.microsoft.com/en-us/azure/app-service/configure-ssl-bindings).

## Implementation

1. Use an eligible App Service tier and verify the custom domain.
2. Choose a free managed certificate for a supported hostname, or import/upload
   a suitable private certificate. Uploaded private certificates use a
   password-protected PFX with the required certificate chain and private key.
   For public server authentication, use a trusted CA and a certificate that
   covers the requested hostname.
3. Open **Certificates** to create/import it, then **Custom domains** to add the
   TLS binding. Prefer SNI when clients support it and a dedicated TLS IP is
   unnecessary.
4. Configure HTTPS Only and an appropriate minimum TLS version. These settings
   serve different purposes: redirecting HTTP does not establish the protocol
   minimum.
[Certificate setup](https://learn.microsoft.com/en-us/azure/app-service/configure-ssl-certificate);
[app TLS settings](https://learn.microsoft.com/en-us/azure/app-service/configure-common).

Site/certificate write permissions are required. Key Vault imports need the
documented App Service resource-provider identity's access to the vault; do
not assume the site's managed identity performs the platform certificate import.

## Renewal and documentation conflict

Managed certificates renew automatically while their requirements remain met;
they do not support wildcard certificates or export of the private key.
Monitor expiry and the actual binding even when issuance is automated.
[Managed certificate limits](https://learn.microsoft.com/en-us/azure/app-service/configure-ssl-certificate).

The November 2025 update says App Service validates at its frontend even when
the application blocks public access, provided public DNS and other requirements
hold. The same change article retains older July wording requiring public app
access, and the general certificate page has older restrictions. Follow the
newer dated update for planning, verify the exact scenario, and do not score
this conflicting access detail as an unconditional exam rule.
[July/November changes](https://learn.microsoft.com/en-us/azure/app-service/app-service-managed-certificate-changes-july-2025).

## Verify and cleanup

Request the exact custom HTTPS hostname, inspect the certificate name/chain/
expiry, and test the TLS policy. A valid default-hostname certificate does not
prove the custom binding works. Check DNS, SAN coverage, binding thumbprint,
and renewal status before replacing a certificate. Remove unused bindings and
certificates only after checking shared apps; purchased certificates and
IP-based TLS may incur charges.

[Question data](../../../questions/compute/compute-app-service-tls.json).
