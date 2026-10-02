# App Service deployment slots and swaps

Topic ID: compute.app-service.slots  
Objectives: co-24  
Verified: 2026-10-02  
Status: documented; examples have not been executed in Azure.

## Slot purpose and limits

A deployment slot is a live app endpoint for deploying and validating a release
before directing production traffic to it. Slots require Standard, Premium, or
Isolated plans and share the plan's compute. Cloning configuration to a new
slot does not copy its application content or private endpoint.
[Slot creation and limits](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots).

## Implementation

1. Open **App → Deployment slots**, create `staging`, and clone appropriate
   configuration.
2. Deploy the application into staging and configure its identity, access,
   dependencies, and health checks. Restrict its access if it must not be public.
3. Mark environment-specific app settings and connection strings as deployment
   slot settings when they must stay with that slot.
4. Test the staging endpoint and inspect the swap preview/configuration changes.
5. Swap staging into production:

```sh
az webapp deployment slot create --resource-group rg-study --name '<app-name>' --slot staging
az webapp deployment slot swap --resource-group rg-study --name '<app-name>' \
  --slot staging --target-slot production
```

Deploy content between these operations; creation alone leaves the slot empty.
The operator needs the site/slot write and swap operations required at the app
scope. Deployment credentials or publishing permissions must also be authorized.
[Slot operations](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots).

## Settings and rollback

Some settings travel with content, while others remain attached to the slot.
Managed identities, custom domains, TLS bindings, and VNet integration do not
swap. App settings and connection strings can be marked sticky. Review the
current settings table and any override configuration rather than assuming all
settings behave alike.
[Swap behavior](https://learn.microsoft.com/en-us/azure/app-service/deploy-staging-slots#which-settings-are-swapped).

After the swap, staging contains the previous production content. Swapping back
can restore that code/configuration path, but it does not reverse external
database changes. Use compatible database migrations and a separate data
recovery plan. Swap with preview has restrictions, including site authentication;
auto swap also has platform limitations. Select only a supported workflow.

## Verify, troubleshoot, and cleanup

Test the production endpoint, deployment version, connection settings, identity
access, and dependencies after cutover. Warm-up/probe failures require checking
startup and target-slot settings. Long-running work must tolerate recycling.

Keep staging ready for rollback, then remove obsolete slots after the retention
decision. Slots have no separate feature charge, but consume the shared paid
plan capacity; [scaling](scaling.md) and [backups](backups.md) remain separate tasks.

[Question data](../../../questions/compute/compute-app-service-slots.json).
