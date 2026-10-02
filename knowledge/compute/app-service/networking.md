# App Service inbound and outbound networking

Topic ID: compute.app-service.networking  
Objectives: co-23  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Choose the traffic direction

Regional VNet integration lets an App Service app make outbound calls through
a virtual network. It does not provide private inbound access to the app.
An App Service private endpoint provides private inbound access. Use both when
the app must accept private requests and reach private dependencies.
[VNet integration](https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration);
[private endpoints](https://learn.microsoft.com/en-us/azure/app-service/overview-private-endpoint).

## Implement outbound integration

1. Use a supported plan and a same-region VNet with a dedicated integration
   subnet delegated to `Microsoft.Web/serverFarms`.
2. In **App → Networking → VNet integration**, select that subnet.
3. Configure required application/configuration traffic routing. Microsoft
   recommends auditable site properties over legacy routing app settings.
   Container image pulls and backups have their own routing considerations.
4. Check subnet NSG outbound rules, UDRs, DNS, and any firewall/NAT path.

Size the subnet for maximum workers plus temporary scale/upgrade allocation.
Microsoft recommends reserving double the planned maximum addresses; a /26 is
a common single-plan recommendation, while larger or multi-plan designs need
their own calculation. Operator permissions include subnet read/join and write
when delegation is required.
[Subnet and routing requirements](https://learn.microsoft.com/en-us/azure/app-service/overview-vnet-integration).

## Implement private inbound access

Create an app private endpoint in a suitable subnet, approve the connection,
and configure DNS for the app hostname through `privatelink.azurewebsites.net`.
The private endpoint subnet must differ from the integration subnet. Configure
the deployment/SCM hostname's private DNS as needed for publishing through the
private path. Restrict or disable public access according to the intended design.
[App private endpoint setup](https://learn.microsoft.com/en-us/azure/app-service/overview-private-endpoint).

Use site write permissions and authorized private-endpoint/network/DNS
administration. App Service access restrictions filter the public/default
endpoint; private endpoint traffic follows its private path and is not evaluated
by those app access restrictions.
[Access restrictions](https://learn.microsoft.com/en-us/azure/app-service/overview-access-restrictions).

## Verify, troubleshoot, and cleanup

From a connected client, resolve the app hostname and verify it targets the
private endpoint IP. Test app and SCM reachability separately. From the app,
test private dependency DNS and connectivity. A working private endpoint does
not establish outbound VNet integration, and a working integration does not
hide the public frontend.

Diagnose DNS before changing permissions, then inspect approval, routing,
subnet capacity, and NSGs. Private endpoints, NAT, logs, and data transfer may
cost money. Remove obsolete endpoints and DNS links after checking shared apps
and intended access.

[Question data](../../../questions/compute/compute-app-service-networking.json).
